import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import { v4 as uuidv4 } from 'uuid';
import AddTodo from './components/AddTodo/AddTodo.jsx';
import Header from './components/Header/Header.jsx';
import TodoList from './components/TodoList/TodoList.jsx';

const App = () => {
  const [data, setData] = useState([
    {
      id: uuidv4(),
      title: 'Buy milk',
      description: '',
      status: false,
      creationDate: '',
      updateDate: '',
    },
  ]);

  return (
    <Container>
      <Header />
      <AddTodo todo={data} setTodo={setData} />
      <TodoList todo={data} setTodo={setData} />
    </Container>
  );
};

export default App;
