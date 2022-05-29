import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useDeleteBoardMutation, useUpdateBoardMutation } from '../../app/RtkQuery';
import { BoardsTypes } from './typesBoards/TypesBoards';
import { DeleteButton, ChangeTitleBtns } from '../../components/buttons';
import { Textarea } from '../../components';
import { localizationObj } from '../../features/localization';
import { useAppSelector } from '../../app/hooks';

const BoardsItem = ({ title, id, description, isActiveModal, getDeletedBoard }: BoardsTypes) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentTDescription] = useState(description);
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
    setCurrentTDescription(VALUE);
  };

  const submitBoardTitleAndDescr = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (currentTitle.trim().length) {
      setIsOpenBoardTitle(false);
      setIsOpenBoardDescr(false);

      await updateBoard({
        boardId: id,
        body: { title: currentTitle, description: currentDescription },
      });
    }
  };

  const cancelBoardTitleAndDescr = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpenBoardTitle(false);
    setIsOpenBoardDescr(false);
  };

  return (
    <div className="boards__item">
      {!isOpenBoardTitle ? (
        <h2
          className="boards__item-title"
          onClick={(event: React.MouseEvent<HTMLHeadingElement>) => {
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

          <ChangeTitleBtns
            onClickSubmit={submitBoardTitleAndDescr}
            onClickCancel={cancelBoardTitleAndDescr}
          />
        </div>
      )}

      {!isOpenBoardDescr ? (
        <p
          className="boards__item-descr"
          onClick={(event: React.MouseEvent<HTMLParagraphElement>) => {
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

          <ChangeTitleBtns
            onClickSubmit={submitBoardTitleAndDescr}
            onClickCancel={cancelBoardTitleAndDescr}
          />
        </div>
      )}
      <DeleteButton type="button" onClick={handlerActiveModal} />
    </div>
  );
};

export default BoardsItem;
