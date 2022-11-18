import React from 'react';
import TodoList from './TodoList/TodoList.jsx';

const TodoForm = () => {
  return (
    <div>
      <input type="text" />
      <button>Add</button>
      <TodoList />
    </div>
  );
};

export default TodoForm;
