import { FC } from 'react';

interface InputCheckboxProps {
  className: string;
  type: 'checkbox';
  complete: boolean;
  id: string;
  toggleTodoComplete: (todoId: string) => void;
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  className,
  type,
  complete,
  id,
  toggleTodoComplete,
}) => {
  return (
    <input
      className={className}
      type={type}
      checked={complete}
      onChange={() => toggleTodoComplete(id)}
    />
  );
};

export { InputCheckbox };
