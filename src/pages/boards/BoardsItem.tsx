import { useDeleteBoardMutation } from '../../app/RtkQuery';

import { BoardTypes } from './types/BoardsTypes';
import './BoardsItem.scss';

const BoardsItem = ({ title, id }: BoardTypes) => {
  const [deleteBoard] = useDeleteBoardMutation();

  const deleteBoardItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteBoard(id.toString());
  };

  return (
    <div className="board__new boards-item">
      <h2 className="boards-item__title">{title}</h2>
      <button type="button" onClick={deleteBoardItem}>
        Delete
      </button>
    </div>
  );
};

export { BoardsItem };
