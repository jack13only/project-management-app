import { FC, useEffect, useState } from 'react';
import { CardItem, Modal } from '..';

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
}

const CardList: FC<CardListProps> = ({ tasks }) => {
  return (
    <ul className="cards__list">
      {tasks.map((task) => {
        return <CardItem {...task} key={task.id} cardTitle={task.title} order={task.order} />;
      })}
    </ul>
  );
};

export { CardList };
