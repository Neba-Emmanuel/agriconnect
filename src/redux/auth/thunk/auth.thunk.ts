import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  LoginDataType,
  RegisterDataType,
} from '../../../interface/auth/AuthTypes';
import {handleErrorMessages} from '../../../utils/HandleRequestErrors';
import AuthSerivces from '../../../services/auth/AuthServices';
import {resetAuthState, setUser} from '../slices/auth.slice';
import storage from '../../../utils/storage';
import {AuthApis} from '../../../services/api/auth/AuthApis';
import axios from 'axios';

export const loginFunc = createAsyncThunk(
  'auth/login',
  async (data: LoginDataType, thunkAPI) => {
    try {
      // Authenticate and get token
      const response = await new AuthSerivces().loginService(data);
      const {token} = response;

      // Fetch user data with the token
      const userResponse = await axios.get(AuthApis.getUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userResponse.data;
      const isSuccess = true;

      return {
        user,
        token,
        isSuccess,
      };
    } catch (error: any) {
      console.log('REQUEST_ERROR: ', error);
      return thunkAPI.rejectWithValue(handleErrorMessages(error));
    }
  },
);

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get(AuthApis.getUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerFunc = createAsyncThunk(
  'auth/register',
  async (data: RegisterDataType, thunkAPI) => {
    try {
      // Authenticate and get token
      const response = await new AuthSerivces().registerService(data);
      const {token} = response;

      // Fetch user data with the token
      const userResponse = await axios.get(AuthApis.getUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userResponse.data;
      const isSuccess = true;

      return {
        user,
        token,
        isSuccess,
      };
    } catch (error: any) {
      console.log('REQUEST_ERROR: ', error);
      return thunkAPI.rejectWithValue(handleErrorMessages(error));
    }
  },
);

export const loadUserFunc = createAsyncThunk('user', async () => {
  return await new AuthSerivces().loadUserService();
});

export const logoutFunc = createAsyncThunk(
  'auth/logout',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      dispatch(resetAuthState());

      // Remove stored tokens
      storage.remove('@token');
      dispatch(setUser(null));

      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'users/forgot-password',
  async (data: {matricule: string}, thunkAPI) => {
    try {
      return await new AuthSerivces().forgotPasswordService(data);
    } catch (error: any) {
      console.log('REQUEST_ERROR: ', error);
      return thunkAPI.rejectWithValue(handleErrorMessages(error));
    }
  },
);

// export const loadUserFunc = createAsyncThunk('auth/authuser', async () => {
//   return await new AuthSerivces().loadUserService();
// });
