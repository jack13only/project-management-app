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
        <div className="modal__text">
          <h2>Are you sure?</h2>
          <h3>{`Do you want to delete board '${title}'`} ?</h3>
          <p>If you press `Yes`, the board will be deleted</p>
          <p>If you would like to cancel, press `Cancel`</p>
          <button type="button" onClick={deleteBoardItem}>
            Yes
          </button>
          <button type="button" onClick={cancelDeleteBoard}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BoardsItem;
