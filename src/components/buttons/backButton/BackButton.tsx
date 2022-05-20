import { FC } from 'react';

import './BackButton.scss';

interface BackButtonProps {
  type: 'button';
}

const BackButton: FC<BackButtonProps> = ({ type }) => {
  return <button className="btn-back" type={type} />;
};

export { BackButton };
