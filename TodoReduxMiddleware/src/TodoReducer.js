import {
  SHOW_SPINNER,
  CREATE_TASK,
  DELETE_TASK,
  GET_TASK,
  UPDATE_TASK,
} from './todo.actions';

const initialState = {
  taskData: [],
  isFetching: false,
};

const TodoReducer = (state = initialState, action) => {
  // const newState = state.taskData.map((item) => item);
  switch (action.type) {
    case SHOW_SPINNER:
      return {
        ...state,
        isFetching: true,
      };

    case GET_TASK:
      return {
        ...state,
        taskData: action.payload.goods,
        isFetching: false,
      };

    case DELETE_TASK:
      return {
        ...state,
        taskData: state.taskData.filter(
          (taskId) => taskId.id !== action.payload
        ),
        isFetching: false,
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
        isFetching: false,
      };

    default:
      return state;
  }
};

export default TodoReducer;
