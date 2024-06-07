import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BLACK,
  DARK_CYAN,
  LIGHT_CYAN,
  LIGHT_GREY,
  WHITE,
} from '../../utils/colors/colors';
import {
  getHeight,
  getWidth,
  isNotNullOrUndefined,
  requestCameraPermission,
} from '../../utils/commonFunctions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
const PostTab = () => {
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [data, setData] = useState({});

  const takePhoto = async () => {
    const ifPermission = await requestCameraPermission();
    if (ifPermission) {
      const result = await launchCamera({mediaType: 'photo'});
      setImageData(result.assets);
    }
  };
  let token = '';
  useEffect(() => {
    getFcm();
  }, []);

  const getStoredData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      if (value !== null) {
        const val = JSON.parse(value);
        setData(val);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStoredData();
  }, []);
  const getFcm = async () => {
    token = await messaging().getToken();
  };
  const uploadImage = async () => {
    try {
      const reference = storage().ref(imageData[0].fileName);
      // path to existing file on filesystem
      const pathToFile = imageData?.[0].uri;
      // uploads file
      await reference.putFile(pathToFile);
      const url = await storage().ref(imageData[0].fileName).getDownloadURL();
      setImageUrl(url);
      firestore()
        .collection('posts')
        .add({
          image: url,
          caption: caption,
          name: data?.NAME,
          email: data?.EMAIL,
        })
        .then(() => {
          setCaption('');
          setImageData(null);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const choosePhoto = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImageData(result.assets);
  };
  const isAllData = isNotNullOrUndefined(imageData) && caption !== '';
  const handleUpload = () => {
    if (isNotNullOrUndefined(imageData) && caption !== '') {
      uploadImage();
    } else {
      console.log('Complete your post by adding both image and caption');
    }
  };

  const saveDataToFirestore = async () => {
    try {
      if (imageUrl !== '') {
        await firestore().collection('Users').add({
          image: imageUrl,
        });
        setCaption('');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Add Post'}
        title2={'Upload Post'}
        isAllData={isAllData}
        handlePress={handleUpload}
      />
      <View style={styles.viewEmpty}>
        <Image
          source={
            imageData !== null && imageData !== undefined
              ? {uri: imageData?.[0].uri}
              : require('../../assets/images/photo.png')
          }
          style={styles.postImage}
        />
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter caption"
            style={styles.inputText}
            multiline={true}
            value={caption}
            onChangeText={e => setCaption(e)}
          />
        </View>
      </View>
      <View style={styles.imagePic}>
        <TouchableOpacity style={styles.cameraView} onPress={takePhoto}>
          <Text>Take a photo</Text>
          <Image
            source={require('../../assets/images/camera.png')}
            style={styles.camera}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraView} onPress={choosePhoto}>
          <Text>Choose from gallery</Text>
          <Image
            source={require('../../assets/images/gallery.png')}
            style={styles.camera}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostTab;

const styles = StyleSheet.create({
  postImage: {
    height: getHeight * 0.2,
    width: getWidth * 0.4,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  inputView: {
    backgroundColor: WHITE,
    height: getHeight * 0.2,
    flex: 1,
    marginEnd: 10,
  },
  inputText: {padding: 5, fontSize: 16},
  camera: {height: 30, width: 30},
  cameraView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  imagePic: {
    flexDirection: 'row',
    marginTop: 10,

    justifyContent: 'space-evenly',
  },
  container: {flex: 1},
  viewEmpty: {
    flexDirection: 'row',
    height: getWidth * 0.5,
    marginTop: 20,
    marginHorizontal: 15,
    borderWidth: 0.4,
    borderRadius: 10,

    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: LIGHT_GREY,
  },
});
