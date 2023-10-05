import React from 'react';
import {Text, View, Linking, SafeAreaView} from 'react-native';

const OICTutorials = () => {
  const handleLinkPress = () => {
    Linking.openURL('https://youtu.be/dM4BXakoYFk');
    Linking.openURL('https://youtu.be/MMpk-TaEBuY');
    Linking.openURL('https://youtu.be/FPh_qwdpIIg');
    Linking.openURL('https://youtu.be/reLoZelbhfs');
    Linking.openURL('https://youtu.be/KKbQog8D1b0');
    Linking.openURL('https://youtu.be/KtNo4QErfWs');
  };

  return (
    <SafeAreaView className="flex-1 items-center">
      <View>
        <View className="p-2 m-2 border-b-2 border-b-black w-[430px]">
          <Text className="text-black font-bold text-[20px] mb-2">
            How to Register at E-Citizen Portal ?
          </Text>
          <Text
            className="text-red-700 font-semibold text-[18px] "
            onPress={handleLinkPress}>
            https://youtu.be/dM4BXakoYFk
          </Text>
        </View>

        <View className="p-2 m-2 border-b-2 border-b-black w-[430px]">
          <Text className="text-black font-bold text-[20px] mb-2">
            How to Verify Mobile Number at E-Citizen Portal ?
          </Text>
          <Text
            className="text-red-700 font-semibold text-[18px]"
            onPress={handleLinkPress}>
            https://youtu.be/MMpk-TaEBuY
          </Text>
        </View>

        <View className="p-2 m-2 border-b-2 border-b-black w-[430px]">
          <Text className="text-black font-bold text-[20px] mb-2">
            How to Reset Password of Your Account ?
          </Text>
          <Text
            className="text-red-700 font-semibold text-[18px]"
            onPress={handleLinkPress}>
            https://youtu.be/FPh_qwdpIIg
          </Text>
        </View>

        <View className="p-2 m-2 border-b-2 border-b-black w-[430px]">
          <Text className="text-black font-bold text-[20px] mb-2">
            How to Register Complaint at E-Citizen Portal ?
          </Text>
          <Text
            className="text-red-700 font-semibold text-[18px]"
            onPress={handleLinkPress}>
            https://youtu.be/reLoZelbhfs
          </Text>
        </View>

        <View className="p-2 m-2 border-b-2 border-b-black w-[430px]">
          <Text className="text-black font-bold text-[20px] mb-2">
            How to Withdraw Complaint at E-Citizen Portal ?
          </Text>
          <Text
            className="text-red-700 font-semibold text-[18px]"
            onPress={handleLinkPress}>
            https://youtu.be/KKbQog8D1b0
          </Text>
        </View>

        <View className="p-2 m-2">
          <Text className="text-black font-bold text-[20px] mb-2">
            How to Provide Information about E-Citizen Portal Complaints ?
          </Text>
          <Text
            className="text-red-700 font-semibold text-[18px]"
            onPress={handleLinkPress}>
            https://youtu.be/KtNo4QErfWs
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OICTutorials;
