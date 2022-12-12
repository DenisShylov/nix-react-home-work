import * as taskGateway from './tasksGateway';

export const GET_TASK = 'GET_TASK';
// export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const SORTED_TASK = 'SORTED_TASK';

export const taskListReceived = (taskData) => {
  return {
    type: GET_TASK,
    payload: taskData,
  };
};
// export const createTask = (taskData) => {
//   return {
//     type: CREATE_TASK,
//     payload: taskData,
//   };
// };

export const sortedTask = (payload) => {
  return {
    type: SORTED_TASK,
    taskData: payload.goods,
  };
};
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
//  done

export const fetchingGoodsList = () => {
  return function (dispatch) {
    taskGateway
      .getGoodsList()
      .then((goodsList) => dispatch(taskListReceived(goodsList)));
  };
};
//  done

export const createNewTaskAction = (taskData) => {
  return function (dispatch) {
    taskGateway.createItem(taskData).then(() => dispatch(fetchingGoodsList()));
  };
};
//  done
export const deleteItemList = (id) => {
  return function (dispatch) {
    taskGateway.deleteItem(id).then(() => dispatch(deleteTask(id)));
  };
};
// done
export const updateStatusItem = (id, status) => {
  return function (dispatch) {
    taskGateway.updateItem(id, status).then(() => dispatch(updateTask(id)));
  };
};

export const updateTitleItem = (id, title) => {
  return function (dispatch) {
    return taskGateway
      .updateItem(id, title)
      .then(() => dispatch(fetchingGoodsList()));
  };
};
