import * as taskGateway from './tasksGateway';

export const SHOW_SPINNER = 'SHOW_SPINNER';
export const GET_TASK = 'GET_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
// export const SORTED_TASK = 'SORTED_TASK';

export const showSpinner = () => {
  return {
    type: SHOW_SPINNER,
  };
};
export const taskListReceived = (taskData) => {
  return {
    type: GET_TASK,
    payload: taskData,
  };
};

// export const sortedTask = (payload) => {
//   return {
//     type: SORTED_TASK,
//     taskData: payload.goods,
//   };
// };
export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

export const updateTask = (taskId) => {
  return {
    type: UPDATE_TASK,
    payload: taskId,
  };
};

export const fetchingGoodsList = () => {
  return function (dispatch) {
    dispatch(showSpinner());
    taskGateway
      .getGoodsList()
      .then((goodsList) => dispatch(taskListReceived(goodsList)));
  };
};

export const createNewTaskAction = (taskData) => {
  return function (dispatch) {
    dispatch(showSpinner());

    taskGateway.createItem(taskData).then(() => dispatch(fetchingGoodsList()));
  };
};

export const deleteItemList = (id) => {
  return function (dispatch) {
    dispatch(showSpinner());
    taskGateway.deleteItem(id).then(() => dispatch(deleteTask(id)));
  };
};

export const updateStatusItem = (id, status) => {
  return function (dispatch) {
    dispatch(showSpinner());
    taskGateway.updateItem(id, status).then(() => dispatch(updateTask(id)));
  };
};

export const updateTitleItem = (id, title) => {
  return function (dispatch) {
    dispatch(showSpinner());

    return taskGateway
      .updateItem(id, title)
      .then(() => dispatch(fetchingGoodsList()));
  };
};
