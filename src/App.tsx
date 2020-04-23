import React, { useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string,
  complete: boolean
}

const App: React.FC = () => {
  const [ value, setValue ] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    handleTodoAdd(value);
    setValue('');
  }

  const handleTodoAdd = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  }

  const handleComplete = (i: number): void => {
    const newTodos = [...todos];
    newTodos[i].complete = !newTodos[i].complete;
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <section>
        {todos.map((item: ITodo, i: number) => (
          <div key={i.toString()}>
            <div>{item.text}</div>
            <button type="button" onClick={() => handleComplete(i)}>{item.complete ? 'Incomplete' : 'Complete'}</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;