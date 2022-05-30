import { FC, useState } from 'react';

import { useUpdateColumnMutation } from '../../../../app/RtkQuery';
import { ChangeTitleBtns } from '../../../buttons';

import './BoardColumnTitle.scss';

interface BoardColumnTitleTypes {
  columnTitle: string;
  columnId: string;
  boardId: string;
  order: number;
}

const BoardColumnTitle: FC<BoardColumnTitleTypes> = ({ columnId, columnTitle, boardId, order }) => {
  const [currentColumnTitle, setColumnTitle] = useState<string>(columnTitle);
  const [isOpenColumnTitle, setIsOpenColumnTitle] = useState<boolean>(false);

  const [updateColumn] = useUpdateColumnMutation();

  const changeTitle = () => {
    setIsOpenColumnTitle(true);
  };

  const submitColumnTitle = async () => {
    if (currentColumnTitle.trim().length) {
      setIsOpenColumnTitle(false);

      await updateColumn({
        columnId,
        boardId,
        body: { title: currentColumnTitle, order },
      });
    }
  };

  const cancelColumnTitle = () => {
    setIsOpenColumnTitle(false);
    setColumnTitle(columnTitle);
  };

  const handleColumnTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = event.target as HTMLInputElement;
    setColumnTitle(currentInput.value);
  };

  return (
    <>
      {isOpenColumnTitle ? (
        <div className="board__column-input">
          <input
            type="text"
            placeholder="change title"
            onChange={handleColumnTitleValue}
            value={currentColumnTitle}
          />

          <ChangeTitleBtns onClickSubmit={submitColumnTitle} onClickCancel={cancelColumnTitle} />
        </div>
      ) : (
        <h4 className="h4 board__column-title" onClick={changeTitle}>
          {columnTitle}
        </h4>
      )}
    </>
  );
};

export { BoardColumnTitle };
