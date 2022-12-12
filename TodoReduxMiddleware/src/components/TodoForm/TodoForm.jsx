import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import { createNewTaskAction } from '../../todo.actions.js';
import './TodoForm.css';

const TodoForm = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  });
  const addTodo = useCallback(() => {
    if (value) {
      dispatch(
        createNewTaskAction({
          id: uuid(),
          title: value,
          description: 'task',
          weight: '5',
          category: 'null',
          status: true,
        })
      );
    }

    setValue('');
  });

  return (
    <Row>
      <Col className="todoForm">
        <FormControl type="text" value={value} onChange={handleChange} />
        <Button className="add-btn" variant="light" onClick={addTodo}>
          add
        </Button>
      </Col>
    </Row>
  );
};

// const mapDispatch = {
//   createTask: todoActions.createNewTaskAction,
// };
// const connector = connect(null, mapDispatch);

// TodoForm.propTypes = {
//   createTask: PropTypes.func.isRequired,
// };
export default TodoForm;
