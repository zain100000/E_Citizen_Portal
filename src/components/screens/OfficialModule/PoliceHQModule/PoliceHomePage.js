import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import '../../../../../FirebaseConfig';
import firebase from '@react-native-firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const PoliceHomePage = () => {
  const [fullname, setFullName] = useState('');
  const navigation = useNavigation();

  const fetchUser = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.database().ref('users');
      userRef
        .orderByChild('email')
        .equalTo(user.email)
        .once('value', snapshot => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userKey = Object.keys(userData)[0];
            const userWithKey = userData[userKey];
            setFullName(userWithKey.fullname);
          }
        });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetchUser();
      }
    });
  }, []);

  return (
    <View className="flex-1 items-center mt-5">
      <View>
        <Text className="text-3xl left-3 text-center">
          Welcome {'\n'}
          {'\n'}
          {fullname}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('PoliceComplaintBottomNavigator')}>
        <View className=" p-10 rounded-xl shadow-md shadow-gray-500 top-[50px]">
          <View>
            <Image
              source={require('../../../../assets/complaint.png')}
              className="w-24 h-24 object-contain bg-contain"
            />
            <Text className="text-center text-2xl top-3 text-dark font-bold">
              Complaints
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PoliceHomePage;
