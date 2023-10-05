import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import '../../../../../../FirebaseConfig';
import firebase from 'firebase/compat/app';
import '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';

const ChildAbuse = ({route}) => {
  const [data, setData] = useState(null);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [loading, setLoading] = useState(false);
  const {title} = route.params;

  const handlePickDocument = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });
      const uris = response.map(response => response.fileCopyUri);

      setData(uris);
    } catch (error) {
      console.log(error);
    }
  };

  const UploadComplaint = async () => {
    setLoading(true);

    const storageRef = storage().ref(`/Complaint Evidance/`);

    try {
      if (data && data.length > 0) {
        const promises = data.map(async uri => {
          const name = uri.split('/').pop();
          const task = storageRef.child(name).putFile(uri);

          await task;

          const downloadUrl = await task.snapshot.ref.getDownloadURL();
          return {name, downloadUrl};
        });

        const uploadedFiles = await Promise.all(promises);

        const fields = {
          subject: title,
          category: category,
          details: details,
          address: address,
          province: province,
          district: district,
          tehsil: tehsil,
          files: uploadedFiles,
        };

        const timestamp = firebase.database.ServerValue.TIMESTAMP; // Use Firebase timestamp
        const user = auth().currentUser;

        // Replace with your Firebase Realtime Database reference
        const dbRef = firebase.database().ref('Complaints');
        const newComplaintRef = dbRef.push();

        // Set the data in the Realtime Database
        await newComplaintRef.set({
          ...fields,
          userId: user.uid,
          timestamp: timestamp,
        });

        // Display success alert
        alert('Complaint submitted successfully');

        // Clear selected video after upload
        setData(null);

        setLoading(false);
      } else {
        // Handle the case when no files are selected
        const fields = {
          subject: title,
          category: category,
          details: details,
          address: address,
          province: province,
          district: district,
          tehsil: tehsil,
          files: [],
        };

        const timestamp = firebase.database.ServerValue.TIMESTAMP; // Use Firebase timestamp
        const user = auth().currentUser;

        // Replace with your Firebase Realtime Database reference
        const dbRef = firebase.database().ref('ComplaintsHistory');
        const newComplaintRef = dbRef.push();

        // Set the data in the Realtime Database
        await newComplaintRef.set({
          ...fields,
          userId: user.uid,
          timestamp: timestamp,
        });

        // Display success alert
        alert('Complaint submitted successfully');

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the submission
      // You can also display an error alert here if needed.
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View>
          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">Subject</Text>
            <TextInput
              placeholderTextColor="black"
              value={title}
              onChangeText={setSubject}
              className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3"
            />
          </View>

          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">
              Child Abuse Category
            </Text>
            <View className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3">
              <Picker
                selectedValue={category}
                onValueChange={setCategory}
                className="text-black">
                <Picker.Item
                  label="Select Category"
                  value=""
                  style={{color: 'black'}}
                />
                <Picker.Item label="Child Neglect" value="Child Neglect" />
                <Picker.Item label="Sexual Abuse" value="Sexual Abuse" />
                <Picker.Item label="Child Marriage" value="Child Marriage" />
                <Picker.Item
                  label="Child Pornography"
                  value="Child Pornography"
                />
              </Picker>
            </View>
          </View>

          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">
              Complaint Detail
            </Text>
            <View>
              <TextInput
                placeholder="Enter Complaint Details Here!"
                placeholderTextColor="black"
                multiline={true}
                numberOfLines={6}
                value={details}
                onChangeText={setDetails}
                className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3"
              />
            </View>
          </View>

          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">Address</Text>
            <View>
              <TextInput
                placeholder="Enter Address Here!"
                placeholderTextColor="black"
                value={address}
                onChangeText={setAddress}
                className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3"
              />
            </View>
          </View>

          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">Province</Text>
            <View className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3">
              <Picker
                selectedValue={province}
                onValueChange={setProvince}
                className="text-black">
                <Picker.Item
                  label="Select Province"
                  value=""
                  style={{color: 'black'}}
                />
                <Picker.Item label="Punjab" value="Punjab" />
              </Picker>
            </View>
          </View>

          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">District</Text>
            <View className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3">
              <Picker
                selectedValue={district}
                onValueChange={setDistrict}
                className="text-black">
                <Picker.Item
                  label="Select District"
                  value=""
                  style={{color: 'black'}}
                />
                <Picker.Item label="Sargodha" value="Sargodha" />
              </Picker>
            </View>
          </View>

          <View className="p-5">
            <Text className="text-[20px] font-bold text-black">Tehsil</Text>
            <View className="border-2 border-gray-500 rounded-md text-[18px] text-gray-500 pl-3 mt-3">
              <Picker
                selectedValue={tehsil}
                onValueChange={setTehsil}
                className="text-black">
                <Picker.Item
                  label="Select Tehsil"
                  value=""
                  style={{color: 'black'}}
                />
                <Picker.Item label="KotMomin" value="KotMomin" />
                <Picker.Item label="Silanwali" value="Silanwali" />
                <Picker.Item label="Sahiwal" value="Sahiwal" />
                <Picker.Item label="Bhalwal" value="Bhalwal" />
              </Picker>
            </View>
          </View>

          <View className="flex-1 flex-row">
            {data ? (
              <View className="flex-1 flex-row top-3">
                {data.map(uri => {
                  if (uri.endsWith('.mp4') || uri.endsWith('.mov')) {
                    return (
                      <Video
                        key={uri}
                        source={{uri}}
                        resizeModel="contain"
                        className="w-[100px] h-[100px]"
                      />
                    );
                  } else {
                    return (
                      <Image
                        key={uri}
                        source={{uri}}
                        className="w-[100px] h-[100px] ml-8"
                      />
                    );
                  }
                })}
              </View>
            ) : (
              <Text className="text-black font-bold text-[20px] left-8">
                No Files Selected Yet!
              </Text>
            )}
          </View>

          <View className="flex-row w-100 p-5 mt-5">
            <TouchableOpacity
              onPress={handlePickDocument}
              className="pl-10 pr-10 pt-5 pb-5 rounded-full bg-primary">
              <Text className="text-white font-bold text-[20px]">
                Choose File
              </Text>
            </TouchableOpacity>
          </View>

          <View className="left-8">
            <Text className="text-gray-600 text-[20px] mb-2">
              Attachment Size Limit
            </Text>
            <Text className="text-red-600 text-lg font-semibold">
              - Image 3 MB
            </Text>
            <Text className="text-red-600 text-lg font-semibold">
              - Video 20 MB
            </Text>
            <Text className="text-red-600 text-lg font-semibold">
              - Audio 2 MB
            </Text>
            <Text className="text-red-600 text-lg font-semibold">
              - File 5 MB
            </Text>
          </View>

          {/* Button Start */}

          <TouchableOpacity
            className="flex-1 justify-center left-3 mb-5 mr-5 items-center mt-8 p-6 bg-primary rounded-xl"
            onPress={UploadComplaint}>
            {loading ? (
              <ActivityIndicator color={'#fff'} /> // Show loader while loading
            ) : (
              <Text className="text-white text-xl">Submit Complaint</Text> // Show login text when not loading
            )}
          </TouchableOpacity>

          {/* Button End */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChildAbuse;
