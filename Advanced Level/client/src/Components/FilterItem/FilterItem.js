import React, { useState } from 'react';
import PropTypes from 'prop-types';

// styles
import style from '../TaskPage/TaskPage.module.css';

// components
import { Select, Tag } from 'antd';
const { Option } = Select;

function FilterItem({ name }) {
  const [dueDate, setDueDate] = useState([]);

  const handleDueDate = (e) => setDueDate(e.target.value);
  const onChange = (i) => {
    console.log('i:', i);
    setDueDate((pre) => pre.concat(i));
  };

  const clearDueDate = (value) => {
    console.log('[ClearDueDate] value:', value);
    setDueDate((dueDate) => dueDate.filter((date) => date !== value));
  };
  const onBlur = () => {};
  const onFocus = () => {};
  const onSearch = () => {};
  return (
    <div>
      <Select
        className={`${style.input} ${style.filter}`}
        bordered={false}
        showArrow={false}
        value={name}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
      </Select>
      {dueDate.map((date) => (
        <Tag color="cyan" closable onClose={clearDueDate}>
          {date}
        </Tag>
      ))}
    </div>
  );
}

export default FilterItem;
