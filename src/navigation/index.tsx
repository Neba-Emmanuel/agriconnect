import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import Loader from '../loader/loader';
import MainStack from './MainStack';
import {useAppDispatch, useAppSelector} from '../redux/typings';
import {RootState} from '../redux/store';
import {AnyAction} from 'redux';
import {loadUserFunc} from '../redux/auth/thunk/auth.thunk';
import {setUser} from '../redux/auth/slices/auth.slice';

const App = () => {
  const dispatch = useAppDispatch();
  const {loading, userData, accessToken} = useAppSelector(
    (state: RootState) => state.authSlice,
  );

  useEffect(() => {
    // Only load user if accessToken exists
    if (accessToken) {
      dispatch(loadUserFunc() as unknown as AnyAction);
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(setUser(userData));
    }
  }, [dispatch, userData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {userData?._id ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
