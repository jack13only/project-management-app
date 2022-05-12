import { FC } from 'react';
import { BoardColumn } from '../../components/boardColumn/BoardColumn';
import { TertiaryButton } from '../../components/buttons';

const Board: FC = () => {
  const addNewColumn = () => console.log('new column');

  return (
    <div className="board__columns">
      <div className="wrapper board__wrapper">
        <BoardColumn column="To Do" />
        <BoardColumn column="In Progress" />
        <BoardColumn column="Done" />

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
