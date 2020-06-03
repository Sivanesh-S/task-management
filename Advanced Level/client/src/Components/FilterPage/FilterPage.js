import React, { useState } from 'react';
import PropTypes from 'prop-types';

// styles
import style from '../TaskPage/TaskPage.module.css';

// icons
import { FaArrowLeft } from 'react-icons/fa';

// components
import { Typography } from 'antd';
import FilterItem from '../FilterItem/FilterItem';

const { Title } = Typography;

function FilterPage() {
  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} />
      <div className={style.container}>
        <Title className={style.heading + ' center'}>Filter</Title>
        <FilterItem name={'Due date'} />
        <FilterItem name={'Status'} />
        <FilterItem name={'Labels'} />
        <FilterItem name={'Priority'} />

        <button className={`${style.input} ${style.button}`} block>
          Default
        </button>
      </div>
      <div className={style.totalFilters}>
        <span>Filters Applied:</span> 3
      </div>
    </div>
  );
}

export default FilterPage;
