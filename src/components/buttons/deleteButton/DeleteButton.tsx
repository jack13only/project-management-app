import { FC, MouseEvent } from 'react';

import './DeleteButton.scss';

interface DeleteButtonProps {
  className?: string;
  type: 'button';
  id?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ className, type, id, onClick }) => {
  return <button className={`btn-delete ${className}`} type={type} onClick={onClick} />;
};

export { DeleteButton };
