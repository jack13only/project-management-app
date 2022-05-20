import { FC } from 'react';

import { CardItem } from '../cardItem/CardItem';

interface CardsState {
  order: number;
  complete: boolean;
  title: string;
  id: string;
  boardId: string;
  columnId: string;
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
            {...task}
            key={task.id}
            removeCard={removeCard}
            toggleCardComplete={toggleCardComplete}
            cardTitle={task.title}
            order={task.order}
          />
        );
      })}
    </ul>
  );
};

export { CardList };
