/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../Components/Header';
import JobDetailView from './../Components/JobDetailCard';
import SimilarJobs from './../Components/SimilarJobs';

const App = ({navigation, route}) => {
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const jsonValue = JSON.parse(await AsyncStorage.getItem('jwt-token'));
      try {
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jsonValue}`,
          },
        };
        const res = await fetch(
          `https://apis.ccbp.in/jobs/${route.params.id}`,
          options,
        );
        const data = await res.json();
        setJobDetails(data);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
    getJobs();
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} is_active_tab={''} />
      {isLoading ? (
        <View style={{margin: 100}}>
          <ActivityIndicator color={'red'} size={40} />
        </View>
      ) : (
        <ScrollView>
          {/*  */}
          <JobDetailView data={jobDetails} />
          <SimilarJobs
            navigation={navigation}
            similar_jobs={jobDetails.similar_jobs}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#000',
  },
});
