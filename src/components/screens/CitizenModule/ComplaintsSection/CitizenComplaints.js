import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const CitizenComplaints = () => {
  const navigation = useNavigation();

  const navigateToTortureScreen = () => {
    navigation.navigate('Torture', {title: 'Torture'});
  };

  const navigateToKidnappingScreen = () => {
    navigation.navigate('Kidnapping', {title: 'Kidnapping'});
  };

  const navigateToKillingScreen = () => {
    navigation.navigate('Killing', {title: 'Killing'});
  };

  const navigateToRobberyScreen = () => {
    navigation.navigate('Robbery', {title: 'Robbery'});
  };

  const navigateToRapeScreen = () => {
    navigation.navigate('Rape', {title: 'Rape'});
  };

  const navigateToChildAbuseScreen = () => {
    navigation.navigate('ChildAbuse', {title: 'ChildAbuse'});
  };

  const navigateToMissingPersonScreen = () => {
    navigation.navigate('MissingPerson', {title: 'MissingPerson'});
  };

  const navigateToHarassmentScreen = () => {
    navigation.navigate('Harassment', {title: 'Harassment'});
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        {/* Header */}
        <View className="flex-1 flex-row bg-primary p-5">
          <TouchableOpacity onPress={() => navigation.goBack('CitizenHome')}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-white text-[22px]">
            Select Category
          </Text>
        </View>
        {/* Header */}

        {/* Categories */}
        <View className="flex-1 flex-row justify-around m-5">
          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToTortureScreen}>
              <Image
                source={require('../../../../assets/svg_icons/torture.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center ">
                Torture
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToKidnappingScreen}>
              <Image
                source={require('../../../../assets/svg_icons/kidnapping.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center">
                Kidnapping
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 flex-row justify-around m-5">
          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToKillingScreen}>
              <Image
                source={require('../../../../assets/svg_icons/killing.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center ">
                Killing
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToRobberyScreen}>
              <Image
                source={require('../../../../assets/svg_icons/robbery.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center">
                Robbery
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 flex-row justify-around m-5">
          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToRapeScreen}>
              <Image
                source={require('../../../../assets/svg_icons/rape.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center ">
                Rape
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToChildAbuseScreen}>
              <Image
                source={require('../../../../assets/svg_icons/child_abuse.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center">
                Child Abuse
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 flex-row justify-around m-5">
          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToMissingPersonScreen}>
              <Image
                source={require('../../../../assets/svg_icons/missing_person.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center ">
                Missing Person
              </Text>
            </TouchableOpacity>
          </View>

          <View className="p-5 shadow-md shadow-gray-400 rounded-md">
            <TouchableOpacity onPress={navigateToHarassmentScreen}>
              <Image
                source={require('../../../../assets/svg_icons/harassment.png')}
                className="w-24 h-24 bg-contain"
              />
              <Text className="text-primary text-[18px] font-semibold text-center">
                Harassment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Categories */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CitizenComplaints;
