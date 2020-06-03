import React from 'react';
import PropTypes from 'prop-types';

// styles
import style from './TaskPage.module.css';

// icons
import { FaArrowLeft } from 'react-icons/fa';

// components
import { Input, Button, Typography } from 'antd';

const { Title } = Typography;

function TaskPage() {
  // events
  const onChange = () => {};
  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} />
      <div className={style.container}>
        <Title className={style.heading + ' center'}>Add Task</Title>
        <Input
          placeholder={'Add Task'}
          onChange={onChange}
          className={style.input}
        />
        <Input
          placeholder={'Due Date'}
          onChange={onChange}
          className={style.input}
        />
        <Input
          placeholder={'Status'}
          onChange={onChange}
          className={style.input}
        />
        <Input
          placeholder={'Labels'}
          onChange={onChange}
          className={style.input}
        />
        <Input
          placeholder={'Priority'}
          onChange={onChange}
          className={style.input}
        />
        <Button className={`${style.input} ${style.button}`} block>
          Default
        </Button>
      </div>
    </div>
  );
}

export default TaskPage;
