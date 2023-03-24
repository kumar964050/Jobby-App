import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/Foundation';

export default function JobDetailView({data}) {
  const {
    id,
    title,
    company_logo_url,
    rating,
    location,
    package_per_annum,
    job_description,
    skills,
    life_at_company,
    employment_type,
  } = data.job_details;

  return (
    <View style={[styles.jobCard, {width: '100%', marginTop: 30}]}>
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
          <Text style={[styles.jobLocation, {marginLeft: 5}]}>{location}</Text>
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
              right: 10,
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
      {/* Skills */}
      <Text style={styles.descTitle}>Skills</Text>
      <View style={styles.skillContainer}>
        {skills.map(each => (
          <View style={styles.skill} key={each.name}>
            <Image
              resizeMode="contain"
              style={styles.skillImage}
              source={{uri: each.image_url}}
            />
            <Text style={styles.skillName}>{each.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.aboutCompany}>
        <Image
          style={styles.companyImage}
          source={{uri: life_at_company.image_url}}
        />
        <Text style={[styles.descTitle, {marginTop: 10}]}>Life at Company</Text>
        <Text style={styles.desc}>{life_at_company.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: '#202020',
    marginVertical: 10,
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
  skillContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  skill: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginVertical: 10,
  },
  skillImage: {
    width: 65,
    height: 30,
  },
  skillName: {
    color: 'white',
  },
  aboutCompany: {},
  companyImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
