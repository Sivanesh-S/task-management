import React from 'react';
import PropTypes from 'prop-types';

// routing
import { useHistory } from 'react-router-dom';

// styles
import style from './RightMenu.module.css';

// icons
import { FaArrowLeft, FaUser } from 'react-icons/fa';

const menuItems = [
  'Themes',
  'About',
  'Contribute',
  'Donate',
  'Issues',
  'Feedback',
  'Feature Requests',
  'App Tour',
  'Log out',
  'Delete Account',
];

function RightMenu(props) {
  const { img, name = 'Sivanesh' } = props;

  const history = useHistory();

  // routing
  const backToMain = () => history.push('/');

  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} onClick={backToMain} />
      {img ? <img src={img} /> : <FaUser className={style.avatar} />}
      <div className={style.name}>{name}</div>
      <div className={style.menu}>
        {menuItems.map((menu) => (
          <div className={style.menuItem}>{menu.toUpperCase()} </div>
        ))}
      </div>
    </div>
  );
}

RightMenu.propTypes = {
  img: PropTypes.string,
};

export default RightMenu;
