import { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { localizationObj } from '../../../features/localization';

import './BackButton.scss';

interface BackButtonProps {
  type: 'button';
}

const BackButton: FC<BackButtonProps> = ({ type }) => {
  const { lang } = useAppSelector((state) => state.langStorage);
  return (
    <button className="btn-back__wrapper" type={type}>
      <div className="btn-back" />
      <div className="btn-back-description">{localizationObj[lang].back}</div>
    </button>
  );
};

export { BackButton };
