import { useState } from 'react';
import { BoardsTypes } from './typesBoards/TypesBoards';

const BoardsItem = ({ title, id, isActiveModal, getDeletedBoard }: BoardsTypes) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const handlerActiveModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(true);
    isActiveModal(true);
    getDeletedBoard(title, id);
  };

  return (
    <>
      <div className="boards__item">
        <h2 className="boards__item-title">{title}</h2>
        <button type="button" onClick={handlerActiveModal}>
          Delete
        </button>
      </div>
    </>
  );
};

export default BoardsItem;
