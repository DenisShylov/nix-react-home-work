import React, { useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTrash,
  faEdit,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import * as todoActions from '../../todo.actions.js';
import style from './TodoList.css';

const TodoList = ({ taskList, deleteTask, updateTask }) => {
  const [edit, setEdit] = useState('');
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState(taskList);

  useMemo(() => {
    setFiltered(taskList);
  }, [taskList]);

  const statusTodo = useCallback((id) => {
    updateTask(id);
  });

  const todoFiltered = useCallback((status) => {
    if (status === 'all') {
      setFiltered(taskList);
    } else {
      const newTodo = [...taskList].filter((item) => item.status === status);
      setFiltered(newTodo);
    }
  });

  const deleteTodo = useCallback((id) => {
    deleteTask(id);
  });

  const updateTodo = useCallback((id, title) => {
    setEdit(id);
    setValue(title);
  });

  const saveTodo = useCallback((id) => {
    [...taskList].map((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });

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

const mapState = (state) => {
  return {
    taskList: state.taskData,
  };
};

const mapDispatch = {
  deleteTask: todoActions.deleteTask,
  updateTask: todoActions.updateTask,
};

const connector = connect(mapState, mapDispatch);

TodoList.propTypes = {
  taskList: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};
export default connector(TodoList);
