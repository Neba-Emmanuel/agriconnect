import axios from 'axios';
import {AuthApis} from '../api/auth/AuthApis';
import {LoginDataType, RegisterDataType} from '../../interface/auth/AuthTypes';
import storage from '../../utils/storage';

export default class AuthSerivces {
  public async loginService(body: LoginDataType) {
    const response = await axios.post(AuthApis.login, body);
    return response?.data;
  }

  public async registerService(body: RegisterDataType) {
    const response = await axios.post(AuthApis.register, body);
    return response?.data;
  }

  public async profileService() {
    const response = await axios.get(AuthApis.getUserProfile);
    return response?.data;
  }

  public async logoutService() {
    const response = await axios.get(AuthApis.logout);
    return response?.data;
  }

  public async forgotPasswordService(body: {matricule: string}) {
    const response = await axios.post(AuthApis.forgotPassword, body);
    return response?.data;
  }

  public async loadUserService() {
    // let user = await storage.load('@token');
    // return user;
    try {
      const token = await storage.load('@token');

      const response = await fetch('http://10.0.2.2:5000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const user = await response.json();

      storage.storeInfo('@user', user);

      return user;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
}

// const uploadFile = async (url: string, file: any, config: any) => {
//   const formData = new FormData();
//   formData.append('file', {
//     uri: file?.uri,
//     name: file?.fileName,
//     type: file?.type,
//   });

//   return axios.post(url, formData, config);
// };
