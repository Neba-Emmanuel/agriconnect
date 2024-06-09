import React, {FC} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import styles from './profile.style';
import theme from '../../resources/theme';
import CustomTextInput from '../../components/input/input';
import Icons, {IconType} from '../../components/icon/icons.component';
import Button from '../../components/button/button';
import {useAppDispatch, useAppSelector} from '../../redux/typings';
import {RootState} from '../../redux/store';
import {logoutFunc} from '../../redux/auth/thunk/auth.thunk';

type Props = {
  navigation?: any;
};

const ProfileScreen: FC<Props> = ({navigation}) => {
  const {user} = useAppSelector((state: RootState) => state.authSlice);
  const dispatch = useAppDispatch();

  const logout = async () => {
    // await storage.remove('@user');
    // await storage.remove('@walletNumber');
    // dispatch(setUser(null));
    dispatch(logoutFunc());

    navigation.navigate('Login');
  };

  const getInitials = (fullName: string) => {
    if (!fullName) {
      return 'NE';
    }

    const nameParts = fullName.split(' ');

    const firstNameInitial = nameParts[0]
      ? nameParts[0].charAt(0).toUpperCase()
      : '';
    const lastNameInitial = nameParts[1]
      ? nameParts[1].charAt(0).toUpperCase()
      : '';

    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{left: theme.screenWidth * 0.02}}>
            <Icons size={20} icon={IconType.ARROW_LEFT} color={theme.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={{right: theme.screenWidth * 0.06}}>
            <Icons size={20} icon={IconType.LOGIN} color={theme.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.username}>{getInitials(user?.fullName)}</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={{marginHorizontal: 20, top: theme.screenHeight * 0.2}}>
            <CustomTextInput
              placeholder={user?.fullName}
              value={user?.fullName}
              icon={<Icons size={20} icon={IconType.USER} color={theme.gray} />}
            />
            <CustomTextInput
              placeholder={user?.email}
              value={user?.email}
              icon={
                <Icons size={20} icon={IconType.EMAIL} color={theme.gray} />
              }
            />
            <CustomTextInput
              placeholder={user?.phoneNumber}
              value={user?.email}
              icon={
                <Icons size={20} icon={IconType.PHONE} color={theme.gray} />
              }
            />
            <CustomTextInput
              placeholder="Password"
              icon={<Icons size={20} icon={IconType.LOCK} color={theme.gray} />}
            />
            <CustomTextInput
              placeholder="Confirm Password"
              icon={<Icons size={20} icon={IconType.LOCK} color={theme.gray} />}
            />
            <View style={styles.buttonWrapper}>
              <Button btnText="Update" />
            </View>
          </View>
          {/* <Formik initialValues={initialValuesInput} onSubmit={handleSignIn}>
            {renderForm}
          </Formik> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
