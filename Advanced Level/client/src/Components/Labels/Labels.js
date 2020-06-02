import React from 'react';

// components
import Label from './Label';

// style
import style from './Label.module.css';

function Labels() {
  return (
    <div className={style.parent}>
      <Label color="crimson">Disney</Label>
      <Label color="violet">Disney</Label>
    </div>
  );
}

export default Labels;
