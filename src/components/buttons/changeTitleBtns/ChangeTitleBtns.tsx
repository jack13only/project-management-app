import { FC, MouseEvent } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { localizationObj } from '../../../features/localization';

import './ChangeTitleBtns.scss';

interface ChangeTitleBtnsProps {
  onClickSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ChangeTitleBtns: FC<ChangeTitleBtnsProps> = ({ onClickSubmit, onClickCancel }) => {
  const { lang } = useAppSelector((state) => state.langStorage);
  return (
    <div className="board__column-btns">
      <button className="button-modal__wrapper" type="submit" onClick={onClickSubmit}>
        <div className="button-modal button__submit" />
        <div className="button-modal__description">{localizationObj[lang].submit}</div>
      </button>
      <button className="button-modal__wrapper" type="button" onClick={onClickCancel}>
        <div className="button-modal button__cancel" />
        <div className="button-modal__description">{localizationObj[lang].cancel}</div>
      </button>
    </div>
  );
};

export { ChangeTitleBtns };
