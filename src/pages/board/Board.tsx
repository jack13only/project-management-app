import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  useGetBoardsByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
} from '../../app/RtkQuery';
import { TertiaryButton } from '../../components/buttons';
import { BackButton } from '../../components/buttons';
import { PreloaderSuspense } from '../../components/preloader/index';

import './Board.scss';

const BoardColumn = React.lazy(() => import('../../components/boardColumn/BoardColumn'));

export interface ColumnType {
  title: string;
  id: string;
  order: number;
}

const Board: FC = () => {
  const { id } = useParams();
  const boardId = id ?? '';

  const { data = [], error, isLoading } = useGetColumnsQuery({ boardId });
  const [postColumn] = usePostColumnMutation();
  const getBoardsById = useGetBoardsByIdQuery(boardId);
  const currentBoardTitle = getBoardsById.data?.title;

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const addNewColumn = async () => {
    await postColumn({
      boardId: boardId,
      body: {
        title: 'new column',
        order: data.length ? data[data.length - 1].order + 1 : 0,
      },
    });
  };

  return (
    <div className="board">
      <div className="wrapper board__wrapper">
        <div className="board__title__wrapper">
          <h2 className="board__title">Board {currentBoardTitle}</h2>
          <Link to="/boards">
            <BackButton type="button" />
          </Link>
        </div>

        {!isLoading ? (
          <div className="board__columns">
            <PreloaderSuspense>
              {data?.map(({ title, id, order }: ColumnType) => {
                return (
                  <BoardColumn
                    columnTitle={title}
                    key={id}
                    boardId={boardId}
                    columnId={id}
                    order={order}
                  />
                );
              })}
            </PreloaderSuspense>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <TertiaryButton
          className="button__tertiary"
          type="button"
          description="+ Add a new column"
          onClick={addNewColumn}
        />
      </div>
    </div>
  );
};

export { Board };
