import React, {FC} from 'react';
import {SafeAreaView, View, Text, ImageBackground} from 'react-native';
import styles from './homeScreen.style';
import Button, {ButtonType} from '../../components/button/button';

type Props = {
  navigation?: any;
};

const HomeScreen: FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.brandWrapper}>
            <ImageBackground
              source={require('../../assets/images/logo.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.section2}>
          <View style={[styles.section]}>
            <Text style={[styles.title, styles.appTitle]}>
              Welcome to <Text style={styles.appName}>AgriConnect</Text>
            </Text>
            <Text style={styles.subtitle}>
              We bridge the gap by ensuring fresh, locally-sourced produce and
              supporting sustainable agriculture.
            </Text>
            <Button
              onPress={() => navigation.navigate('Register')}
              btnText="Register Now"
            />
            <View style={styles.divider}>
              <View style={styles.horizontalRule} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.horizontalRule} />
            </View>
            <Button
              onPress={() => navigation.navigate('Login')}
              btnText="Sign In"
              btnType={ButtonType.SECONDARY}
            />
            <View>
              <Text style={styles.terms}>
                By continuing, you agree to our terms & conditions
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
