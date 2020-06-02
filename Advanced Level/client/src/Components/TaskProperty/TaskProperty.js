import React from 'react';
import PropTypes from 'prop-types';

// style
import style from './TaskProperty.module.css';

function TaskProperty(props) {
  const { icon, text, iconColor, textColor, color } = props;
  let propertyColor = color ? color : textColor;
  console.log('icon:', icon);

  return (
    <span className={style.property}>
      {icon({
        className: `${style.icon} ${style.size}`,
        style: {
          color: iconColor,
        },
      })}
      <span style={{ color: propertyColor }} className={style.size}>
        {text}
      </span>
    </span>
  );
}

TaskProperty.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

export default TaskProperty;
