import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/components/screens/Splash';
import Login from './src/components/screens/Login';
import Signup from './src/components/screens/Signup';
import CitizenBottomNavigator from './src/components/navigation/CitizenNavigator/CitizenBottomNavigator';
import Profile from './src/components/screens/CitizenModule/ExtraScreens/Profile';
import CitizenComplaintsTopNavigator from './src/components/navigation/CitizenNavigator/CitizenComplaintsTopNavigator';
import Torture from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/Torture';
import Kidnapping from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/Kidnapping';
import Killing from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/Killing';
import Robbery from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/Robbery';
import Rape from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/Rape';
import ChildAbuse from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/ChildAbuse';
import MissingPerson from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/MissingPerson';
import Harassment from './src/components/screens/CitizenModule/ComplaintsSection/ComplaintsForm/Harassment';
import OICBottomNavigator from './src/components/navigation/OICNavigator/OICBottomNavigator';
import OICProfile from './src/components/screens/OfficialModule/OICModule/ExtraScreens/OICProfile';
import OICComplaintsBottomNavigator from './src/components/navigation/OICNavigator/OICComplaintsBottomNavigator';
import PoliceProfile from './src/components/screens/OfficialModule/PoliceHQModule/ExtraScreens/PoliceProfile';
import PoliceBottomNavigator from './src/components/navigation/PoliceHqNavigator/PoliceBottomNavigator';
import PoliceComplaintsBottomNavigator from './src/components/navigation/PoliceHqNavigator/PoliceComplaintsBottomNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="CitizenHome" component={CitizenBottomNavigator} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerTitle: 'Citizen Profile',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />
        <Stack.Screen
          name="CitizenComplaints"
          component={CitizenComplaintsTopNavigator}
        />
        <Stack.Screen
          name="Torture"
          component={Torture}
          options={{
            headerShown: true,
            headerTitle: 'Torture',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />
        <Stack.Screen
          name="Kidnapping"
          component={Kidnapping}
          options={{
            headerShown: true,
            headerTitle: 'Kidnapping',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />
        <Stack.Screen
          name="Killing"
          component={Killing}
          options={{
            headerShown: true,
            headerTitle: 'Killing',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />
        <Stack.Screen
          name="Robbery"
          component={Robbery}
          options={{
            headerShown: true,
            headerTitle: 'Robbery',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="Rape"
          component={Rape}
          options={{
            headerShown: true,
            headerTitle: 'Rape',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="ChildAbuse"
          component={ChildAbuse}
          options={{
            headerShown: true,
            headerTitle: 'Child Abuse',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="MissingPerson"
          component={MissingPerson}
          options={{
            headerShown: true,
            headerTitle: 'Missing Person',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="Harassment"
          component={Harassment}
          options={{
            headerShown: true,
            headerTitle: 'Harassment',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen name="OICHomePage" component={OICBottomNavigator} />
        <Stack.Screen
          name="OICComplaintBottomNavigator"
          component={OICComplaintsBottomNavigator}
        />

        <Stack.Screen
          name="OICProfile"
          component={OICProfile}
          options={{
            headerShown: true,
            headerTitle: 'OIC Profile',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="PoliceProfile"
          component={PoliceProfile}
          options={{
            headerShown: true,
            headerTitle: 'Police Profile',
            headerTitleStyle: {
              color: '#fff',
              fontSize: 28,
            },
            headerStyle: {
              backgroundColor: '#539165',
            },
          }}
        />

        <Stack.Screen
          name="PoliceStationHomePage"
          component={PoliceBottomNavigator}
        />
        <Stack.Screen
          name="PoliceComplaintBottomNavigator"
          component={PoliceComplaintsBottomNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
