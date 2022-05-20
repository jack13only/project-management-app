import { useState } from 'react';
import { useDeleteBoardMutation } from '../../app/RtkQuery';
import { Modal } from '../../components';
import { BoardsTypes } from './typesBoards/TypesBoards';

const BoardsItem = ({ title, id, isActiveModal }: BoardsTypes) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [deleteBoard] = useDeleteBoardMutation();

  const handlerActiveModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(true);
    isActiveModal(true);
  };

  const cancelDeleteBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(false);
    isActiveModal(false);
  };

  const deleteBoardItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(false);
    deleteBoard(id);
    isActiveModal(false);
  };

  return (
    <>
      <div className="boards__item">
        <h2 className="boards__item-title">{title}</h2>
        <button type="button" onClick={handlerActiveModal}>
          Delete
        </button>
      </div>
      <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
        <h2>Do you want to delete board {title} ?</h2>
        <button type="button" onClick={deleteBoardItem}>
          Yes
        </button>
        <button type="button" onClick={cancelDeleteBoard}>
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default BoardsItem;
