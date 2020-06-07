export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isInvalidPassword(password) {
  if (!password) {
    return 'Please enter the password';
  }

  if (password.length < 8) {
    return 'Your password must be at least 8 characters';
  }
  if (password.search(/[a-z]/i) < 0) {
    return 'Your password must contain at least one letter.';
  }
  if (password.search(/[0-9]/) < 0) {
    return 'Your password must contain at least one digit.';
  }
  return false;
}

export const daysDifference = (current, dueDate) => {
  const difference = dueDate - current;
  const daysDiff = Math.floor(difference / 1000 / 60 / 60 / 24);
  return daysDiff;
};

export const getRandomColor = () => {
  const colors = [
    'magenta',
    'red',
    'yellow',
    'volcano',
    'orange',
    'gold',
    'lime',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
