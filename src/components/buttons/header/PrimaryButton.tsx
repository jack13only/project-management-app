import { FC } from 'react';

import './PrimaryButton.scss';

interface PrimaryButtonProps {
  dataTestId?: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
  description: string;
  onClick?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  dataTestId,
  type,
  className,
  description,
  onClick,
}) => {
  return (
    <button data-testid={dataTestId} type={type} className={className} onClick={onClick}>
      {description}
    </button>
  );
};

export { PrimaryButton };
