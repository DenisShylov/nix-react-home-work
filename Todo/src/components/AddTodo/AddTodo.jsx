import React, { useCallback, useState } from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import './AddTodo.css';
const AddTodo = ({ todo, setTodo }) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  });

  const addTodo = useCallback(() => {
    if (value) {
      setTodo([
        ...todo,
        {
          id: uuidv4(),
          title: value,
          status: true,
          description: '',
          creationDate: '',
          updateDate: '',
        },
      ]);
      setValue('');
    }
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

export default AddTodo;
