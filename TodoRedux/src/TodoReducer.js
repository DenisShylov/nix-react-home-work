import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from './todo.actions';
import { v4 as uuid } from 'uuid';

const initialState = {
  taskData: [{ id: uuid(), title: 'Buy milk', status: true }],
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        taskData: state.taskData.concat(action.payload),
      };

    case DELETE_TASK:
      return {
        ...state,
        taskData: state.taskData.filter(
          (taskId) => taskId.id !== action.payload
        ),
      };

    case UPDATE_TASK:
      return {
        ...state,
        taskData: state.taskData.filter((item) => {
          if (item.id === action.payload) {
            item.status = !item.status;
          }

          return item;
        }),
      };

    default:
      return state;
  }
};

export default TodoReducer;
