import { FC } from 'react';

import { InputCheckbox } from '../inputCheckbox/InputCheckbox';
import { DeleteButton } from '../buttons/DeleteButton';

interface TodoItemProps {
  id: string;
  text: string;
  complete: boolean;
  removeTodo: (todoId: string) => void;
  toggleTodoComplete: (todoId: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ id, text, complete, removeTodo, toggleTodoComplete }) => {
  return (
    <li key={id} className="task">
      <InputCheckbox
        className="task-checkbox"
        type="checkbox"
        complete={complete}
        id={id}
        toggleTodoComplete={toggleTodoComplete}
      />
      <span className="task-text">{text}</span>
      <DeleteButton
        className="task-delete"
        type="button"
        description="&times;"
        id={id}
        removeTodo={removeTodo}
      />
    </li>
  );
};

export { TodoItem };
