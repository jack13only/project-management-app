import React, { ChangeEvent, FC, useState } from 'react';

import { CardList } from '../../components/cardList/CardList';
import { CardContainer } from '../../components/cardContainer/CardContainer';
import { DeleteButton, TertiaryButton } from '../buttons';
import { useDeleteColumnMutation, useUpdateColumnMutation } from '../../app/RtkQuery';

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

const BoardColumn: FC<BoardColumnProps> = ({ columnTitle, boardId, columnId, order }) => {
  const [cards, setCards] = useState<CardsState[]>([]);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);
  const [currentColumnTitle, setColumnTitle] = useState<string>('');
  const [isOpenColumnTitle, setIsOpenColumnTitle] = useState<boolean>(false);

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();

  const removeColumn = async () => {
    await deleteColumn({ boardId, columnId });
  };

  const changeTitle = () => {
    setIsOpenColumnTitle(true);
  };

  const saveColumnTitle = async () => {
    setIsOpenColumnTitle(false);

    await updateColumn({
      columnId,
      boardId,
      body: { title: currentColumnTitle, order },
    });
  };

  const handleColumnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = event.target as HTMLInputElement;
    setColumnTitle(currentInput.value);
  };

  const handleCardTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const VALUE = event.target.value;
    setCardTitle(VALUE);
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
        {isOpenColumnTitle ? (
          <>
            <input type="text" placeholder="change title" onChange={handleColumnTitle} />
            <button type="button" onClick={saveColumnTitle}>
              Save
            </button>
          </>
        ) : (
          <h4 className="board__column-title" onClick={changeTitle}>
            {columnTitle}
          </h4>
        )}

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
