import React from 'react';

// router
import { useHistory } from 'react-router-dom';

// icons
import { FaSearch, FaRegStickyNote, FaFilter, FaUser } from 'react-icons/fa';

// components
import { Avatar, PageHeader } from 'antd';

import style from './Header.module.css';

function Header() {
  const history = useHistory();

  // routings
  const openRightMenu = () => history.push('/userInfo');
  const openFilter = () => history.push('/filter');

  return (
    <div className={style.header}>
      <PageHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title={
          <div>
            <FaRegStickyNote className={style.logo} />
            <span className={style.brandTitle}>Twelve Tasks</span>
          </div>
        }
        subTitle="[Beta]"
        extra={[
          <FaSearch className={style.options} />,
          <FaFilter className={style.options} onClick={openFilter} />,
          <Avatar icon={<FaUser />} onClick={openRightMenu} />,
        ]}
      ></PageHeader>
    </div>
  );
}

Header.propTypes = {};

export default Header;
