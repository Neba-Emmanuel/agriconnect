import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import styles from '../payment/payment.style';

import CustomTextInput from '../../components/input/input';
import theme from '../../resources/theme';
import {Icons} from '../../components';
import {IconType} from '../../components/icon/icons.component';
import {PaymentDataType} from '../../interface/auth/AuthTypes';
import storage from '../../utils/storage';
import {AuthApis} from '../../services/api/auth/AuthApis';

type Props = {
  navigation: any;
};

const PaymentMethod: FC<Props> = ({navigation}: Props) => {
  const [payer, setPayer] = useState('');

  const isValidPhoneNumber = (input: string): boolean => {
    // const regexPattern = /^\+237[6237]\d{8}$/;
    const isNumeric = /^\d+$/.test(input);
    const startsWith6 = input.startsWith('6');
    const hasValidLength = input.length >= 9;

    if (!isNumeric) {
      Alert.alert(
        'Invalid phone number',
        'Phone number must contain only numeric characters.',
      );
      return false;
    }

    if (!startsWith6) {
      Alert.alert(
        'Invalid phone number',
        'Phone number must start with the digit 6.',
      );
      return false;
    }

    if (!hasValidLength) {
      Alert.alert(
        'Invalid phone number',
        'Phone number must be at least 9 digits long.',
      );
      return false;
    }

    return true;
  };

  const makePayment = async ({
    amount,
    service,
    payer,
    user,
    status,
  }: PaymentDataType) => {
    console.log('payer', payer);
    const token = await storage.load('@token');

    fetch(AuthApis.payment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({amount, service, payer, user, status}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.operationSuccess && data.transactionSuccess) {
          console.log('Payment successful:', data);
        } else {
          console.log('Payment failed:', data);
        }
      })
      .catch(error => {
        console.error('Payment error:', error);
      });
  };

  const handleSubmit = () => {
    if (isValidPhoneNumber(payer)) {
      console.log('Payer Phone Number:', payer);
      makePayment({
        amount: '100',
        service: 'MTN',
        payer,
        user: 'John Doe',
        status: 'pending',
      });
      navigation.navigate('loadscreen');
    } else {
      console.log('Invalid phone number');
    }
  };

  return (
    <View style={[styles.wrapper, {backgroundColor: theme.white}]}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/mtn_momo.jpg')}
          style={styles.cardImage}
        />

        <Text style={styles.cardText}>
          Label: <Text style={{fontWeight: 'bold'}}>Transcrip Application</Text>
        </Text>
        <Text style={styles.cardText}>
          Type: <Text style={{fontWeight: 'bold'}}>Fast Mode</Text>
        </Text>
        <Text style={styles.cardText}>
          Amount to Debit: <Text style={{fontWeight: 'bold'}}>FCFA 3000</Text>
        </Text>

        <CustomTextInput
          placeholder="Enter Phone Number"
          value={payer}
          onChangeText={text => setPayer(text)}
          icon={<Icons size={20} icon={IconType.PHONE} color={theme.gray} />}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{color: 'white'}}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton2}
          onPress={() => navigation.navigate('Apply')}>
          <Text style={{color: 'white'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;
