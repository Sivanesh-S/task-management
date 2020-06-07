import React, { useState, useContext } from 'react';
import { useInput } from '../../hooks';

// routing
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';
import { apiPrefix } from '../../constants';

// context
import { store } from '../../context';

// styles
import style from './TaskPage.module.css';

// icons
import { FaArrowLeft } from 'react-icons/fa';

// components
import { Input, Typography, Tag, Select, message } from 'antd';
import DatePicker from '../DatePicker/DatePicker';
import format from 'dayjs';
import { getRandomColor } from '../../utils';

const { Title } = Typography;
const { Option } = Select;

function TaskPage(props) {
  const { dispatch } = useContext(store);
  const [name, setName] = useInput(props.name);
  const [status, setStatus] = useState(props.status);
  const [priority, setPriority] = useState(props.priority);
  const [dueDate, setDueDate] = useState(props.dueDate);
  const [labels, setLabels] = useState(props.labels);
  const [labelInput, setLabelInput] = useState('');

  const history = useHistory();

  // routing
  const backToMain = () => history.push('/');

  const buttonText = props.from === 'UPDATE' ? 'Update Task' : 'Add Task';

  // events

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(
      'name, status ,priority, labels, dueDate:',
      name,
      status,
      priority,
      labels,
      dueDate
    );

    if (props.from === 'UPDATE') {
      await api().put(`${apiPrefix}tasks/${props.taskId}`, {
        name,
        status,
        priority,
        labels,
        dueDate,
      });
    } else {
      const tasks = await api().post(`${apiPrefix}tasks/`, {
        name,
        status,
        priority,
        labels,
        dueDate,
      });
    }

    const tasks = await api().get(`${apiPrefix}/tasks`);
    dispatch({ type: 'GET_TASKS', data: tasks.data });
    message.success('Task Added');
    history.push('/');
  };

  const handleLabelInput = (event) => {
    const text = event.target.value;

    if (text.endsWith(' ')) {
      if (!labels.includes(text.trim())) {
        const newLabel = {
          name: text.trim(),
          color: getRandomColor(),
        };
        setLabels((pre) => pre.concat(newLabel));
      }
      setLabelInput('');
    } else {
      setLabelInput(text);
    }
  };

  function handleDueDate(date, dateString) {
    const [day, month, year] = dateString.split('-');
    const correctDateString = [month, day, year].join('-');
    console.log('dateString:', correctDateString);
    setDueDate(correctDateString);
  }

  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} onClick={backToMain} />
      <div className={style.container}>
        <form onSubmit={onSubmit} method="POST">
          <Title className={style.heading + ' center'}>Add Task</Title>
          <Input
            placeholder={'Add Task'}
            onChange={setName}
            className={style.input}
            value={name}
          />
          <DatePicker
            placeholder={'Due Date'}
            onChange={handleDueDate}
            className={style.input}
            // {defa}
            defaultValue={dueDate && format(dueDate, 'MM-DD-YYYY')}
            format="DD-MM-YYYY"
          />
          {/* <Input
            placeholder={'Due Date'}
            onChange={handleDueDate}
            className={style.input}
            value={dueDate}
          /> */}

          <Select
            className={style.input}
            bordered={false}
            // defaultValue="default"
            placeholder={'Set Status'}
            style={{ textAlign: 'left' }}
            onChange={(value) => setStatus(value)}
          >
            <Option value="Open">Open</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Closed">Closed</Option>
            <Option value="None">None</Option>
          </Select>
          <Select
            placeholder={'Set Priority'}
            className={style.input}
            bordered={false}
            style={{ textAlign: 'left' }}
            onChange={(value) => setPriority(value)}
          >
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
            <Option value="None">None</Option>
          </Select>
          <Input
            placeholder={'Labels - Space to seperate labels'}
            onChange={handleLabelInput}
            className={style.input}
            value={labelInput}
          />
          {labels.map((label) => (
            <Tag
              key={label.name}
              color={label.color}
              closable
              onClose={() =>
                setLabels((pre) =>
                  pre.filter(({ name }) => name !== label.name)
                )
              }
            >
              {label.name}
            </Tag>
          ))}
          {/* <Input
            placeholder={'Priority'}
            onChange={setPriority}
            className={style.input}
            value={priority}
          /> */}
          <button
            type="submit"
            className={`${style.input} ${style.button}`}
            block
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

TaskPage.defaultProps = {
  name: '',
  dueDate: '',
  status: '',
  labels: [],
  priority: '',
};

export default TaskPage;
