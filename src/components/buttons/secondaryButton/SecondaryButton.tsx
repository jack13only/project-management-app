import { FC } from 'react';

interface SecondaryButtonProps {
  className: string;
  type: 'button';
  description: string;
  onClick: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ className, type, description, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {description}
    </button>
  );
};

export { SecondaryButton };
