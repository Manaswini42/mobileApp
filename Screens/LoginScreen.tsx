import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

type RootStackParamList = {
  Login: undefined;
  Todo: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleMobileSubmit = () => {
    if (mobile.length === 10) {
      setShowOtp(true);
    } else {
      Alert.alert('Invalid Mobile Number', 'Please enter a 10-digit number');
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
        body: JSON.stringify({
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok && data.token) {
            Alert.alert('Login successful!', `Token: ${data.token}`);
            navigation.navigate('Todo');
          } else {
            Alert.alert('Login failed', data.error || 'Invalid credentials');
          }
        })
        .catch((error) => {
          Alert.alert('Network error', error.message);
        });
    } else {
      Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter 10-digit mobile number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
        style={styles.input}
      />
      <Button
        title="Submit"
        onPress={handleMobileSubmit}
        disabled={mobile.length !== 10}
      />

      {showOtp && (
        <View style={{ marginTop: 30 }}>
          <TextInput
            placeholder="Enter 6-digit OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
            style={styles.input}
          />
          <Button
            title="Submit OTP"
            onPress={handleOtpSubmit}
            disabled={otp.length !== 6}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
});
