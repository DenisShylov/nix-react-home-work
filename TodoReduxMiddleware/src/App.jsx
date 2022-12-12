import React from 'react';
import Container from 'react-bootstrap/esm/Container.js';
import { Provider } from 'react-redux';

import Header from './components/Header/Header.jsx';
import TodoList from './components/TodoList/TodoList.jsx';
import TodoForm from './components/TodoForm/TodoForm.jsx';
import store from './store.js';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <TodoForm />
        <TodoList />
      </Container>
    </Provider>
  );
};

export default App;
