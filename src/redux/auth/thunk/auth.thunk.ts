import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  LoginDataType,
  RegisterDataType,
} from '../../../interface/auth/AuthTypes';
import {handleErrorMessages} from '../../../utils/HandleRequestErrors';
import AuthSerivces from '../../../services/auth/AuthServices';
import {resetAuthState, setUser} from '../slices/auth.slice';
import storage from '../../../utils/storage';

export const loginFunc = createAsyncThunk(
  'auth/login',
  async (data: LoginDataType, thunkAPI) => {
    try {
      return await new AuthSerivces().loginService(data);
    } catch (error: any) {
      console.log('REQUEST_ERROR: ', error);
      return thunkAPI.rejectWithValue(handleErrorMessages(error));
    }
  },
);

export const registerFunc = createAsyncThunk(
  'auth/register',
  async (data: RegisterDataType, thunkAPI) => {
    try {
      return await new AuthSerivces().registerService(data);
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
