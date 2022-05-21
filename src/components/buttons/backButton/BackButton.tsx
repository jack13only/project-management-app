import { FC } from 'react';

import './BackButton.scss';

interface BackButtonProps {
  type: 'button';
}

const BackButton: FC<BackButtonProps> = ({ type }) => {
  return (
    <button className="btn-back__wrapper" type={type}>
      <div className="btn-back" />
      <div className="btn-back-description">Back</div>
    </button>
  );
};

export { BackButton };
