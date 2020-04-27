import React, { useState } from 'react';
import styled from 'styled-components';

type FormElem = React.FormEvent<HTMLFormElement>;

interface Todo {
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoAdd = (text: string): void => {
    const newTodos: Todo[] = [...todos, { text, complete: false }];
    if (text) setTodos(newTodos);
  };

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    handleTodoAdd(value);
    setValue('');
  };

  const handleComplete = (i: number): void => {
    const newTodos = [...todos];
    newTodos[i].complete = !newTodos[i].complete;
    setTodos(newTodos);
  };

  const handleDelete = (i: number): void => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };

  return (
    <Container>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={(e): void => setValue(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>

      <ListWrapper>
        {todos.map((item: Todo, i: number) => (
          <TodoList key={i.toString()} idx={i} isComplete={item.complete}>
            <div>{item.text}</div>
            <button type="button" onClick={(): void => handleComplete(i)}>
              {item.complete ? 'Incomplete' : 'Complete'}
            </button>
            <button type="button" onClick={(): void => handleDelete(i)}>
              &times;
            </button>
          </TodoList>
        ))}
      </ListWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ListWrapper = styled.section`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 50px;
`;

const TodoList = styled.div<{ idx: number; isComplete: boolean }>`
  display: flex;
  margin-top: ${(props): string => (props.idx === 0 ? '0' : '10px')};

  & > div {
    text-decoration: ${(props): string => (props.isComplete ? 'line-through' : 'none')};
  }

  & > button {
    &:nth-of-type(1) {
      margin-left: 5px;
    }
    &:nth-of-type(2) {
      margin-left: 20px;
    }
  }
`;

export default App;
