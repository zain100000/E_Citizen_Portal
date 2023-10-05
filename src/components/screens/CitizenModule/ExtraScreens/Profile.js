import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import imgPlaceHolder from '../../../../assets/default-avatar.png';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../../../../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [fullname, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const authInstance = auth();

  const handleFullName = value => {
    setFullName(value);
  };

  const handleMobile = value => {
    setMobile(value);
  };

  const handlePickImage = async () => {
    try {
      // If there is an existing image, delete it first
      if (imageUrl) {
        const user = authInstance.currentUser;
        if (user) {
          const imageRef = storage().ref(`users/${user.uid}`);
          await imageRef.delete();
        }
      }

      // Pick and upload the new image
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });

      setImageUrl(image.path);

      const user = authInstance.currentUser;
      if (user) {
        const imageRef = storage().ref(`users/${user.uid}`);
        await imageRef.putFile(image.path);
      }
    } catch (error) {
      alert('Error picking/updating image: ' + error);
    }
  };

  const handleUpdatePersonal = async () => {
    const user = authInstance.currentUser;
    try {
      setLoading(true);
      // Update the Realtime Database with the new values
      await database().ref(`users/${user.uid}`).update({
        imageUrl,
        fullname,
        mobile,
      });

      alert('Personal information updated successfully!');
    } catch (error) {
      alert('Error updating personal information: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = authInstance.currentUser;
      if (user) {
        try {
          const userSnapshot = await database()
            .ref(`users/${user.uid}`)
            .once('value');

          const userData = userSnapshot.val();
          if (userData) {
            setFullName(userData.fullname);
            setMobile(userData.mobile);
            setImageUrl(userData.imageUrl);
          }
        } catch (error) {
          alert('Error while fetching user data: ' + error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <View className="flex-1 translate-y-28">
      {/* Image */}
      <View className="justify-center items-center mb-5">
        <TouchableOpacity onPress={handlePickImage}>
          {imageUrl ? (
            <Image
              source={{uri: imageUrl}}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <Image source={imgPlaceHolder} className="w-24 h-24 rounded-full" />
          )}
        </TouchableOpacity>
      </View>

      <View className="w-full px-5">
        <View className="flex-row border-2 border-t-0 border-l-0 border-r-0 border-b-black p-3">
          <View className="mt-3">
            <MaterialCommunityIcons
              name="account-outline"
              size={26}
              color={'#000'}
            />
          </View>
          <TextInput
            className="px-5 text-black text-base"
            placeholder="Enter Name"
            placeholderTextColor={'#000'}
            value={fullname}
            onChangeText={handleFullName}
          />
        </View>
      </View>

      <View className="w-full px-5">
        <View className="flex-row border-2 border-t-0 border-l-0 border-r-0 border-b-black p-3">
          <View className="mt-3">
            <MaterialCommunityIcons
              name="phone-outline"
              size={26}
              color={'#000'}
            />
          </View>
          <TextInput
            className="px-5 text-black text-base"
            placeholder="Enter Mobile"
            placeholderTextColor={'#000'}
            value={mobile}
            onChangeText={handleMobile}
          />
        </View>
      </View>

      <TouchableOpacity
        className="justify-center items-center w-80 left-[55px] mt-10 mb-2 p-4 bg-secondary rounded-lg"
        onPress={handleUpdatePersonal}>
        {loading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text className="text-white text-[20px] font-medium">
            Update Personal
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
