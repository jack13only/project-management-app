import { MouseEvent } from 'react';
import { useDeleteBoardMutation } from '../../app/RtkQuery';
import { BoardsTypes } from './typesBoards/TypesBoards';
import { DeleteButton } from '../../components/buttons';

const BoardsItem = ({ title, id }: BoardsTypes) => {
  const [deleteBoard] = useDeleteBoardMutation();

  const deleteBoardItem = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteBoard(id);
  };

  return (
    <div className="boards__item">
      <h2 className="boards__item-title">{title}</h2>
      <DeleteButton type="button" deleteBoardItem={deleteBoardItem} />
    </div>
  );
};

export default BoardsItem;
