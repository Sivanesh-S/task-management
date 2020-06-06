import React from 'react';
import PropTypes from 'prop-types';

// style
import style from './Label.module.css';

// components
import { Tag } from 'antd';

function Label({ children, color }) {
  if (color) {
    // inlineStyle.color = color;
  }
  return (
    <Tag color="cyan" className={style.child}>
      {children}
    </Tag>
  );
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Label;
