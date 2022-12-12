import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
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
import * as todoActions from '../../todo.actions';
import style from './TodoList.css';
import ShowSpinner from '../Spinner/ShowSpinner.jsx';

const TodoList = ({
  isFetching,

  fetchingGoodsList,
  taskList,
  deleteTask,
  updateTitleTask,
  updateStatusTask,
}) => {
  const [edit, setEdit] = useState('');
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState(taskList);

  // const taskList = useSelector((state) => state.taskData);
  // const isFetching = useSelector((state) => state.isFetching);

  useEffect(() => {
    fetchingGoodsList();
  }, []);

  useMemo(() => {
    setFiltered(taskList);
  }, [taskList]);

  const statusTodo = useCallback((id) => {
    const itemId = [...taskList].find((item) => item.id === id);
    const updatedItem = { ...itemId, status: !status };

    updateStatusTask(itemId.id, updatedItem);
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

  const saveTodo = useCallback((id, title) => {
    const getItem = [...taskList].find((item) => item.id === id);

    const updatedItem = { ...getItem, title: value };
    updateTitleTask(getItem.id, updatedItem);
    setEdit('');
  });

  {
    if (isFetching) {
      return <ShowSpinner />;
    }
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

        {filtered
          .sort((a, b) => b.title.length - a.title.length)
          .map((item) => (
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
                <Button
                  variant="success"
                  onClick={() => saveTodo(item.id, item.title)}
                >
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
  }
};

const mapState = (state) => {
  return {
    taskList: state.taskData,
    isFetching: state.isFetching,
  };
};

const mapDispatch = {
  fetchingSpinner: todoActions.showSpinner,
  fetchingGoodsList: todoActions.fetchingGoodsList,
  deleteTask: todoActions.deleteItemList,
  updateStatusTask: todoActions.updateStatusItem,
  updateTitleTask: todoActions.updateTitleItem,
};

const connector = connect(mapState, mapDispatch);

TodoList.propTypes = {
  taskList: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};
export default connector(TodoList);
