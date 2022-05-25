import { FC } from 'react';

interface ChangeTitleBtnsProps {
  onClickSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChangeTitleBtns: FC<ChangeTitleBtnsProps> = ({ onClickSubmit, onClickCancel }) => {
  return (
    <div className="board__column-btns">
      <button type="submit" onClick={onClickSubmit}>
        Submit
      </button>
      <button type="button" onClick={onClickCancel}>
        Cancel
      </button>
    </div>
  );
};

export { ChangeTitleBtns };
