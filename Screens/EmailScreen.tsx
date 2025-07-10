import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = () => {
    if (email.trim() === '') {
      Alert.alert('Please enter your email');
      return;
    }
    setEmailSubmitted(true);
  };

  const handlePasswordSubmit = async () => {
    if (password.trim() === '') {
      Alert.alert('Please enter your password');
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1',
         },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {!emailSubmitted && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Button title="Submit" onPress={handleEmailSubmit} />
        </>
      )}

      {emailSubmitted && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Submit" onPress={handlePasswordSubmit} />
        </>
      )}

      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
