import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';

import { CardList } from '../../components/cardList/CardList';
import { CardContainer } from '../../components/cardContainer/CardContainer';
import { BoardColumnTitle } from './BoardColumnTitle';
import { DeleteButton, TertiaryButton } from '../buttons';

import { useDeleteColumnMutation } from '../../app/RtkQuery';

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
  const columnRef = useRef() as RefObject<HTMLDivElement>;
  const [cards, setCards] = useState<CardsState[]>([]);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);
  const [deleteColumn] = useDeleteColumnMutation();

  const removeColumn = async () => {
    await deleteColumn({ boardId, columnId });
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

  useEffect(() => {
    columnRef.current ? (columnRef.current.scrollTop = columnRef.current.scrollHeight) : null;
  }, [cards.length, isOpenCard]);

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

      <div>
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
    </div>
  );
};

export default BoardColumn;
