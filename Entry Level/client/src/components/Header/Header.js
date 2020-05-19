import React from 'react';

// styles
import style from './Header.module.css';

// languages
import { companyName } from '../../lang/english';

// components
import { Typography } from 'antd';
const { Title } = Typography;

const Header = (props) => (
  <div>
    <Title className={style.companyTitle}>{companyName}</Title>
  </div>
);

Header.propTypes = {};

export default Header;
