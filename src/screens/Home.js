import {View, Text, Button} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {requestCameraPermission} from '../utils/commonFunctions';
const Home = () => {
  const takePhoto = async () => {
    const ifPermission = await requestCameraPermission();
    if (ifPermission) {
      const result = await launchCamera({mediaType: 'photo'});
      console.log(result);
    }
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="take phote" onPress={takePhoto} />
    </View>
  );
};

export default Home;
