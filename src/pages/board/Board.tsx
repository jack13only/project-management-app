import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetColumnsQuery, usePostColumnMutation } from '../../app/RtkQuery';
import { BoardColumn } from '../../components/boardColumn/BoardColumn';
import { TertiaryButton } from '../../components/buttons';

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
    <div className="board__columns">
      <div className="wrapper board__wrapper">
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
