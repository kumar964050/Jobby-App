import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';

import JobCard from './JobCard';
export default function SimilarJobs({navigation, similar_jobs}) {
  return (
    <>
      <Text style={styles.similarTitle}>Similar Jobs</Text>
      <View style={styles.similarJobsContainer}>
        <ScrollView horizontal={true}>
          {similar_jobs.map(each => {
            return (
              <JobCard
                navigation={navigation}
                width={310}
                data={each}
                key={each.id}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  similarJobsContainer: {
    flexDirection: 'row',
    height: 300,
  },
  similarTitle: {
    color: 'white',
    marginLeft: 10,
    marginTop: 30,
    fontSize: 25,
  },
});
