import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetBoardsQuery, usePostBoardMutation } from '../../app/RtkQuery';

import { TertiaryButton } from '../../components/buttons';
import { PreloaderSuspense } from '../../components/preloader/index';

import { BoardsTypes } from './typesBoards/TypesBoards';

import './Boards.scss';

// a mock title creator for created board,
// will be deleted later, when we add a form for creating a new board;
const getRandomTitleBoard = () => Math.floor(Math.random() * 100).toString();
const BoardsItem = React.lazy(() => import('./BoardsItem'));

const Boards: FC = () => {
  const { data = [], error } = useGetBoardsQuery('');
  const [postBoard] = usePostBoardMutation();

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const addNewBoard = async () => await postBoard({ title: getRandomTitleBoard() });

  return (
    <section className="boards">
      <h2 className="h2">Your boards</h2>
      <div className="boards__container">
        <TertiaryButton
          className="button__tertiary board__new-btn"
          type="button"
          description="+ Create a new board"
          onClick={addNewBoard}
        />

        <PreloaderSuspense>
          {data?.map(({ id, title }: BoardsTypes) => {
            return (
              <Link to={`/boards/${id}`} key={id} className="boards-item__link">
                <BoardsItem title={title} id={id} />
              </Link>
            );
          })}
        </PreloaderSuspense>
      </div>
    </section>
  );
};

export { Boards };
