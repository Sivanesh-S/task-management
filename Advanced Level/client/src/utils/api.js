import axios from 'axios';

let api = null;

const getAPI = () => {
  if (api) {
    return api;
  }
  const provider = localStorage.getItem('provider');
  const authToken = localStorage.getItem('authToken');

  let authHeader = null;
  if (provider === 'GOOGLE_AUTH') {
    authHeader = `Bearer google ${authToken}`;
  } else {
    // basic auth
    authHeader = `bearer ${authToken}`;
  }

  api = axios.create({
    headers: {
      Authorization: authHeader,
    },
  });
  return api;
};

export default getAPI();
