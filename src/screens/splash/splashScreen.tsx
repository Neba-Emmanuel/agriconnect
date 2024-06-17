import React, {FC, useEffect} from 'react';
import {View, Image} from 'react-native';
import styles from './splash.style';
type Props = {
  navigation: any;
};

const SplashScreen: FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;
