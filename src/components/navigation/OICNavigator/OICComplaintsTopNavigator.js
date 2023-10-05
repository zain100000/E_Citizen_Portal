import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ApproveComplaint from '../../screens/OfficialModule/OICModule/ComplaintsSection/ApproveComplaint';
import RejectComplaint from '../../screens/OfficialModule/OICModule/ComplaintsSection/RejectComplaint';
import OICComplaintsHistory from '../../screens/OfficialModule/OICModule/ComplaintsSection/OICComplaintsHistory';

const Tab = createMaterialTopTabNavigator();

const OICComplaintsTopNavigator = () => {
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
          name="OIC Complaints History"
          component={OICComplaintsHistory}
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
          name="Approve Complaints"
          component={ApproveComplaint}
          options={{
            tabBarLabel: 'Approve Complaints',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={
                  focused ? 'check-decagram-outline' : 'check-decagram-outline'
                }
                color={focused ? '#539165' : '#908e8c'}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Reject Complaints"
          component={RejectComplaint}
          options={{
            tabBarLabel: 'Reject Complaints',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'close-circle-outline' : 'close-circle-outline'}
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

export default OICComplaintsTopNavigator;
