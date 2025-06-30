import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

type RootStackParamList = {
  Login: undefined;
  Todo: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState('');
  const [submittedMobile, setSubmittedMobile] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const handleMobileSubmit = () => {
    setSubmittedMobile(true);
    if (mobile.length === 10) {
      setShowOtp(true);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      navigation.navigate('Todo');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter 10 digit mobile number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={(text) => {
          setMobile(text.replace(/[^0-9]/g, ''));
          setSubmittedMobile(false);
        }}
        style={styles.input}
      />
      <Button
        title="Submit"
        onPress={handleMobileSubmit}
        disabled={mobile.length !== 10}
      />

      {submittedMobile && mobile.length !== 10 && (
        <Text style={styles.warning}>Please enter 10 digits</Text>
      )}

      {showOtp && (
        <View style={{ marginTop: 30 }}>
          <TextInput
            placeholder="Enter 6 digit OTP"
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
  warning: {
    color: 'red',
    marginTop: 5,
  },
});
