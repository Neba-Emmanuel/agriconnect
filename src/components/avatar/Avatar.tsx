import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../resources/theme';
import {RootState} from '../../redux/store';
import {useAppSelector} from '../../redux/typings';

const Avatar: FC = () => {
  const {user} = useAppSelector((state: RootState) => state.authSlice);

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
    <View style={styles.container}>
      <Text style={styles.username}>{getInitials(user?.fullName)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: theme.primary,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.white,
  },
});

export default Avatar;
