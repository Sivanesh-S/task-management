import { taskNormalizer } from './reducerUtils';

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

    default:
      throw new Error('Type is not in reducer function. Go to reducer.js');
  }
};

export default reducerFunction;
