import { FC } from 'react';

import './TertiaryButton.scss';

interface TertiaryButtonProps {
  className: string;
  type: 'button';
  description: string;
  isOpenCard?: boolean;
  onClick: () => void;
}

const TertiaryButton: FC<TertiaryButtonProps> = ({
  className,
  type,
  description,
  isOpenCard,
  onClick,
}) => {
  return (
    <button
      className={isOpenCard ? `${className} hidden` : className}
      type={type}
      onClick={onClick}
    >
      <span className="button__tertiary-description">{description}</span>
    </button>
  );
};

export { TertiaryButton };
