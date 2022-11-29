import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import * as todoActions from '../../todo.actions.js';
import './TodoForm.css';

const TodoForm = ({ createTask }) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  });
  const addTodo = useCallback(() => {
    createTask({
      id: uuid(),
      title: value,
      status: true,
    });

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

const mapState = (state) => {
  return {
    taskList: state.taskData,
  };
};

const mapDispatch = {
  createTask: todoActions.createTask,
  deleteTask: todoActions.deleteTask,
};
const connector = connect(mapState, mapDispatch);

TodoForm.propTypes = {
  createTask: PropTypes.func.isRequired,
};
export default connector(TodoForm);
