export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const createTask = (taskData) => {
  return {
    type: CREATE_TASK,
    payload: taskData,
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
