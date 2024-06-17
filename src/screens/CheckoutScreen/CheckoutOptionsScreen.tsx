/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icons} from '../../components';
import {IconType} from '../../components/icon/icons.component';
import theme from '../../resources/theme';
import styles from './checkoutOptions.style';

const CheckoutOptionsScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.head}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // alignItems: 'center',
            width: '100%',
            top: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons size={30} icon={IconType.BACK} color={theme.primary} />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: theme.screenWidth * 0.1,
            }}>
            <Text style={{fontSize: 24}}>Checkout Options</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() =>
            navigation.navigate('CheckoutDetails', {method: 'pickup'})
          }>
          <Text style={styles.optionButtonText}>
            Collect at Seller's Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() =>
            navigation.navigate('CheckoutDetails', {method: 'delivery'})
          }>
          <Text style={styles.optionButtonText}>Deliver to My Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutOptionsScreen;
