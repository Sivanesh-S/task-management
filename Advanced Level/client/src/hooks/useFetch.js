import { useState } from 'react';

import api from '../utils/api';

export const useFetch = (url, method, body) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const call = async () => {
    setLoading(true);
    setData(null);
    setError(null);

    const apiObj = { url, method, body };

    try {
      const response = await api()(apiObj);
      setData(response.data);
      setError(null);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(`[useFetch] Some error in API Fetching: ${err.message}`);
      setData(null);
      setLoading(false);
    }
  };

  return [loading, data, error, call];
};
