import React from 'react';

// components
import { Menu, Dropdown } from 'antd';

// icons
import { FaAngleDown } from 'react-icons/fa';

// style
import style from './ViewSelect.module.css';

const views = [
  {
    name: 'All Tasks',
    value: 'all',
  },
  {
    name: 'Archived Tasks',
    value: 'archived',
  },
];

const menu = (
  <Menu className={style.menu}>
    {views.map(({ name, value }) => (
      <Menu.Item key={value}>
        <div className={style.menuItem}>{name}</div>
      </Menu.Item>
    ))}
  </Menu>
);

function ViewSelect() {
  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={style.dropdown}>
          All Tasks <FaAngleDown />
        </div>
      </Dropdown>
    </div>
  );
}

export default ViewSelect;
