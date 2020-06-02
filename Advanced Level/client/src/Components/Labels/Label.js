import React from 'react';
import PropTypes from 'prop-types';

// style
import style from './Label.module.css';

function Label({ children, color }) {
  let inlineStyle = {};
  if (color) {
    // inlineStyle.color = color;
  }
  return (
    <span className={style.child} style={inlineStyle}>
      {children}
    </span>
  );
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Label;
