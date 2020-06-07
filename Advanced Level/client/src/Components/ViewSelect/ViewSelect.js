import React, { useContext, useState } from 'react';
import { store } from '../../context/';

// components
import { Menu, Dropdown } from 'antd';

// icons
import { FaAngleDown } from 'react-icons/fa';

// style
import style from './ViewSelect.module.css';

function ViewSelect() {
  const { state, dispatch } = useContext(store);
  const { isShowArchived } = state;
  const [active, setActive] = useState(
    isShowArchived ? 'Archived Tasks' : 'All Tasks'
  );

  const handleView = () => {
    const current = active.includes('All') ? 'Archived Tasks' : 'All Tasks';
    setActive(current);
    dispatch({ type: 'CHANGE_VIEW', data: !isShowArchived });
  };

  const menu = (
    <Menu className={style.menu}>
      <Menu.Item key={'all'} onClick={handleView}>
        <div className={style.menuItem}>All tasks</div>
      </Menu.Item>
      <Menu.Item key={'archived'} onClick={handleView}>
        <div className={style.menuItem}>Archived tasks</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={style.dropdown}>
          {active} <FaAngleDown />
        </div>
      </Dropdown>
    </div>
  );
}

export default ViewSelect;
