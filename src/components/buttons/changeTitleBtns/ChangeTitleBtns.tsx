import { FC } from 'react';

import './ChangeTitleBtns.scss';

interface ChangeTitleBtnsProps {
  onClickSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChangeTitleBtns: FC<ChangeTitleBtnsProps> = ({ onClickSubmit, onClickCancel }) => {
  return (
    <div className="board__column-btns">
      <button className="button-modal button__submit" type="submit" onClick={onClickSubmit} />
      <button className="button-modal button__cancel" type="button" onClick={onClickCancel} />
    </div>
  );
};

export { ChangeTitleBtns };
