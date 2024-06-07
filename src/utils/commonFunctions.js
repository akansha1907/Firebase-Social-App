import {Dimensions, PermissionsAndroid, Platform} from 'react-native';

export const getWidth = Dimensions.get('window').width;
export const getHeight = Dimensions.get('window').height;
/**
 * isAndroid
 */
const isAndroid = () => {
  return Platform.OS === 'android';
};

export const requestCameraPermission = async () => {
  if (isAndroid()) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Get togather app camera permission',
          message: 'Get together app want to access your camera to take photos',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return true;
  }
};

export const isNotNullOrUndefined = data => {
  return data !== null && data !== undefined;
};
