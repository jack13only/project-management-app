import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetBoardsQuery, usePostBoardMutation } from '../../app/RtkQuery';

import { TertiaryButton } from '../../components/buttons';
import { BoardsItem } from './BoardsItem';

import { BoardTypes } from './types/BoardsTypes';

import './Boards.scss';

// a mock title creator for created board,
// will be deleted later, when we add a form for creating a new board;
const getRandomTitleBoard = () => Math.floor(Math.random() * 100).toString();

const Boards: FC = () => {
  const { data = [], error } = useGetBoardsQuery('');
  const [postBoard] = usePostBoardMutation();

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const addNewBoard = async () => {
    await postBoard({ title: getRandomTitleBoard() });
  };

  return (
    <section className="boards">
      <h2 className="boards__title">Your boards</h2>
      <div className="boards__container">
        <TertiaryButton
          className="button__tertiary board__new"
          type="button"
          description="+ Create a new board"
          onClick={addNewBoard}
        />

        {data?.map((board: BoardTypes) => {
          return <BoardsItem key={board.id} title={board.title} id={board.id} />;
        })}

        {/* todo: delete the next link after adding functionality for created board: click on the new board item - open a new board with columns */}

        <Link to="/boards/board">
          See a New Board Page (example. will be opened after clicking on the new board)
        </Link>
      </div>
    </section>
  );
};

export { Boards };
