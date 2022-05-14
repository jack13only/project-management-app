import { FC, useEffect, useState } from 'react';

import { useGetColumnByIdQuery, useUpdateColumnMutation } from '../../app/RtkQuery';

import './BoardColumnTitle.scss';

interface BoardColumnTitleTypes {
  columnTitle: string;
  columnId: string;
  boardId: string;
  order: number;
}

const BoardColumnTitle: FC<BoardColumnTitleTypes> = ({ columnId, columnTitle, boardId, order }) => {
  const { data = [], error } = useGetColumnByIdQuery({ columnId, boardId });
  const [updateColumn] = useUpdateColumnMutation();

  const [currentColumnTitle, setColumnTitle] = useState<string>('');
  const [isOpenColumnTitle, setIsOpenColumnTitle] = useState<boolean>(false);

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

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

  const cancelColumnTitle = () => {
    setIsOpenColumnTitle(false);
  };

  const handleColumnTitleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = event.target as HTMLInputElement;
    setColumnTitle(currentInput.value);
  };

  useEffect(() => {
    setColumnTitle(data.title);
  }, [data.title]);

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
          <div className="board__column-btns">
            <button type="submit" onClick={saveColumnTitle}>
              Submit
            </button>
            <button type="button" onClick={cancelColumnTitle}>
              Cancel
            </button>
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
