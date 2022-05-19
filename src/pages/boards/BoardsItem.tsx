import { useDeleteBoardMutation } from '../../app/RtkQuery';
import { BoardsTypes } from './typesBoards/TypesBoards';

const BoardsItem = ({ title, id }: BoardsTypes) => {
  const [deleteBoard] = useDeleteBoardMutation();

  const deleteBoardItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteBoard(id);
  };

  return (
    <div className="boards__item">
      <h2 className="boards__item-title">{title}</h2>
      <button type="button" onClick={deleteBoardItem}>
        Delete
      </button>
    </div>
  );
};

export default BoardsItem;
