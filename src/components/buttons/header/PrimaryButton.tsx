import { FC } from 'react';

import './PrimaryButton.scss';

interface PrimaryButtonProps {
  dataTestId?: string;
  type: 'submit' | 'reset' | 'button';
  className: string;
  description: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ dataTestId, type, className, description }) => {
  return (
    <button data-testid={dataTestId} type={type} className={className}>
      {description}
    </button>
  );
};

export { PrimaryButton };
