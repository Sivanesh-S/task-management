import React from 'react';
import PropTypes from 'prop-types';

// style
import style from './TaskProperty.module.css';

function TaskProperty(props) {
  const { icon, text, iconColor, textColor, color } = props;
  let propertyColor = color ? color : textColor;

  return (
    <span className={style.property}>
      {icon({
        className: `${style.icon} ${style.size}`,
        style: {
          color: iconColor,
        },
      })}
      <span
        style={{ color: text === 'expired' ? 'crimson' : propertyColor }}
        className={style.size}
      >
        {text}
      </span>
    </span>
  );
}

TaskProperty.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

export default TaskProperty;
