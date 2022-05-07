import { FC } from 'react';

import { TodoItem } from '../todoItem/TodoItem';

interface TodosState {
  id: string;
  text: string;
  complete: boolean;
}

interface TodoListProps {
  todos: TodosState[];
  removeTodo: (todoId: string) => void;
  toggleTodoComplete: (todoId: string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, removeTodo, toggleTodoComplete }) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            removeTodo={removeTodo}
            toggleTodoComplete={toggleTodoComplete}
            {...todo}
          />
        );
      })}
    </ul>
  );
};

export { TodoList };
