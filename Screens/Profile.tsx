/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

import Header from '../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [useDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = JSON.parse(await AsyncStorage.getItem('jwt-token'));
        const res = await fetch('https://apis.ccbp.in/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jsonValue}`,
          },
        });
        const data = await res.json();
        setUserDetails(data.profile_details);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} is_active_tab="profile" />
      {isLoading ? (
        <View style={{marginTop: 300}}>
          <ActivityIndicator size={50} color={'#6300f1'} />
        </View>
      ) : (
        <View style={styles.userDetails}>
          <Image
            style={styles.profile_image_url}
            source={{uri: useDetails.profile_image_url}}
          />
          <Text style={styles.name}>{useDetails.name}</Text>
          <Text style={styles.bio}>{useDetails.short_bio}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  userDetails: {
    marginTop: 100,
    alignItems: 'center',
  },
  profile_image_url: {
    width: 100,
    height: 100,
    margin: 30,
  },
  name: {color: 'white', fontSize: 30},
  bio: {color: '#63748b', fontSize: 18, textAlign: 'center', marginTop: 10},
});
