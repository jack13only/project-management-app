import { FC } from 'react';

interface DeleteButtonProps {
  className: string;
  type: 'button';
  description: string;
  id?: string;
  removeCard?: (cardId: string) => void;
  removeCardVisibility?: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  className,
  type,
  description,
  id,
  removeCard,
  removeCardVisibility,
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={removeCard ? () => removeCard(id ?? '') : removeCardVisibility}
    >
      {description}
    </button>
  );
};

export { DeleteButton };
