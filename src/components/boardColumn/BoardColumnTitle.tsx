import { FC, useState } from 'react';

import { useUpdateColumnMutation } from '../../app/RtkQuery';

import './BoardColumnTitle.scss';

interface BoardColumnTitleTypes {
  columnTitle: string;
  columnId: string;
  boardId: string;
  order: number;
}

const BoardColumnTitle: FC<BoardColumnTitleTypes> = ({ columnId, columnTitle, boardId, order }) => {
  const [currentColumnTitle, setColumnTitle] = useState<string>('');
  const [isOpenColumnTitle, setIsOpenColumnTitle] = useState<boolean>(false);
  const [updateColumn] = useUpdateColumnMutation();

  const changeTitle = () => {
    setIsOpenColumnTitle(true);
  };

  const saveColumnTitle = async () => {
    if (currentColumnTitle.trim().length) {
      setIsOpenColumnTitle(false);

      await updateColumn({
        columnId,
        boardId,
        body: { title: currentColumnTitle, order },
      });
    }
  };

  const handleColumnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = event.target as HTMLInputElement;
    setColumnTitle(currentInput.value);
  };

  return (
    <>
      {isOpenColumnTitle ? (
        <div className="board__column-input">
          <input type="text" placeholder="change title" onChange={handleColumnTitle} />
          <div className="board__column-btns">
            <button type="button" onClick={saveColumnTitle}>
              Submit
            </button>
            <button type="button">Cancel</button>
          </div>
        </div>
      ) : (
        <h4 className="board__column-title" onClick={changeTitle}>
          {columnTitle}
        </h4>
      )}
    </>
  );
};

export { BoardColumnTitle };
