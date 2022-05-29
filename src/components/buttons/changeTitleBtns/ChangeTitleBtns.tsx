import { FC } from 'react';

import './ChangeTitleBtns.scss';

interface ChangeTitleBtnsProps {
  onClickSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChangeTitleBtns: FC<ChangeTitleBtnsProps> = ({ onClickSubmit, onClickCancel }) => {
  return (
    <div className="board__column-btns">
      <button className="button-modal__wrapper" type="submit" onClick={onClickSubmit}>
        <div className="button-modal button__submit" />
        <div className="button-modal__description">Submit</div>
      </button>
      <button className="button-modal__wrapper" type="button" onClick={onClickCancel}>
        <div className="button-modal button__cancel" />
        <div className="button-modal__description">Cancel</div>
      </button>
    </div>
  );
};

export { ChangeTitleBtns };
