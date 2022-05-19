import { FC } from 'react';

import { CardItem } from '../cardItem/CardItem';

interface CardsState {
  order: string;
  cardTitle: string;
  complete: boolean;
}

interface CardListProps {
  tasks: CardsState[];
  removeCard: (cardId: string) => void;
  toggleCardComplete: (cardId: string) => void;
}

const CardList: FC<CardListProps> = ({ tasks, removeCard, toggleCardComplete }) => {
  return (
    <ul className="cards__list">
      {tasks.map((task) => {
        return (
          <CardItem
            key={task.order}
            removeCard={removeCard}
            toggleCardComplete={toggleCardComplete}
            {...task}
          />
        );
      })}
    </ul>
  );
};

export { CardList };
