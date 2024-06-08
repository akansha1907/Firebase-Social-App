import {View, Text, StyleSheet, Pressable, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DARK_CYAN, WHITE} from '../utils/colors/colors';
import InputBox from '../components/InputBox';
import TouchableButton from '../components/TouchableButton';
import {HOME, PHONE_NUMBER, REGISTER} from '../utils/RouteConstants';
import {getHeight} from '../utils/commonFunctions';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Sign in a user call below method on Login screen with emil and password to logging in users
  const loginWithEmaillAndPassword = async () => {
    if (email !== '' && password !== '') {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );

        // Check if user email is verified
        if (userCredential.user.emailVerified) {
          firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
              console.log('console value', querySnapshot);
              if (querySnapshot.docs.length > 0) {
                goToHome(querySnapshot?.docs[0]._data?.userId);
              }
            });
        } else {
          ToastAndroid.show(
            'Email address is not verified yet',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
    }
  };
  const goToHome = async userId => {
    console.log(userId);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate(HOME);
  };
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <View style={styles.topView}>
        <Text style={styles.log}>Login</Text>
      </View>
      <View style={styles.content}>
        <InputBox
          placeholder={'Enter Email'}
          onChangeText={e => setEmail(e)}
          value={email}
        />
        <InputBox
          placeholder={'Enter Password'}
          onChangeText={e => setPassword(e)}
          value={password}
          isSecure={true}
        />
        <TouchableButton title={'Login'} onPress={loginWithEmaillAndPassword} />
        <TouchableOpacity onPress={() => navigation?.navigate(PHONE_NUMBER)}>
          <Text style={styles.mobileView}>Login with mobile number</Text>
        </TouchableOpacity>
        <View style={styles.regView}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation?.navigate(REGISTER)}>
            <Text style={styles.sign}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mobileView: {textAlign: 'center', marginTop: 5, color: 'black'},
  view: {flex: 1},
  log: {color: WHITE, fontSize: 20, fontWeight: '600', textAlign: 'center'},
  topView: {
    backgroundColor: DARK_CYAN,
    padding: 20,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    elevation: 5,
  },
  content: {
    marginTop: getHeight * 0.19,
    backgroundColor: WHITE,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 30,
    marginHorizontal: 20,
  },
  regView: {flexDirection: 'row', justifyContent: 'center', marginTop: 10},
  sign: {color: DARK_CYAN, fontWeight: '600'},
});
export default Login;
