import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BLACK, DARK_CYAN, LIGHT_CYAN, LIGHT_GREY} from '../utils/colors/colors';

const Header = props => {
  const {
    handlePress,
    title,
    title2,
    isAllData,
    isTitle2req = true,
  } = props || {};
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      {isTitle2req && (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.headerText2(isAllData)}>{title2}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 60,
    elevation: 5,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_CYAN,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: BLACK,
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  headerText2: isComplete => ({
    color: isComplete ? DARK_CYAN : LIGHT_GREY,
    fontSize: 20,
    fontWeight: '700',
    padding: 3,
    marginHorizontal: 20,
  }),
});
