import React, { useState } from 'react';

// router
import { useHistory } from 'react-router-dom';

// icons
import {
  FaSearch,
  FaRegStickyNote,
  FaFilter,
  FaUser,
  FaArrowLeft,
} from 'react-icons/fa';

import style from './Header.module.css';
// components
import { Avatar, PageHeader, Input } from 'antd';
const { Search } = Input;

function Header() {
  const history = useHistory();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  // routings
  const openRightMenu = () => history.push('/userInfo');
  const openFilter = () => history.push('/filter');

  const handleSearchToggle = () => setIsSearchOpen((prev) => !prev);

  const handleSearch = (value) => {
    setSearch(value);

    // store
  };

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
          <FaSearch
            key="search"
            className={style.options}
            onClick={handleSearchToggle}
          />,
          <FaFilter
            key="filter"
            className={style.options}
            onClick={openFilter}
          />,
          <Avatar key="avatar" icon={<FaUser />} onClick={openRightMenu} />,
        ]}
      ></PageHeader>
      {isSearchOpen && (
        <Search
          placeholder="input search text"
          autoFocus={true}
          onSearch={handleSearch}
          size="large"
          addonBefore={<FaArrowLeft onClick={handleSearchToggle} />}
          // style={{ width: 200 }}
        />
      )}
    </div>
  );
}

Header.propTypes = {};

export default Header;
