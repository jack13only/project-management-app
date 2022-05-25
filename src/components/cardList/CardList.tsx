import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CardItem } from '..';

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
  toggleCardComplete: (cardId: string) => void;
}

const CardList: FC<CardListProps> = ({ tasks, toggleCardComplete }) => {
  return (
    <ul className="cards__list">
      {tasks.map((task) => {
        return (
          <CardItem
            {...task}
            key={task.id}
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
