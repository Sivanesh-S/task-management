import api from './api';

export const handleGoogleLogin = async (res, from, globals) => {
  const { tokenId, googleId, profileObj, accessToken } = res;
  console.log('Logged in res:');

  if (!accessToken) {
    const accessToken = res.getAuthResponse(true).access_token;
    console.log('accessToken:', accessToken);
  }

  localStorage.setItem('authToken', tokenId);
  localStorage.setItem('provider', 'GOOGLE_AUTH');
  localStorage.setItem('email', profileObj.email);
  if (from === 'Auth') {
    await api().post('/google/login');
  }

  refreshTokenSetup(res);
};

const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newAuthRes:', newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem('authToken', newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};
