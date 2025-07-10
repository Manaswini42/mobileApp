import EmailScreen from '@/Screens/EmailScreen';
import LoginScreen from '@/Screens/LoginScreen';
import ToDoScreen from '@/Screens/ToDoScreen';
import UserListScreens from '@/Screens/UserListScreens';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

type RootStackParamList = {
  Email: undefined;
  Login: undefined;
  Todo: undefined;
  User: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Todo" component={ToDoScreen} />
      <Stack.Screen name="User" component={UserListScreens} />
    </Stack.Navigator>
  );
}
