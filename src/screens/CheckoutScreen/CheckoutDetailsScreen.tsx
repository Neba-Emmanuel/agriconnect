/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import {useCart} from '../cartScreen/cartContext';
import {Icons} from '../../components';
import {IconType} from '../../components/icon/icons.component';
import theme from '../../resources/theme';
import styles from './checkoutDetails.style';
import storage from '../../utils/storage';
import {AuthApis} from '../../services/api/auth/AuthApis';
import axios from 'axios';
import CustomTextInput from '../../components/input/input';

const CheckoutDetailsScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const {method} = route.params;
  const {cart} = useCart();
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const sellerPhoneNumber = 233;

  const productTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const getTotalAmount = () => {
    const deliveryFee = method === 'delivery' ? 1000 : 0;
    return productTotal + deliveryFee;
  };

  const isValidPhoneNumber = (input: string): boolean => {
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

  const makePayment = async (service: string) => {
    const token = await storage.load('@token');
    console.log('Payment token:', token);

    try {
      const response = await axios.post(
        AuthApis.payment,
        {
          amount: getTotalAmount().toFixed(2),
          service: service,
          payer: number,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Payment response:', response.data);
    } catch (error: any) {
      console.error('Payment error:', error.response.data);
    }
  };

  const handlePayment = (service: string) => {
    if (isValidPhoneNumber(number)) {
      console.log('Payer Phone Number:', number);
      makePayment(service);
    } else {
      console.log('Invalid phone number');
    }
  };

  const getWhatsAppLink = () => {
    const message = cart
      .map(
        item =>
          `${item.name} x${item.quantity} - ${item.price * item.quantity} FCFA`,
      )
      .join('\n');
    const total = getTotalAmount();
    return `https://wa.me/${sellerPhoneNumber}?text=${encodeURIComponent(
      `Order:\n${message}\nTotal: ${total} FCFA`,
    )}`;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
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
            <Text style={{fontSize: 24}}>Checkout Details</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        {method === 'delivery' && (
          <View>
            <Text style={styles.label}>Delivery Address</Text>
            <CustomTextInput
              placeholder="Enter Address"
              value={address}
              onChangeText={text => setAddress(text)}
              icon={<Icons size={20} icon={IconType.HOME} color={theme.gray} />}
              keyboardType="numeric"
            />
            <CustomTextInput
              placeholder="Enter Phone Number"
              value={number}
              onChangeText={text => setNumber(text)}
              icon={
                <Icons size={20} icon={IconType.PHONE} color={theme.gray} />
              }
              keyboardType="numeric"
            />
          </View>
        )}
        <View style={styles.productDetails}>
          {cart.map(item => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                paddingVertical: 20,
              }}>
              <View key={item.id} style={styles.productItem}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  {(item.price * item.quantity).toFixed(2)} FCFA
                </Text>
              </View>
              <Text style={styles.productName}>qty. {item.quantity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          {/* <Text style={styles.summaryText}>
            Product Fee: {productTotal.toFixed(2)} FCFA
          </Text> */}
          <Text style={styles.summaryText}>
            Delivery Fee: {method === 'delivery' ? '1000 FCFA' : '0 FCFA'}
          </Text>
          <Text style={styles.summaryText}>
            Total Fee: {getTotalAmount().toFixed(2)} FCFA
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {method === 'pickup' ? (
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => Linking.openURL(getWhatsAppLink())}>
              <Text style={styles.whatsappButtonText}>WhatsApp Me</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => handlePayment('MTN')}>
                <Text style={styles.paymentButtonText}>Pay with MoMo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => handlePayment('ORANGE')}>
                <Text style={styles.paymentButtonText}>Pay with OM</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutDetailsScreen;
