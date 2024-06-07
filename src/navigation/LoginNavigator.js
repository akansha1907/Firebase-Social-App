import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LOGIN,
  OPT_SCREEN,
  PHONE_NUMBER,
  REGISTER,
} from '../utils/RouteConstants';
import Login from '../screens/Login';
import Register from '../screens/Register';
import PhoneNumber from '../screens/PhoneNumber';
import OtpScreen from '../screens/OtpScreen';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />

      <Stack.Screen name={PHONE_NUMBER} component={PhoneNumber} />
      <Stack.Screen name={OPT_SCREEN} component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
