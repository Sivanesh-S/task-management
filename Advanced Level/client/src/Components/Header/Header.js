import React from 'react';
import { FaSearch, FaRegStickyNote, FaFilter, FaUser } from 'react-icons/fa';
import { Avatar, PageHeader } from 'antd';

import style from './Header.module.css';

function Header() {
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
          <FaFilter className={style.options} />,
          <Avatar icon={<FaUser />} />,
        ]}
      ></PageHeader>
    </div>
  );
}

export default Header;
