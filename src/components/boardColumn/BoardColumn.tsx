import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';

import { DeleteButton, TertiaryButton } from '../buttons';
import { BoardColumnTitle, CardContainer, CardList, Modal } from '..';

import './BoardColumn.scss';

import { useDeleteColumnMutation, useGetTasksQuery, usePostTaskMutation } from '../../app/RtkQuery';

import './BoardColumn.scss';
import { useAppSelector } from '../../app/hooks';

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

const BoardColumn: FC<BoardColumnProps> = ({ columnTitle, boardId, columnId, order }) => {
  const columnRef = useRef() as RefObject<HTMLDivElement>;
  const [cards, setCards] = useState<CardsState[]>([]);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.userStorage);

  const { data = [], error, isLoading } = useGetTasksQuery({ columnId, boardId });
  const [deleteColumn] = useDeleteColumnMutation();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [postTask] = usePostTaskMutation();

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const removeColumn = async () => {
    setActiveModal(false);
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
    <>
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
            removeCard={() => setActiveModal(true)}
          />
        </div>

        <div>
          <CardList tasks={data} toggleCardComplete={toggleCardComplete} />
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
            removeCardVisibility={() => setIsOpenCard(false)}
            cardTitle={cardTitle}
            handleCardTitle={handleCardTitle}
            addCard={addCard}
          />
        </div>
      </div>

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <div className="modal__wrapper">
          <div className="modal__img" />
          <div className="modal__text">
            <h2>{`Do you want to delete column '${columnTitle}'`} ?</h2>
            <button type="button" onClick={removeColumn}>
              Yes
            </button>
            <button type="button" onClick={() => setActiveModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BoardColumn;
