
import api from './api';

export async function googleAuthSigninApi(idToken) {
  const { data } = await api.post('/google-auth/google-signin', { idToken });
  return data;
  // return response.data
}

export async function getCurrentGoogleAuthLoggedInUserApi() {
  console.log("HIT /get-current-user");
  const { data } = await api.get('/google-auth/get-current-user');
  return data
}

export async function logoutGoogleAuthUserApi() {
  return await api.post('/google-auth/logout')
}