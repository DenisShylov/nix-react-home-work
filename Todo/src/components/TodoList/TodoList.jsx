import React, { useCallback, useState, useEffect } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTrash,
  faEdit,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import style from './TodoList.css';

const TodoList = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState('');
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    setFiltered(todo);
  }, [todo]);
  const todoFiltered = useCallback((status) => {
    if (status === 'all') {
      setFiltered(todo);
    } else {
      const newTodo = [...todo].filter((item) => item.status === status);
      setFiltered(newTodo);
    }
  });

  const deleteTodo = useCallback((id) => {
    const newTodo = [...todo].filter((item) => item.id !== id);
    setTodo(newTodo);
  });

  const statusTodo = useCallback((id) => {
    const newTodo = [...todo].filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newTodo);
  });

  const updateTodo = useCallback((id, title) => {
    setEdit(id);
    setValue(title);
  });

  const saveTodo = useCallback((id) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    setTodo(newTodo);
    setEdit('');
  });

  return (
    <div>
      <Row>
        <Col className="filter-btn-group">
          <ButtonGroup aria-label="Basic example">
            <Button
              className="button-status"
              variant="secondary"
              onClick={() => todoFiltered('all')}
            >
              All
            </Button>
            <Button
              className="button-status"
              variant="secondary"
              onClick={() => todoFiltered(true)}
            >
              Open
            </Button>
            <Button
              className="button-status"
              variant="secondary"
              onClick={() => todoFiltered(false)}
            >
              Close
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {filtered.map((item) => (
        <div key={item.id} className="list-item">
          {edit === item.id ? (
            <div>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          ) : (
            <div className={!item.status ? 'done' : ''}>{item.title}</div>
          )}

          {edit === item.id ? (
            <Button variant="success" onClick={() => saveTodo(item.id)}>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          ) : (
            <div>
              <Button variant="light" onClick={() => deleteTodo(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button
                variant="light"
                className={style.btn1}
                onClick={() => updateTodo(item.id, item.title)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                variant="light"
                className={style.btn1}
                onClick={() => statusTodo(item.id)}
              >
                {item.status ? (
                  <FontAwesomeIcon icon={faLockOpen} />
                ) : (
                  <FontAwesomeIcon icon={faLock} />
                )}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
