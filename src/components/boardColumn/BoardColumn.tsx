import { ChangeEvent, FC, useState } from 'react';

import { CardList } from '../../components/cardList/CardList';
import { CardContainer } from '../../components/cardContainer/CardContainer';
import { TertiaryButton } from '../buttons';

import './BoardColumns.scss';

interface BoardColumnProps {
  column: string;
}

type CardsState = {
  id: string;
  cardTitle: string;
  complete: boolean;
};

const BoardColumn: FC<BoardColumnProps> = ({ column }) => {
  const [cards, setCards] = useState<CardsState[]>([]);
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isOpenCard, setIsOpenCard] = useState<boolean>(false);

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
      <h4 className="board__column-title">{column}</h4>
      <CardList cards={cards} removeCard={removeCard} toggleCardComplete={toggleCardComplete} />
      <TertiaryButton
        className="button__tertiary column__btn"
        type="button"
        description="+ Add a card"
        isOpenCard={isOpenCard}
        onClick={addCardVisibility}
      />
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
