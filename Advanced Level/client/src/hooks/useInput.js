import React, { useState } from 'react';

export const useInput = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleState = (event) => setState(event.target.value);

  return [state, handleState];
};
