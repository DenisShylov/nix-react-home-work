import {
  CREATE_TASK,
  DELETE_TASK,
  GET_TASK,
  UPDATE_TASK,
  SORTED_TASK,
} from './todo.actions';
import { v4 as uuid } from 'uuid';

const initialState = {
  taskData: [],
};

const TodoReducer = (state = initialState, action) => {
  const newState = state.taskData.map((item) => item);
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        taskData: action.payload.goods,
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
