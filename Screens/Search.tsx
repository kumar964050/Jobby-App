/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import JobCard from './../Components/JobCard';
import Header from '../Components/Header';

export default function App({navigation}) {
  const [jobs, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const NoJobFound = () => {
    return (
      <View style={styles.noJobsContainer}>
        <Image
          style={styles.noJobsImage}
          source={require('./../Assets/no_jobs.png')}
        />
        <Text style={styles.noJobTitle}>No Jobs Found</Text>
        <Text style={styles.noJobdesc}>
          we could not found any jobs. try Other Filter
        </Text>
        <Button onPress={() => setSearchInput('')} title="Clear" />
      </View>
    );
  };
  const filteredData = jobs.filter(each =>
    each.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

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
        const res = await fetch('https://apis.ccbp.in/jobs', options);
        const data = await res.json();
        setIsLoading(false);
        setJobs(data.jobs);
        setFilteredData(data.jobs);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    };
    getJobs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <Header navigation={navigation} is_active_tab={'job'} />
      {/* search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor={'#64748b'}
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
        />
        <Icon color="white" name="search" size={30} />
      </View>

      {/* filter menu pending */}

      {/* jobs container */}
      {isLoading ? (
        <View style={{marginTop: 150}}>
          <ActivityIndicator color={'#6366f1'} size={40} />
        </View>
      ) : filteredData.length === 0 ? (
        NoJobFound()
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <JobCard data={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#64748b',
    borderWidth: 1,
    paddingRight: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
  },
  noJobsContainer: {
    marginVertical: 100,
  },
  noJobsImage: {
    alignSelf: 'center',
    width: '80%',
    height: '50%',
  },
  noJobTitle: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 25,
  },
  noJobdesc: {
    alignSelf: 'center',
    width: '70%',
    textAlign: 'center',
    fontSize: 18,
    color: '#64748b',
    marginTop: 10,
  },
  text: {
    color: 'white',
  },
});
