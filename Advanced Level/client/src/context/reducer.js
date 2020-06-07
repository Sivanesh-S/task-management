import { taskNormalizer, deleteTask } from './reducerUtils';

export const reducerFunction = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case 'GET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...data,
        },
      };

    case 'GET_TASKS':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...taskNormalizer(data),
        },
      };
    case 'GET_ARCHIVED':
      return {
        ...state,
        archived: {
          ...state.archived,
          ...taskNormalizer(data),
        },
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: {
          ...deleteTask(state.tasks, data),
        },
      };
    case 'ADD_TO_ARCHIVE':
      const archivedTask = state.tasks[data];
      return {
        ...state,
        tasks: {
          ...deleteTask(state.tasks, data),
        },
        archived: {
          ...state.archived,
          [data]: archivedTask,
        },
      };

    case 'CHANGE_VIEW':
      return {
        ...state,
        isShowArchived: data,
      };
    case 'LOGOUT':
      return {};
    case 'LOGIN':
      return {
        provider: data.provider,
        authToken: data.authToken,
      };
    default:
      throw new Error('Type is not in reducer function. Go to reducer.js');
  }
};

export default reducerFunction;
