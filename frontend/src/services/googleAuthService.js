
import api from './api';

export async function googleAuthLoginApi(idToken) {
  const response = await api.post('/google-auth/', { idToken })
  return response.data
}

export async function getCurrentGoogleAuthLoggedInUserApi() {
  const response = await api.get('/google-auth/')
  return response.data;
}

export async function logoutGoogleAuthUserApi() {
  return await api.post('/google-auth/logout')
}