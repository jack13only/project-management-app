import { FC, MouseEvent } from 'react';

import './DeleteButton.scss';

interface DeleteButtonProps {
  type: 'button';
  id?: string;
  removeCard?: (cardId: string) => void;
  removeCardVisibility?: () => void;
  deleteBoardItem?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  type,
  id,
  removeCard,
  removeCardVisibility,
  deleteBoardItem,
}) => {
  return (
    <button
      className="btn-delete"
      type={type}
      onClick={
        removeCard
          ? () => removeCard(id ?? '')
          : removeCardVisibility
          ? removeCardVisibility
          : deleteBoardItem
      }
    />
  );
};

export { DeleteButton };
