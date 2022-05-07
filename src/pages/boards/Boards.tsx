import { ChangeEvent, FC, useState } from 'react';

import { TodoList } from '../../components/todoList/TodoList';

import './Boards.scss';

type TodosState = {
  id: string;
  text: string;
  complete: boolean;
};

const Boards: FC = () => {
  const [todos, setTodos] = useState<TodosState[]>([]);
  const [text, setText] = useState<string>('');

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    const VALUE = event.target.value;
    setText(VALUE);
  };

  const addTodo = () => {
    if (text.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          complete: false,
        },
      ]);
      setText('');
    }
  };

  const removeTodo = (todoId: string) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const toggleTodoComplete = (todoId: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        } else {
          return {
            ...todo,
            complete: !todo.complete,
          };
        }
      })
    );
  };

  return (
    <section className="boards">
      <h2 className="h2">Boards</h2>
      <label className="label">
        <input
          className="search"
          type="text"
          value={text}
          placeholder="Enter a title for this card..."
          onChange={handleText}
        />
        <button className="btn btn-log btn-bordered" type="button" onClick={addTodo}>
          Add a card
        </button>
      </label>
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodoComplete={toggleTodoComplete} />
    </section>
  );
};

export { Boards };
