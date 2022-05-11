import { FC } from 'react';

import { CardItem } from '../cardItem/CardItem';

interface CardsState {
  id?: string;
  cardTitle: string;
  complete: boolean;
}

interface CardListProps {
  cards: CardsState[];
  removeCard: (cardId: string) => void;
  toggleCardComplete: (cardId: string) => void;
}

const CardList: FC<CardListProps> = ({ cards, removeCard, toggleCardComplete }) => {
  return (
    <ul className="card__container">
      {cards.map((card) => {
        return (
          <CardItem
            key={card.id}
            removeCard={removeCard}
            toggleCardComplete={toggleCardComplete}
            {...card}
          />
        );
      })}
    </ul>
  );
};

export { CardList };
