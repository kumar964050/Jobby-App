/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    isError: false,
    msg: 'Hello User',
  });

  const handleOnChange = (field: String, value: String) => {
    setUserDetails({
      ...userDetails,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    setError({
      isError: false,
      msg: '',
    });
    const res = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userDetails.username.toLowerCase(),
        password: userDetails.password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setError({
        isError: false,
        msg: '',
      });
      setUserDetails({
        username: '',
        password: '',
      });
      await AsyncStorage.setItem('jwt-token', JSON.stringify(data.jwt_token));
      navigation.navigate('Home');
    } else {
      setError({
        isError: true,
        msg: data.error_msg,
      });
    }
  };
  useEffect(() => {
    const getJwt = async () => {
      const value = await AsyncStorage.getItem('jwt-token');
      if (value) {
        navigation.replace('Home');
      }
    };
    getJwt();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          style={styles.formImage}
          source={require('./../Assets/logo.png')}
        />
        {/* Username */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.inputElement}
            onChangeText={text => handleOnChange('username', text)}
            value={userDetails.username}
            placeholder="Enter Username"
            placeholderTextColor="#64748b"
          />
        </View>
        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.inputElement}
            onChangeText={text => handleOnChange('password', text)}
            value={userDetails.password}
            placeholder="Enter Password"
            placeholderTextColor="#64748b"
            secureTextEntry={true}
          />
        </View>
        {/* button container */}
        <View style={styles.buttonContainer}>
          <Button onPress={handleSubmit} title="Login" />
          {error.isError && <Text style={styles.errorMsg}>{error.msg}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#202020',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 70,
  },
  formImage: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  inputContainer: {
    marginVertical: 5,
  },
  inputLabel: {
    color: 'white',
    margin: 5,
    marginVertical: 10,
  },
  inputElement: {
    borderColor: '#64748b',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 30,
  },
  errorMsg: {
    color: 'red',
    marginVertical: 5,
  },
});
