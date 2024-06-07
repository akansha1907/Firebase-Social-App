import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {DARK_CYAN} from '../utils/colors/colors';

const InputBox = props => {
  const {
    placeholder,
    onChangeText,
    value,
    isSecure = false,
    keyboardType,
  } = props || {};
  return (
    <TextInput
      keyboardType={keyboardType}
      style={styles.view}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isSecure}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 48,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderColor: DARK_CYAN,
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
export default InputBox;
