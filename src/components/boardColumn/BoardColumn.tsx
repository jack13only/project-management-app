import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';

import { DeleteButton, TertiaryButton } from '../buttons';
import { BoardColumnTitle, CardContainer, CardList, Modal } from '..';
import { useDeleteColumnMutation } from '../../app/RtkQuery';

import './BoardColumn.scss';
import { title } from 'process';

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
  const [activeModal, setActiveModal] = useState<boolean>(false);

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

      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <h2>Do you want to delete column {columnTitle} ?</h2>
        <button type="button" onClick={removeColumn}>
          Yes
        </button>
        <button type="button" onClick={() => setActiveModal(false)}>
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default BoardColumn;
