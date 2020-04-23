import React, { useState } from 'react';
import styled from 'styled-components';

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
    <S.Container>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <S.ListWrapper>
        {todos.map((item: ITodo, i: number) => (
          <S.TodoList key={i.toString()} idx={i} isComplete={item.complete}>
            <div>{item.text}</div>
            <button type="button" onClick={() => handleComplete(i)}>
              {item.complete ? "Incomplete" : "Complete"}
            </button>
          </S.TodoList>
        ))}
      </S.ListWrapper>
    </S.Container>
  );
}

const S: any = {};

S.Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

S.ListWrapper = styled.section`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 50px;
`;

S.TodoList = styled.div<{ idx: number, isComplete: boolean }>`
  display: flex;
  margin-top: ${props => (
    props.idx === 0 ? '0' : '10px'
  )};

  & > div {
    text-decoration: ${props => (
      props.isComplete ? 'line-through' : 'none'
    )}
  }

  & > button {
    margin-left: 5px;
  }
`;

export default App;