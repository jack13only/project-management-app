import { FC, MouseEvent } from 'react';

import './DeleteButton.scss';

interface DeleteButtonProps {
  type: 'button';
  id?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ type, id, onClick, className }) => {
  return <button className={`btn-delete ${className}`} type={type} onClick={onClick} />;
};

export { DeleteButton };
