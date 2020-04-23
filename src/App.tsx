import React, { useState } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
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
    const newTodos: ITodo[] = [...todos, { text }];
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onClick={handleSubmit}>
        <input type='text' value={value} onChange={e => setValue(e.target.value)} />
        <button type='submit'>Add Todo</button>
      </form>

      <section>
        {todos.map((item: ITodo, i: number) => (
          <div key={i}>{item.text}</div>
        ))}
      </section>
    </div>
  )
}

export default App;