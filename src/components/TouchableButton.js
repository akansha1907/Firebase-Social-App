import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {DARK_CYAN, WHITE} from '../utils/colors/colors';

const TouchableButton = ({onPress, title, buttonStyle}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.tch, buttonStyle]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tch: {
    backgroundColor: DARK_CYAN,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: WHITE,
    textAlign: 'center',
  },
});
export default TouchableButton;
