import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OICViewComplaints from '../../screens/OfficialModule/OICModule/ComplaintsSection/OICViewComplaints';
import OICComplaintsTopNavigator from './OICComplaintsTopNavigator';

const Tab = createBottomTabNavigator();

const OICComplaintsBottomNavigator = () => {
  const navigation = useNavigation();

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
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack('OICHome')}>
                <View className="left-5">
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={30}
                    color={'#fff'}
                  />
                </View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'eye-outline' : 'eye-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={40}
            />
          ),
        }}
        name="OIC View Complaints"
        component={OICViewComplaints}
      />
      <Tab.Screen
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack('OICHome')}>
                <View className="left-5">
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={30}
                    color={'#fff'}
                  />
                </View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'note-text-outline' : 'note-text-outline'}
              color={focused ? '#539165' : '#908e8c'}
              size={40}
            />
          ),
        }}
        name="OIC Complaints"
        component={OICComplaintsTopNavigator}
      />
    </Tab.Navigator>
  );
};

export default OICComplaintsBottomNavigator;
