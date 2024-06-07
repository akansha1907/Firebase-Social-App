import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import TouchableButton from '../components/TouchableButton';
import {getHeight} from '../utils/commonFunctions';
import InputBox from '../components/InputBox';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {HOME} from '../utils/RouteConstants';

const PhoneNumber = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [otpView, setOtpView] = useState(false);
  const navigation = useNavigation();
  const signInWithPhoneNumber = async phoneNumber => {
    if (number !== '' && number.length === 10) {
      try {
        const confirmation = await auth().signInWithPhoneNumber(
          '+91 ' + phoneNumber.toString(),
        );
        setConfirm(confirmation);
        setOtpView(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const confirmCode = async () => {
    try {
      const response = await confirm.confirm(code);
      navigation?.navigate(HOME);
      console.log(response);
    } catch (error) {
      console.log('Invalid code.');
    }
  };
  if (otpView) {
    return (
      <View>
        <View style={styles.inputView}>
          <InputBox
            keyboardType="phone-pad"
            value={code}
            onChangeText={text => setCode(text)}
            placeholder="Enter OTP"
          />
          <TouchableButton
            title="Submit OTP"
            onPress={() => confirmCode(code)}
          />
        </View>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.inputView}>
        <InputBox
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={number}
          onChangeText={e => setNumber(e)}
        />
        <TouchableButton
          title="Get OTP"
          onPress={() => signInWithPhoneNumber(number)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputView: {
    marginHorizontal: 20,
    marginTop: getHeight * 0.25,
  },
});
export default PhoneNumber;
