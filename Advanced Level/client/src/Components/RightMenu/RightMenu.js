import React, { useContext } from 'react';

import { useGoogleLogout } from 'react-google-login';

// routing
import { useHistory } from 'react-router-dom';

// styles
import style from './RightMenu.module.css';

import { store } from '../../context';
import selectn from 'selectn';

import api, { clearAPI } from '../../utils/api';

// icons
import { FaArrowLeft, FaUser } from 'react-icons/fa';

const menuItems = [
  // 'Themes',
  'About',
  'Contribute',
  // 'Donate',
  // 'Issues',
  'Feedback',
  // 'Feature Requests',
  // 'App Tour',
  'Log out',
  // 'Delete Account',
];

// google oauth
const clientId =
  '416982686383-bqno596si9butn9mato3a286tvgugi2d.apps.googleusercontent.com';

function RightMenu(props) {
  const { state, dispatch } = useContext(store);
  const fullName = selectn('user.fullName', state);
  const photoUrl = selectn('user.photoUrl', state);

  const history = useHistory();

  if (!localStorage.getItem('authToken')) {
    history.push('/landing');
  }

  const onLogoutSuccess = async () => {
    const response = await api().post(`/google/logout`);
    console.log('logout response:', response);
    console.log('Successfully logged out.');
    localStorage.clear();
    history.push('/landing');
    dispatch({ type: 'LOGOUT' });
    clearAPI();
  };

  const onFailure = (err) => {
    console.log('Issue occured in log out, Anyways logged out from app', err);
    localStorage.clear();
    history.push('/landing');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  // routing
  const backToMain = () => history.push('/');

  const handleLogout = async () => {
    const provider = localStorage.getItem('provider');

    if (provider === 'GOOGLE_AUTH') {
      await signOut();
    } else {
      localStorage.clear();
      history.push('/landing');
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} onClick={backToMain} />
      {photoUrl ? (
        <img src={photoUrl} alt="user image" className={style.avatar} />
      ) : (
        <FaUser className={style.avatar} />
      )}
      <div className={style.name}>{fullName}</div>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <a href="https://sivanesh-s.github.io" target="_blank">
            ABOUT
          </a>
        </div>
        <div className={style.menuItem}>
          <a href="https://github.com/sivanesh-s" target="_blank">
            CONTRIBUTE
          </a>
        </div>
        <div className={style.menuItem}>
          <a href="https://twitter.com/sivanesh_fiz" target="_blank">
            FEEDBACK
          </a>
        </div>
        <div className={style.menuItem}>
          <a href="https://twitter.com/sivanesh_fiz" target="_blank">
            SHARE A TWEET
          </a>
        </div>
        <div
          className={style.menuItem}
          onClick={handleLogout}
          style={{ color: 'crimson' }}
        >
          LOGOUT
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
