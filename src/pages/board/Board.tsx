import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  useGetBoardsByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
} from '../../app/RtkQuery';
import { BoardColumn } from '../../components/boardColumn/BoardColumn';
import { TertiaryButton } from '../../components/buttons';

import './Board.scss';

export interface ColumnType {
  title: string;
  id: string;
  order: number;
}

const Board: FC = () => {
  const { id } = useParams();
  const boardId = id ?? '';

  const { data = [], error } = useGetColumnsQuery({ boardId });
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
        <h2 className="board__title">Board {currentBoardTitle}</h2>
        <Link to="/boards">
          <button type="button">Back</button>
        </Link>

        <div className="board__columns">
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
        </div>

        <TertiaryButton
          className="button__tertiary column__new-btn"
          type="button"
          description="+ Add a new column"
          onClick={addNewColumn}
        />
      </div>
    </div>
  );
};

export { Board };
