/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icons, {IconType} from '../../components/icon/icons.component';
import theme from '../../resources/theme';

const PaymentStatus = ({route, navigation}: any) => {
  const {paymentResponse} = route.params;

  // Check if payment was successful
  const isSuccess = paymentResponse?.data?.data?.status === 'SUCCESS';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
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
            <Text style={{fontSize: 24}}>Payment Status</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          top: 200,
          width: theme.screenWidth * 0.5,
          height: theme.screenHeight * 0.4,
          backgroundColor: theme.white,
          borderRadius: 10,
        }}>
        <Text style={styles.text}>
          {isSuccess ? 'Payment Successful!' : 'Payment Failed!'}
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.text2}>
            Amount: {paymentResponse?.data?.data?.amount} XAF
          </Text>
          <Text style={styles.text2}>
            Transaction ID: {paymentResponse?.data?.data?.fin_trx_id}
          </Text>
          <Text style={styles.text2}>
            Service: {paymentResponse?.data?.data?.service}
          </Text>
          <Text style={styles.text2}>
            Status: {paymentResponse?.data?.data?.status}
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: 200,
              height: 50,
              backgroundColor: theme.primary,
              borderRadius: 10,
              top: 30,
            }}
            onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.textBtn}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text2: {
    fontSize: 18,
    marginBottom: 2,
  },
  textBtn: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 2,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    paddingVertical: 50,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop:
      Platform.OS === 'ios'
        ? theme.screenHeight * 0.043
        : theme.screenHeight * 0.01,
    paddingBottom: 20,
  },
});

export default PaymentStatus;
