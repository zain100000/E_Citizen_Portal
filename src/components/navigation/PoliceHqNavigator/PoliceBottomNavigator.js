import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imgPlaceHolder from '../../../assets/default-avatar.png';
import PoliceHomePage from '../../screens/OfficialModule/PoliceHQModule/PoliceHomePage';
import PoliceTutorials from '../../screens/OfficialModule/PoliceHQModule/ExtraScreens/PoliceTutorials';
import PoliceProfile from '../../screens/OfficialModule/PoliceHQModule/ExtraScreens/PoliceProfile';
import PoliceContactUs from '../../screens/OfficialModule/PoliceHQModule/ExtraScreens/PoliceContactUs';
import '../../../../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const Tab = createBottomTabNavigator();

const PoliceBottomNavigator = () => {
  const [imageUrl, setImageUrl] = useState('');
  const authInstance = auth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      alert('Logout Successfully');
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchImageUrl = async () => {
      const user = authInstance.currentUser;
      if (user) {
        try {
          const url = await storage()
            .ref(`users/${user.uid}/`) // Name in storage in Firebase console
            .getDownloadURL();
          setImageUrl(url);
        } catch (error) {
          alert('Error while downloading: ' + error);
        }
      } else {
        // User is not logged in, handle this case if needed
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarLabel: '',
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#908e8c',
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          backgroundColor: '#000',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: '#539165',
          height: 80,
        },
      })}>
      <Tab.Screen
        options={{
          headerRight: () => {
            return (
              <View className="mr-[10px]">
                <TouchableOpacity onPress={handleLogout}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View className="ml-[10px] justify-center items-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate('PoliceProfile')}>
                  {imageUrl ? (
                    <Image
                      source={{uri: imageUrl}}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  ) : (
                    <Image
                      source={imgPlaceHolder}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home-outline' : 'home-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={40}
            />
          ),
        }}
        name="Police Home Page"
        component={PoliceHomePage}
      />

      <Tab.Screen
        options={{
          headerRight: () => {
            return (
              <View className="mr-[10px]">
                <TouchableOpacity onPress={handleLogout}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View className="ml-[10px] justify-center items-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate('PoliceProfile')}>
                  {imageUrl ? (
                    <Image
                      source={{uri: imageUrl}}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  ) : (
                    <Image
                      source={imgPlaceHolder}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'wizard-hat' : 'wizard-hat'}
              color={focused ? '#539165' : '#908e8c'}
              size={40}
            />
          ),
        }}
        name="Police Tutorials"
        component={PoliceTutorials}
      />

      <Tab.Screen
        options={{
          headerRight: () => {
            return (
              <View className="mr-[10px]">
                <TouchableOpacity onPress={handleLogout}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View className="ml-[10px] justify-center items-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate('PoliceProfile')}>
                  {imageUrl ? (
                    <Image
                      source={{uri: imageUrl}}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  ) : (
                    <Image
                      source={imgPlaceHolder}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'account-circle' : 'account-circle'}
              color={focused ? '#539165' : '#908e8c'}
              size={40}
            />
          ),
        }}
        name="Police Profile"
        component={PoliceProfile}
      />

      <Tab.Screen
        options={{
          headerRight: () => {
            return (
              <View className="mr-[10px]">
                <TouchableOpacity onPress={handleLogout}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View className="ml-[10px] justify-center items-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate('PoliceProfile')}>
                  {imageUrl ? (
                    <Image
                      source={{uri: imageUrl}}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  ) : (
                    <Image
                      source={imgPlaceHolder}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'card-account-phone' : 'card-account-phone'}
              color={focused ? '#539165' : '#908e8c'}
              size={40}
            />
          ),
        }}
        name="Police Contact Us"
        component={PoliceContactUs}
      />
    </Tab.Navigator>
  );
};

export default PoliceBottomNavigator;
