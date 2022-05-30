import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteBoardMutation, useUpdateBoardMutation } from '../../app/RtkQuery';
import { BoardsTypes } from './typesBoards/TypesBoards';
import { DeleteButton, ChangeTitleBtns } from '../../components/buttons';
import { Textarea } from '../../components';
import { localizationObj } from '../../features/localization';
import { useAppSelector } from '../../app/hooks';

const BoardsItem = ({
  title,
  id,
  description,
  isActiveModal,
  getDeletedBoard,
  activeModalProps,
}: BoardsTypes) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [isOpenBoardTitle, setIsOpenBoardTitle] = useState(false);
  const [isOpenBoardDescr, setIsOpenBoardDescr] = useState(false);
  const { lang } = useAppSelector((state) => state.langStorage);

  const [updateBoard] = useUpdateBoardMutation();

  const handlerActiveModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveModal(true);
    isActiveModal(true);
    getDeletedBoard(title, id);
  };

  const handleBoardTitle = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const VALUE = event.target.value;
    setCurrentTitle(VALUE);
  };

  const handleBoardDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const VALUE = event.target.value;
    setCurrentDescription(VALUE);
  };

  const submitBoardTitle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (currentTitle.trim().length) {
      setIsOpenBoardTitle(false);
      setIsOpenBoardDescr(false);
      setCurrentDescription(description);

      await updateBoard({
        boardId: id,
        body: { title: currentTitle, description },
      });
    }
  };

  const submitBoardDescr = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (currentDescription.trim().length) {
      setIsOpenBoardTitle(false);
      setIsOpenBoardDescr(false);
      setCurrentTitle(title);

      await updateBoard({
        boardId: id,
        body: { title, description: currentDescription },
      });
    }
  };

  const cancelBoardDescr = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentDescription(description);
    setIsOpenBoardDescr(false);
  };

  const cancelBoardTitle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentTitle(title);
    setIsOpenBoardTitle(false);
  };

  return (
    <div
      className="boards-item__link"
      onClick={activeModalProps ? (e: MouseEvent<HTMLDivElement>) => e.preventDefault() : undefined}
    >
      <div>
        {!isOpenBoardTitle ? (
          <h2
            className="boards__item-title"
            onClick={(event: MouseEvent<HTMLHeadingElement>) => {
              event.preventDefault();
              setIsOpenBoardTitle(true);
            }}
          >
            {title}
          </h2>
        ) : (
          <div className="boards__item-input__wrapper">
            <input
              className="boards__item-input"
              type="text"
              placeholder={localizationObj[lang].signUp}
              onChange={handleBoardTitle}
              value={currentTitle}
              onClick={(event: MouseEvent<HTMLInputElement>) => event.preventDefault()}
            />
            <ChangeTitleBtns onClickSubmit={submitBoardTitle} onClickCancel={cancelBoardTitle} />
          </div>
        )}

        {!isOpenBoardDescr ? (
          <p
            className="boards__item-descr"
            onClick={(event: MouseEvent<HTMLParagraphElement>) => {
              event.preventDefault();
              setIsOpenBoardDescr(true);
            }}
          >
            {description}
          </p>
        ) : (
          <div className="boards__item-input__wrapper">
            <Textarea
              className="textarea"
              cols={3}
              rows={3}
              placeholder={localizationObj[lang].yourTask}
              value={currentDescription}
              onChange={handleBoardDescription}
              onClick={(event: MouseEvent<HTMLTextAreaElement>) => event.preventDefault()}
            />
            <ChangeTitleBtns onClickSubmit={submitBoardDescr} onClickCancel={cancelBoardDescr} />
          </div>
        )}
      </div>
      <div className="task__btns">
        <Link to={`/boards/${id}`}>
          <button className="button__tertiary" type="button">
            {localizationObj[lang].openBoard}
          </button>
        </Link>
        <DeleteButton type="button" onClick={handlerActiveModal} />
      </div>
    </div>
  );
};

export default BoardsItem;
