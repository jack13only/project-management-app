import { MouseEvent, useState } from 'react';
import { useDeleteBoardMutation } from '../../app/RtkQuery';
import { BoardsTypes } from './typesBoards/TypesBoards';
import { DeleteButton } from '../../components/buttons';

const BoardsItem = ({ title, id, isActiveModal, getDeletedBoard }: BoardsTypes) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const handlerActiveModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(true);
    isActiveModal(true);
    getDeletedBoard(title, id);
  };

  return (
    <div className="boards__item">
      <h2 className="boards__item-title">{title}</h2>
      <DeleteButton type="button" onClick={handlerActiveModal} />
    </div>
  );
};

export default BoardsItem;
