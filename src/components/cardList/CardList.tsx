import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
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
  columnId: string;
  toggleCardComplete: (cardId: string) => void;
}

const CardList: FC<CardListProps> = ({ columnId, tasks, toggleCardComplete }) => {
  return (
    <Droppable droppableId={columnId} type="tasks">
      {(provided) => (
        <ul className="cards__list" ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => {
            return (
              <CardItem
                {...task}
                toggleCardComplete={toggleCardComplete}
                cardTitle={task.title}
                order={task.order}
                index={index}
                id={task.id}
                key={task.id}
              />
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export { CardList };
