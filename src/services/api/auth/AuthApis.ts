import {Platform} from 'react-native';

const BASE_URL = Platform.select({
  ios: 'http://127.0.0.1:5000',
  android: 'http://10.0.2.2:5000',
});

export const AuthApis = {
  login: BASE_URL + '/auth/login',
  register: BASE_URL + '/auth/register',
  logout: BASE_URL + '/auth/user/logout',
  getUserProfile: BASE_URL + '/auth/user',
  forgotPassword: BASE_URL + '/auth/forgot-password',
  ping: BASE_URL + '/',
  payment: BASE_URL + '/payment/collect',
};
