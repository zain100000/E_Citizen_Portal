import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InProgress from '../../screens/OfficialModule/PoliceHQModule/ComplaintsSection/InProgress';
import Pending from '../../screens/OfficialModule/PoliceHQModule/ComplaintsSection/Pending';
import Closing from '../../screens/OfficialModule/PoliceHQModule/ComplaintsSection/Closing';
import PolicecomplaintsHistory from '../../screens/OfficialModule/PoliceHQModule/ComplaintsSection/PoliceComplaintsHistory';

const Tab = createMaterialTopTabNavigator();

const PoliceComplaintsTopNavigator = () => {
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
            height: 3,
          },

          tabBarStyle: {
            backgroundColor: '#fff',
            paddingTop: 10,
            paddingBottom: 10,
          },
        }}>
        <Tab.Screen
          name="Police Complaints History"
          component={PolicecomplaintsHistory}
          options={{
            tabBarLabel: 'Complaints History',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'history' : 'history'}
                color={focused ? '#539165' : '#908e8c'}
                size={25}
              />
            ),
          }}
        />

        <Tab.Screen
          name="InProgress Complaints"
          component={InProgress}
          options={{
            tabBarLabel: 'InProgress Complaints',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'progress-alert' : 'progress-alert'}
                color={focused ? '#539165' : '#908e8c'}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Pending Complaints"
          component={Pending}
          options={{
            tabBarLabel: 'Pending Complaints',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'clock-outline' : 'clock-outline'}
                color={focused ? '#539165' : '#908e8c'}
                size={25}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Close Complaints"
          component={Closing}
          options={{
            tabBarLabel: 'Closing Complaints',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'close-outline' : 'close-outline'}
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

export default PoliceComplaintsTopNavigator;
