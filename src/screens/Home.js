import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {AQUA_BLUE, WHITE} from '../utils/colors/colors';
import HomeTab from './tabs/HomeTab';
import MessageTab from './tabs/MessageTab';
import PostTab from './tabs/PostTab';
import SearchTab from './tabs/SearchTab';
import ProfileTab from './tabs/ProfileTab';
const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderTab = () => {
    switch (selectedTab) {
      case 0:
        return <HomeTab />;

      case 1:
        return <MessageTab />;
      case 2:
        return <PostTab />;
      case 3:
        return <SearchTab />;
      case 4:
        return <ProfileTab />;
      default:
        <HomeTab />;
    }
  };

  return (
    <View style={styles.container}>
      {renderTab()}
      <View style={styles.bottomView}>
        <TouchableOpacity
          key={1}
          onPress={() => setSelectedTab(0)}
          style={{
            backgroundColor: selectedTab === 0 ? WHITE : null,
            padding: 12,
            borderRadius: 30,
          }}>
          <Image
            source={require('../assets/images/home.png')}
            style={styles.imageBottom(selectedTab)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(1)}
          style={{
            backgroundColor: selectedTab === 1 ? WHITE : null,
            padding: 12,
            borderRadius: 30,
          }}>
          <Image
            source={require('../assets/images/messenger.png')}
            style={styles.imageBottom(selectedTab)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(2)}
          style={{
            backgroundColor: selectedTab === 2 ? WHITE : null,
            padding: 12,
            borderRadius: 30,
          }}>
          <Image
            source={require('../assets/images/more.png')}
            style={styles.imageBottom(selectedTab)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(3)}
          style={{
            backgroundColor: selectedTab === 3 ? WHITE : null,
            padding: 12,
            borderRadius: 30,
          }}>
          <Image
            source={require('../assets/images/search.png')}
            style={styles.imageBottom(selectedTab)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(4)}
          style={{
            backgroundColor: selectedTab === 4 ? WHITE : null,
            padding: 12,
            borderRadius: 30,
          }}>
          <Image
            source={require('../assets/images/user.png')}
            style={styles.imageBottom(selectedTab)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bottomView: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 5,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: AQUA_BLUE,
    justifyContent: 'space-between',
  },
  imageBottom: index => ({
    height: 30,
    width: 30,
  }),
});
export default Home;
