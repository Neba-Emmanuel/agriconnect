import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState('');

  const verifyOTP = async () => {
    try {
      const response = await axios.post('/api/verify-email', {email, otp});
      console.log('Email verified successfully:', response.data);
      // Optionally, navigate to success screen
    } catch (error) {
      console.error('Failed to verify email:', error.response.data.error);
      // Handle error, show message to user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        onChangeText={setOtp}
        value={otp}
      />
      <Button title="Verify OTP" onPress={verifyOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default OTPVerificationScreen;
