import React, {useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import '../../../FirebaseConfig';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          // Reference to the user's data in Realtime Database
          const userRef = firebase.database().ref('users').child(user.uid);

          // Fetch user data from Realtime Database
          userRef
            .once('value')
            .then(snapshot => {
              const userData = snapshot.val();
              if (userData) {
                const {role} = userData;
                switch (role) {
                  case 'citizen':
                    navigation.navigate('CitizenHome');
                    break;
                  case 'oic':
                    navigation.navigate('OICHomePage');
                    break;
                  case 'policestation':
                    navigation.navigate('PoliceStationHomePage');
                    break;
                  default:
                    console.log('Invalid department');
                }
              } else {
                console.log('User data not found');
              }
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        } else {
          navigation.navigate('Login');
        }
      });
      return unsubscribe;
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      className="flex-1 w-100 h-100 bg-cover">
      <View className="flex-1 justify-center left-3">
        <View className="items-center">
          <Animatable.Image
            source={require('../../assets/logo.png')}
            animation={'fadeIn'}
            duration={1500}
            className="w-[142px] h-[140px] object-contain shadow-black mb-5"
          />
          <Text className="text-[30px] font-bold text-primary">
            E-Citizen Portal
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Splash;
