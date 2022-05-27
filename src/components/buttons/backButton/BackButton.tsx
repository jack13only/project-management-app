import { FC } from 'react';

import './BackButton.scss';

interface BackButtonProps {
  classNameWrapper: string;
  className: string;
  type: 'button';
  description: string;
  onClick?: () => void;
}

const BackButton: FC<BackButtonProps> = ({
  classNameWrapper,
  className,
  type,
  description,
  onClick,
}) => {
  return (
    <button className={classNameWrapper} type={type} onClick={onClick}>
      <div className={className} />
      <div className="btn-back-description">{description}</div>
    </button>
  );
};

export { BackButton };
