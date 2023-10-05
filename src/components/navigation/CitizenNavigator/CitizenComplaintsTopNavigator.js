import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CitizenComplaints from '../../screens/CitizenModule/ComplaintsSection/CitizenComplaints';
import CitizenViewComplaints from '../../screens/CitizenModule/ComplaintsSection/CitizenViewComplaints';

const Tab = createMaterialTopTabNavigator();

const CitizenComplaintsTopNavigator = () => {
  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            color: '#000',
            fontWeight: '700',
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#539165',
            height:3
          },

          tabBarStyle: {
            backgroundColor: '#fff',
            paddingTop: 10,
            paddingBottom: 10,
          },
        }}>
        <Tab.Screen
          name="Complaints Catergory"
          component={CitizenComplaints}
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'apps-box' : 'apps-box'}
                color={focused ? '#539165' : '#908e8c'}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="View Complaints"
          component={CitizenViewComplaints}
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'eye-outline' : 'eye-outline'}
                color={focused ? '#539165' : '#908e8c'}
                size={25}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default CitizenComplaintsTopNavigator;
