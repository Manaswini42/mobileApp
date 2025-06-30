import LoginScreen from '@/Screens/LoginScreen';
import ToDoScreen from '@/Screens/ToDoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

type RootStackParamList = {
  Login: undefined;
  Todo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Todo" component={ToDoScreen} />
      </Stack.Navigator>
    
  );
}
