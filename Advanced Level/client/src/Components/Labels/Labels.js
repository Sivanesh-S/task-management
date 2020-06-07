import React from 'react';

// components
import Label from './Label';

// style
import style from './Label.module.css';

function Labels({ labels }) {
  return (
    <div className={style.parent}>
      {labels.map((label, index) => {
        const { name, color } = label;
        return (
          <Label key={index} color={color}>
            {name}
          </Label>
        );
      })}
    </div>
  );
}

export default Labels;
