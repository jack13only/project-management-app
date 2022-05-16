import React, { ChangeEvent, FC, useState } from 'react';

import { CardList } from '../../components/cardList/CardList';
import { CardContainer } from '../../components/cardContainer/CardContainer';
import { BoardColumnTitle } from './BoardColumnTitle';
import { DeleteButton, TertiaryButton } from '../buttons';

import {
  useDeleteColumnMutation,
  useGetColumnsQuery,
  useUpdateColumnMutation,
} from '../../app/RtkQuery';

import './BoardColumns.scss';

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

export interface ColumnType {
  title: string;
  id: string;
  order: number;
}

const BoardColumn: FC<BoardColumnProps> = ({ columnTitle, boardId, columnId, order }) => {
  const [cards, setCards] = useState<CardsState[]>([]);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);

  const { data = [], error } = useGetColumnsQuery({ boardId });

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  const removeColumn = async () => {
    const deletedColumnId = data.findIndex((column: ColumnType) => column.id === columnId);
    const restData = data.slice(deletedColumnId + 1);

    await deleteColumn({ boardId, columnId });

    await restData.forEach((column: ColumnType) => {
      updateColumn({
        columnId: column.id,
        boardId: boardId,
        body: { title: column.title, order: order >= 0 ? column.order - 1 : order },
      });
    });
  };

  const addСard = () => {
    if (cardTitle.trim().length) {
      setCards([
        ...cards,
        {
          id: new Date().toISOString(),
          cardTitle,
          complete: false,
        },
      ]);
      setCardTitle('');
      setIsOpenCard(false);
    }
  };

  const handleCardTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const VALUE = event.target.value;
    setCardTitle(VALUE);
  };

  const removeCard = (cardId: string | undefined) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const toggleCardComplete = (cardId: string | undefined) => {
    setCards(
      cards.map((card) => {
        if (card.id !== cardId) {
          return card;
        } else {
          return {
            ...card,
            complete: !card.complete,
          };
        }
      })
    );
  };

  const addCardVisibility = () => {
    setIsOpenCard(true);
  };

  const removeCardVisibility = () => {
    setIsOpenCard(false);
    setCardTitle('');
  };

  return (
    <div className="board__column">
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

      <CardList cards={cards} removeCard={removeCard} toggleCardComplete={toggleCardComplete} />

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
        removeCardVisibility={removeCardVisibility}
        cardTitle={cardTitle}
        handleCardTitle={handleCardTitle}
        addCard={addСard}
      />
    </div>
  );
};

export { BoardColumn };
