import { FC } from 'react';
import { useParams } from 'react-router-dom';

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
        order: Math.floor(Math.random() * 100),
      },
    });
  };

  return (
    <div className="board">
      <div className="wrapper board__wrapper">
        <h2 className="board__title">Board {currentBoardTitle}</h2>
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
