import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PoliceViewComplaints from '../../screens/OfficialModule/PoliceHQModule/ComplaintsSection/PoliceViewComplaints';
import PoliceComplaintsTopNavigator from './PoliceComplaintsTopNavigator';

const Tab = createBottomTabNavigator();

const PoliceComplaintsBottomNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={() => ({
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
              <TouchableOpacity onPress={() => navigation.goBack('PoliceHome')}>
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
        name="Police View Complaints"
        component={PoliceViewComplaints}
      />
      <Tab.Screen
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack('PoliceHome')}>
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
        name="Police Complaints"
        component={PoliceComplaintsTopNavigator}
      />
    </Tab.Navigator>
  );
};

export default PoliceComplaintsBottomNavigator;
