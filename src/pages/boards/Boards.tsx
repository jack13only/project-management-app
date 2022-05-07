import { ChangeEvent, FC, useState } from 'react';

import './Boards.scss';

type TodosState = {
  id: string;
  text: string;
  completed: boolean;
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
          completed: false,
        },
      ]);
      setText('');
    }
  };

  return (
    <section className="boards">
      <h2 className="h2">Boards</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <label className="label">
        Enter a title for this card...
        <input type="text" value={text} onChange={handleText} />
        <button type="button" className="btn btn-log btn-bordered" onClick={addTodo}>
          Add a card
        </button>
      </label>
    </section>
  );
};

export { Boards };
