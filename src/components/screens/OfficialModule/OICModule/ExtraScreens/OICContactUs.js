import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import '../../../../../../FirebaseConfig';
import 'firebase/compat/app';
import 'firebase/compat/database';

const OICContactUs = () => {
  const [reason, setReason] = useState('');
  const [mobile, setMobile] = useState('');
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleReport = async () => {
    // Get a reference to the "Reports" node in the database
    const citizenReportRef = database.ref('Reports');

    // Data to be added to the database
    const reportData = {
      reason: reason,
      mobile: mobile,
      cnic: cnic,
      email: email,
      message: message,
    };

    try {
      setLoading(true);
      // Push the data to the "CitizenReport" node
      await citizenReportRef.push(reportData);

      // Alert the user about the successful submission
      alert(
        'Thank You! Your Report is Submitted Successfully, We Will Contact Soon!',
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formTranslateY = new Animated.Value(200);

  const animateScreen = () => {
    Animated.parallel([
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    animateScreen();
  }, []);

  // Validations
  const isValidInput = () => {
    const mobilePattern = /^[0-9]{11}$/;
    const cnicPattern = /^(\d{5})-?(\d{7})-?(\d{1})$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isReasonValid = reason.trim().length > 0;
    const isMobileValid = mobilePattern.test(mobile);
    const isCnicValid = cnicPattern.test(cnic);
    const isEmailValid = emailPattern.test(email);

    return isReasonValid && isMobileValid && isCnicValid && isEmailValid;
  };

  const handleReasonChange = value => {
    setReason(value);
  };
  const validateReason = () => {
    if (!reason) {
      return '';
    }
    return '';
  };
  const reasonError = validateReason();

  const handleMobileNumberChange = value => {
    setMobile(value);
  };
  const validateMobileNumber = () => {
    if (!mobile) {
      return '';
    }
    const mobileNumberRegex = /^[0-9]{11}$/;
    if (!mobileNumberRegex.test(mobile)) {
      return 'Invalid mobile number';
    }
    return '';
  };
  const mobileNumberError = validateMobileNumber();

  const handleCnicChange = value => {
    setCnic(value);
  };

  const validateCnic = () => {
    if (!cnic) {
      return '';
    }
    const cnicRegex = /^(\d{5})-?(\d{7})-?(\d{1})$/;
    if (!cnicRegex.test(cnic)) {
      return 'Invalid CNIC number';
    }
    return '';
  };
  const cnicError = validateCnic();

  const handleEmailChange = value => {
    setEmail(value);
  };
  const validateEmail = () => {
    if (!email) {
      return '';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };
  const emailError = validateEmail();
  // Validations

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Animated.View
          style={[
            styles.container,
            {transform: [{translateY: formTranslateY}]},
          ]}>
          {/* Form Start */}

          <View className="flex-1 mt-8 w-full px-3">
            <View
              className="mb-5 shadow-md border-b-2 border-b-black
            ">
              <Picker
                selectedValue={reason}
                onValueChange={handleReasonChange}
                style={{color: 'black'}}>
                <Picker.Item
                  label="Pick Reason"
                  value=""
                  style={{color: 'black'}}
                />
                <Picker.Item
                  label="Password Reset Issue"
                  value="Password Reset Issue"
                />
                <Picker.Item
                  label="Password Reset Code not Recieved"
                  value="Password Reset Code not Recieved"
                />
                <Picker.Item
                  label="Mobile App Bug Report"
                  value="Mobile App Bug Report"
                />
              </Picker>
            </View>
            {reasonError ? (
              <Text className="text-red-600 text-[18px] left-3 font-bold">
                {reasonError}
              </Text>
            ) : null}

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={25}
                  color={'#000'}
                />
              </View>
              <TextInput
                className="text-base px-5 text-dark"
                placeholder="Email"
                placeholderTextColor={'#000'}
                value={email}
                onChangeText={handleEmailChange}
              />
            </View>
            {emailError ? (
              <Text className="text-red-600 text-[18px] left-3 font-bold">
                {emailError}
              </Text>
            ) : null}

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={25}
                  color={'#000'}
                />
              </View>
              <TextInput
                className="text-base px-5 text-dark"
                placeholder="Mobile"
                keyboardType="number-pad"
                placeholderTextColor={'#000'}
                value={mobile}
                onChangeText={handleMobileNumberChange}
              />
            </View>
            {mobileNumberError ? (
              <Text className="text-red-600 text-[18px] left-3 font-bold">
                {mobileNumberError}
              </Text>
            ) : null}

            <View className="flex-row mb-5 border-b-2 border-b-black">
              <View className="mt-3">
                <MaterialCommunityIcons
                  name="id-card"
                  size={25}
                  color={'#000'}
                />
              </View>
              <TextInput
                className="text-base px-5 text-dark"
                placeholder="CNIC"
                keyboardType="number-pad"
                placeholderTextColor={'#000'}
                value={cnic}
                onChangeText={handleCnicChange}
              />
            </View>
            {cnicError ? (
              <Text className="text-red-600 text-[18px] left-3 font-bold">
                {cnicError}
              </Text>
            ) : null}

            <View>
              <TextInput
                className="text-base px-5 text-dark border-b-2 border-b-black"
                placeholder="Details Here! (Optional)! "
                placeholderTextColor="black"
                multiline={true}
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* Button Start */}

            <TouchableOpacity
              className="flex-1 justify-center items-center p-5 mt-10 rounded-lg"
              disabled={!isValidInput() || loading}
              style={[{backgroundColor: isValidInput() ? '#539165' : '#ccc'}]}
              onPress={handleReport}>
              {loading ? (
                <ActivityIndicator color={'#fff'} /> // Show loader while loading
              ) : (
                <Text className="text-white text-xl">Submit</Text> // Show login text when not loading
              )}
            </TouchableOpacity>

            {/* Button End */}
          </View>

          {/* Form End */}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OICContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
