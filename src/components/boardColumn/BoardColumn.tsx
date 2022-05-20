import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';

import { DeleteButton, TertiaryButton } from '../buttons';
import { BoardColumnTitle, CardContainer, CardList } from '..';

import {
  useDeleteColumnMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  usePostTaskMutation,
} from '../../app/RtkQuery';

import './BoardColumn.scss';

type BoardColumnProps = {
  columnTitle: string;
  boardId: string;
  columnId: string;
  order: number;
};

type CardsState = {
  id: string;
  cardTitle: string;
  complete: boolean;
};

const userId = '37e596ea-e3b8-4515-9eb2-48f1e6ed6204';

const BoardColumn: FC<BoardColumnProps> = ({ columnTitle, boardId, columnId, order }) => {
  const columnRef = useRef() as RefObject<HTMLDivElement>;
  const [cards, setCards] = useState<CardsState[]>([]);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);

  const { data = [], error } = useGetTasksQuery({ columnId, boardId });
  const [deleteColumn] = useDeleteColumnMutation();
  const [postTask] = usePostTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const removeColumn = async () => {
    await deleteColumn({ boardId, columnId });
  };

  const addCard = async () => {
    if (cardTitle.trim().length) {
      await postTask({
        boardId,
        columnId,
        body: {
          title: cardTitle,
          order: data.length ? data[data.length - 1].order + 1 : 0,
          description: cardTitle,
          userId: userId,
        },
      });
    }
  };

  const handleCardTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const VALUE = event.target.value;
    setCardTitle(VALUE);
  };

  const removeCard = async (cardId: string) => {
    await deleteTask({
      boardId,
      columnId,
      taskId: cardId,
    });
  };

  const toggleCardComplete = (cardId: string | undefined) => {
    setCards(
      data.map((task: CardsState) => {
        if (task.id !== cardId) {
          return task;
        } else {
          return {
            ...task,
            complete: !task.complete,
          };
        }
      })
    );
  };

  const addCardVisibility = () => {
    setIsOpenCard(true);
  };

  useEffect(() => {
    columnRef.current ? (columnRef.current.scrollTop = columnRef.current.scrollHeight) : null;
  }, [data.length, isOpenCard]);

  useEffect(() => {
    setCardTitle('');
    setIsOpenCard(false);
  }, [data.length]);

  return (
    <div className="board__column" ref={columnRef} style={{ order: order }}>
      <div className="board__column-head">
        <BoardColumnTitle
          columnTitle={columnTitle}
          columnId={columnId}
          boardId={boardId}
          order={order}
        />

        <DeleteButton
          className="task-delete"
          type="button"
          description="&times;"
          removeCard={removeColumn}
        />
      </div>

      <CardList tasks={data} removeCard={removeCard} toggleCardComplete={toggleCardComplete} />
      <div className="card__add">
        <TertiaryButton
          className="button__tertiary column__btn"
          type="button"
          description="+ Add a card"
          isOpenCard={isOpenCard}
          onClick={addCardVisibility}
        />
      </div>
      <CardContainer
        isOpenCard={isOpenCard}
        cardTitle={cardTitle}
        handleCardTitle={handleCardTitle}
        addCard={addCard}
        removeCardVisibility={() => setIsOpenCard(false)}
      />
    </div>
  );
};

export default BoardColumn;
