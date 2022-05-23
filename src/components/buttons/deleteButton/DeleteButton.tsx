import { FC, MouseEvent } from 'react';

import './DeleteButton.scss';

interface DeleteButtonProps {
  type: 'button';
  id?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ type, id, onClick }) => {
  return <button className="btn-delete" type={type} onClick={onClick} />;
};

export { DeleteButton };
