import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/Foundation';

const JobCard = ({data, width, navigation}) => {
  const {
    id,
    title,
    rating,
    company_logo_url,
    location,
    job_description,
    employment_type,
    package_per_annum,
  } = data;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetails', {id: id})}>
      <View style={[styles.jobCard, {width: width}]}>
        {/* header */}
        <View style={styles.jobCardHeader}>
          <Image
            resizeMode="contain"
            style={styles.jobCardImage}
            source={{uri: company_logo_url}}
          />
          {/* rating container */}
          <View>
            <Text style={styles.jobTitle}>{title}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" color="yellow" size={18} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>
        {/* location package details */}
        <View style={styles.jobDetailsContainer}>
          {/* location */}
          <View style={styles.jobLocationContainer}>
            <IconF name="marker" color="white" />
            <Text style={[styles.jobLocation, {marginLeft: 5}]}>
              {location}
            </Text>
          </View>
          {/* emp type */}
          <View style={[styles.jobLocationContainer, {marginLeft: 10}]}>
            <Icon name="suitcase" color="white" />
            <Text style={[styles.jobLocation, {marginLeft: 5}]}>
              {employment_type}
            </Text>
          </View>
          {/* package */}
          <View
            style={[
              styles.jobLocationContainer,
              {
                position: 'absolute',
                right: 0,
                bottom: 20,
              },
            ]}>
            <Text style={[styles.jobLocation]}>{package_per_annum}</Text>
          </View>
        </View>
        {/* description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.desc}>{job_description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: '#202020',
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 300,
  },
  jobCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobCardImage: {
    width: 50,
    height: 40,
    marginRight: 10,
  },
  jobTitle: {
    color: 'white',
    fontSize: 18,
    // marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
  },
  jobDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    borderBottomColor: '#64748b',
    borderBottomWidth: 3,
    paddingBottom: 20,
  },
  jobLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobLocation: {
    color: '#b6c5ff',
  },
  descriptionContainer: {
    paddingVertical: 10,
  },
  descTitle: {
    color: 'white',
  },
  desc: {
    color: '#64748b',
  },
});

export default JobCard;
