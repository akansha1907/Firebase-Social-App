import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import {BLACK, WHITE} from '../../utils/colors/colors';
import {getHeight, getWidth} from '../../utils/commonFunctions';
const HomeTab = () => {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    let tempData = [];
    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        console.log('Total posts ', querySnapshot);
        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
        });
        setPostData(tempData);
      });
  };
  const renderView = ({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.userImage}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.imageView}>
          <Image source={{uri: item.image}} style={styles.postImage} />
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title={'All Posts'} />
      {postData.length > 0 && (
        <View style={styles.flatView}>
          <FlatList
            data={postData}
            renderItem={renderView}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  caption: {
    marginVertical: 10,
    fontSize: 15,
    color: BLACK,
    marginHorizontal: 5,
  },
  name: {fontSize: 16, color: BLACK, fontWeight: '500'},
  postImage: {
    height: getHeight * 0.4,
    width: getWidth * 0.86,
    marginTop: 10,
    borderRadius: 8,
  },
  container: {flex: 1},
  flatView: {marginTop: 20, marginBottom: 70, flex: 1},
  userImage: {height: 35, width: 35},
  profileContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  card: {
    marginHorizontal: 10,
    marginTop: 15,
    elevation: 1,
    backgroundColor: WHITE,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  imageView: {
    alignItems: 'center',
  },
});
