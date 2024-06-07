import {View, Text, StyleSheet, Pressable, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DARK_CYAN, WHITE} from '../utils/colors/colors';
import {HOME, LOGIN} from '../utils/RouteConstants';
import TouchableButton from '../components/TouchableButton';
import InputBox from '../components/InputBox';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {getHeight} from '../utils/commonFunctions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const saveDataToFirestore = async () => {
    try {
      firestore().collection('Users').add({
        name: name,
        email: email,
        password: password,
        token: token,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getFcm();
  }, []);
  const getFcm = async () => {
    const tok = await messaging().getToken();
    setToken(tok);
  };
  const storeDataInLocal = async () => {
    try {
      const data = {
        NAME: name,
        EMAIL: email,
      };
      await AsyncStorage.setItem('UserData', JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };
  const handlePress = async () => {
    if (name !== '' && password !== '' && email !== '') {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await saveDataToFirestore();
        await storeDataInLocal();
        // Send email verification link
        await userCredential.user.sendEmailVerification();
        navigation?.goBack();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('All field are required');
    }
  };
  return (
    <View style={styles.view}>
      <View style={styles.topView}>
        <Text style={styles.log}>Register</Text>
      </View>
      <View style={styles.content}>
        <InputBox
          placeholder={'Enter Name'}
          onChangeText={e => setName(e)}
          value={name}
        />
        <InputBox
          placeholder={'Enter Email'}
          onChangeText={e => setEmail(e)}
          value={email}
        />
        <InputBox
          placeholder={'Set Password'}
          onChangeText={e => setPassword(e)}
          value={password}
          isSecure={true}
        />
        <TouchableButton title={'Sign Up'} onPress={handlePress} />
        <View style={styles.regView}>
          <Text>Already have account?</Text>
          <Pressable onPress={() => navigation?.navigate(LOGIN)}>
            <Text style={styles.sign}> Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default Register;
