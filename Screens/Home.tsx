/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Header from '../Components/Header';

export default function App({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} is_active_tab={'home'} />
      <ImageBackground
        style={styles.homeContainer}
        source={require('./../Assets/greet.png')}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>
            Find The Job That Fits Your Life
          </Text>
          <Text style={styles.contentDescription}>
            Millions of people are searching for Jobs, salary information,
            company reviews. Find the job thats fits your abilities and
            potential.
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Search')}>
            <Text style={styles.buttonText}>Find Jobs</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  homeContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 25,
  },
  contentTitle: {
    color: 'white',
    fontSize: 30,
    lineHeight: 50,
  },
  contentDescription: {
    color: 'white',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: 600,
  },
  buttonContainer: {
    marginVertical: 30,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 600,
  },
});
