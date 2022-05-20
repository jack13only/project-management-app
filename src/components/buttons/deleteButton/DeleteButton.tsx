import { FC } from 'react';

import './DeleteButton.scss';

interface DeleteButtonProps {
  type: 'button';
  id?: string;
  removeCard?: (cardId: string) => void;
  removeCardVisibility?: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ type, id, removeCard, removeCardVisibility }) => {
  return (
    <button
      className="btn-delete"
      type={type}
      onClick={removeCard ? () => removeCard(id ?? '') : removeCardVisibility}
    />
  );
};

export { DeleteButton };
