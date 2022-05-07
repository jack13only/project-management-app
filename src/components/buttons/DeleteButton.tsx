import { FC } from 'react';

interface DeleteButtonProps {
  className: string;
  type: 'button';
  description: string;
  id: string;
  removeTodo: (todoId: string) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ className, type, description, id, removeTodo }) => {
  return (
    <button className={className} type={type} onClick={() => removeTodo(id)}>
      {description}
    </button>
  );
};

export { DeleteButton };
