/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Header({navigation, is_active_tab}) {
  const [isMenu, setIsMenu] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwt-token');
    navigation.replace('Login');
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          resizeMode="contain"
          style={styles.headerLogo}
          source={require('./../Assets/logo.png')}
        />
        <Icon
          onPress={() => setIsMenu(!isMenu)}
          name={`${isMenu ? 'align-right' : 'align-justify'}`}
          size={30}
          color="white"
        />
      </View>
      {/* header menu */}
      <View style={[styles.menuContainer, isMenu && styles.isMenuShow]}>
        <Text
          onPress={() => {
            setIsMenu(false);
            navigation.navigate('Home');
          }}
          style={[
            styles.menuItem,
            is_active_tab === 'home' && {color: '#6366f1'},
          ]}>
          Home
        </Text>
        <Text
          onPress={() => {
            setIsMenu(false);
            navigation.navigate('Search');
          }}
          style={[
            styles.menuItem,
            is_active_tab === 'job' && {color: '#6366f1'},
          ]}>
          Jobs
        </Text>
        <Text
          onPress={() => {
            setIsMenu(false);
            navigation.navigate('Profile');
          }}
          style={[
            styles.menuItem,
            is_active_tab === 'profile' && {color: '#6366f1'},
          ]}>
          Profile
        </Text>
        <Text onPress={handleLogout} style={styles.menuItem}>
          Logout
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  },
  headerLogo: {
    width: 100,
    height: 30,
  },
  menuContainer: {
    zIndex: 1,
    position: 'absolute',
    width: '110%',
    top: 60,
    right: 0,
    padding: 20,
    backgroundColor: '#202020',
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 2000,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  menuItem: {
    padding: 10,
    fontSize: 20,
    color: 'white',
  },
  isMenuShow: {
    marginRight: 0,
  },
  text: {
    color: 'white',
  },
});

export default Header;
