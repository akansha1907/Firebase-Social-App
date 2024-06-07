import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BLACK, WHITE} from '../utils/colors/colors';
import {HOME, LOGIN, LOGIN_NAVIGATOR} from '../utils/RouteConstants';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  // Set an initializing state whilst Firebase connects

  const [data, setGotData] = useState(false);

  const [loginCheck, setLoginCheck] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Check if the user's email is verified, and show a message if it's not
      const thisUser = auth().currentUser;
      if (thisUser) {
        setGotData(true);
      }
    });
    setLoginCheck(true);
    return unsubscribe;
  }, []);

  if (loginCheck) {
    setTimeout(() => {
      if (data) {
        navigation?.navigate(HOME);
      } else {
        navigation?.navigate(LOGIN_NAVIGATOR);
      }
    }, 2000);
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Lets's Connect...</Text>
      <Text style={styles.subText}>With World 🌍</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  text: {
    fontSize: 22,
    color: BLACK,
    fontWeight: '500',
  },
  subText: {
    fontWeight: '400',
  },
});
export default Splash;
