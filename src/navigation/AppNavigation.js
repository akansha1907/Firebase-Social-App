import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HOME,
  LOGIN,
  LOGIN_NAVIGATOR,
  OPT_SCREEN,
  PHONE_NUMBER,
  REGISTER,
  SPLASH,
} from '../utils/RouteConstants';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import PhoneNumber from '../screens/PhoneNumber';
import OtpScreen from '../screens/OtpScreen';
import auth from '@react-native-firebase/auth';
import LoginNavigator from './LoginNavigator';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(person => {
      setUser(person);
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={SPLASH} component={Splash} />
        <Stack.Screen name={HOME} component={Home} />
        <Stack.Screen name={LOGIN_NAVIGATOR} component={LoginNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
