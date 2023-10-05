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
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import imgPlaceHolder from '../../assets/default-avatar.png';
import '../../../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const [image, setImage] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [cnic, setCnic] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [role, setRole] = useState('');
  const [badge, setBadge] = useState('');
  const [stationid, setStationId] = useState('');
  const [showBadgeField, setShowBadgeField] = useState(false);
  const [showStationIdField, setShowStationIdField] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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

  const handlePickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image);
    });
  };

  const handleRoleChange = value => {
    setRole(value);
    setShowBadgeField(value === 'oic');
    setShowStationIdField(value === 'policestation');
  };
  const handleBadgeChange = value => {
    setBadge(value);
  };
  const handleStationIdChange = value => {
    setStationId(value);
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const authCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = authCredential.user;

      // Create a reference to the Realtime Database
      const db = database();

      // Reference to the user's data in Realtime Database
      const userRef = db.ref(`users/${user.uid}`);

      const imageRef = storage().ref().child(`users/${user.uid}/`);
      const imageBlob = await fetch(image.path).then(response =>
        response.blob(),
      );

      // Upload the image to Firebase Storage
      await imageRef.put(imageBlob);
      const imageUrl = await imageRef.getDownloadURL();

      // Set user data in Realtime Database
      await userRef.set({
        role,
        imageUrl,
        fullname,
        email,
        address,
        mobile,
        cnic,
        badge,
        stationid,
      });

      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Validations

  const isValidInput = () => {
    const fullNamePattern = /^[a-zA-Z\s]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    const addressPattern = /^[\w\s,'-]*$/;
    const mobilePattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const cnicPattern = /^(\d{5})-(\d{7})-(\d{1})$/gm;

    const isFullNameValid = fullNamePattern.test(fullname);
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);
    const isConfirmPasswordValid = confirmPassword === password;
    const isAddressValid = addressPattern.test(address);
    const isMobileValid = mobilePattern.test(mobile);
    const isCnicValid = cnicPattern.test(cnic);

    return (
      isFullNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isAddressValid &&
      isMobileValid &&
      isCnicValid
    );
  };

  const validateFullname = () => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!fullname.match(regex)) {
      return 'Special Characters Not Allowed';
    }
    return '';
  };
  const fullnameError = validateFullname();

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

  const handlePasswordChange = value => {
    setPassword(value);
  };
  const validatePassword = () => {
    if (!password) {
      return '';
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return 'Invalid Password Format';
    }
    return '';
  };
  const passwordError = validatePassword();

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
  };
  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };
  const confirmPasswordError = validateConfirmPassword();

  const handleAddressChange = value => {
    setAddress(value);
  };
  const validateAddress = () => {
    if (!address) {
      return '';
    }
    const addressRegex = /^[\w\s,'-]*$/;
    if (!addressRegex.test(address)) {
      return 'Invalid Address Format';
    }
    return '';
  };
  const addressError = validateAddress();

  const handleMobileChange = value => {
    setMobile(value);
  };
  const validateMobile = () => {
    if (!mobile) {
      return '';
    }
    const mobileRegex = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    if (!mobileRegex.test(mobile)) {
      return 'Invalid Mobile Format';
    }
    return '';
  };
  const mobileError = validateMobile();

  const handleCnicChange = value => {
    setCnic(value);
  };
  const validateCnic = () => {
    if (!cnic) {
      return '';
    }
    const cnicRegex = /^(\d{5})-(\d{7})-(\d{1})$/gm;
    if (!cnicRegex.test(cnic)) {
      return 'Invalid CNIC Format';
    }
    return '';
  };
  const cnicError = validateCnic();

  // Validations

  return (
    <ImageBackground
      source={require('../../assets/signup_bg.jpeg')}
      className="w-full h-full object-cover">
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="flex-1 items-center mt-[30px]">
            <Text className="text-[#fff] text-4xl mb-5">Signup</Text>
            <Text className="text-gray-300 text-[20px]">
              Please provide all details to Continue
            </Text>
          </View>

          <Animated.View
            style={[
              styles.container,
              {transform: [{translateY: formTranslateY}]},
            ]}>
            {/* Form Start */}

            {/* image */}
            <TouchableOpacity
              onPress={handlePickImage}
              className="flex-1 items-center mt-8">
              {image ? (
                <Image
                  source={{uri: image.path}}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <Image
                  source={imgPlaceHolder}
                  className="w-24 h-24 rounded-full"
                />
              )}
            </TouchableOpacity>
            {/* image */}

            <View className="flex-1 mt-8 w-full px-3">
              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <MaterialCommunityIcons
                    name="account-circle-outline"
                    size={25}
                    color={'#fff'}
                  />
                </View>
                <TextInput
                  className="text-base px-5 text-white"
                  placeholder="Enter Full Name"
                  placeholderTextColor={'#fff'}
                  value={fullname}
                  onChangeText={setFullName}
                />
              </View>
              {fullnameError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {fullnameError}
                </Text>
              ) : null}

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={25}
                    color={'#fff'}
                  />
                </View>
                <TextInput
                  className="text-base px-5 text-white"
                  keyboardType="email-address"
                  placeholder="Enter Email"
                  placeholderTextColor={'#fff'}
                  value={email}
                  onChangeText={handleEmailChange}
                />
              </View>
              {emailError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {emailError}
                </Text>
              ) : null}

              <View className="flex-1 flex-row border-b-2 border-b-white mb-5">
                <View className="flex-1 flex-row">
                  <View className="mt-3">
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </View>
                  <TextInput
                    className="text-base px-5 text-white"
                    placeholder="Enter Password"
                    placeholderTextColor={'#fff'}
                    value={password}
                    secureTextEntry={hidePassword}
                    onChangeText={handlePasswordChange}
                  />
                </View>
                <View className="mt-3">
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}>
                    <MaterialCommunityIcons
                      name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                      size={25}
                      color={hidePassword ? '#fff' : '#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {passwordError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {passwordError}
                </Text>
              ) : null}

              <View className="flex-1 flex-row border-b-2 border-b-white">
                <View className="flex-1 flex-row">
                  <View className="mt-3">
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={25}
                      color={'#fff'}
                    />
                  </View>
                  <TextInput
                    className="text-base px-5 text-white"
                    placeholder="Enter Confirm Password"
                    placeholderTextColor={'#fff'}
                    value={confirmPassword}
                    secureTextEntry={hidePassword1}
                    onChangeText={handleConfirmPasswordChange}
                  />
                </View>
                <View className="mt-3">
                  <TouchableOpacity
                    onPress={() => setHidePassword1(!hidePassword1)}>
                    <MaterialCommunityIcons
                      name={hidePassword1 ? 'eye-off-outline' : 'eye-outline'}
                      size={25}
                      color={hidePassword1 ? '#fff' : '#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {confirmPasswordError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {confirmPasswordError}
                </Text>
              ) : null}

              <View className="flex-row mb-5 border-b-2 border-b-white mt-5">
                <View className="mt-3">
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={25}
                    color={'#fff'}
                  />
                </View>
                <TextInput
                  className="text-base px-5 text-white"
                  placeholder="Enter Address"
                  placeholderTextColor={'#fff'}
                  value={address}
                  onChangeText={handleAddressChange}
                />
              </View>
              {addressError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {addressError}
                </Text>
              ) : null}

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={25}
                    color={'#fff'}
                  />
                </View>
                <TextInput
                  className="text-base px-5 text-white"
                  keyboardType="number-pad"
                  placeholder="Enter Mobile"
                  placeholderTextColor={'#fff'}
                  value={mobile}
                  onChangeText={handleMobileChange}
                />
              </View>
              {mobileError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {mobileError}
                </Text>
              ) : null}

              <View className="flex-row mb-5 border-b-2 border-b-white">
                <View className="mt-3">
                  <MaterialCommunityIcons
                    name="id-card"
                    size={25}
                    color={'#fff'}
                  />
                </View>
                <TextInput
                  className="text-base px-5 text-white"
                  placeholder="Enter CNIC"
                  keyboardType="number-pad"
                  placeholderTextColor={'#fff'}
                  value={cnic}
                  onChangeText={handleCnicChange}
                />
              </View>
              {cnicError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {cnicError}
                </Text>
              ) : null}

              <View
                className="mb-5 shadow-md border-b-2 border-b-white
            ">
                <Picker
                  selectedValue={role}
                  onValueChange={handleRoleChange}
                  style={{color: 'white', left: 20}}>
                  <Picker.Item
                    label="Select Role"
                    value=""
                    style={{color: 'black'}}
                  />
                  <Picker.Item label="Citizen" value="citizen" />
                  <Picker.Item label="OIC" value="oic" />
                  <Picker.Item label="Police Station" value="policestation" />
                </Picker>
              </View>

              <View className="flex-1">
                {showBadgeField && (
                  <View className="flex-row border-b-2 border-b-white">
                    <View className="mt-[10px]">
                      <MaterialCommunityIcons
                        name="police-badge-outline"
                        size={30}
                        color={'white'}
                      />
                    </View>
                    <TextInput
                      className="text-base px-5 text-white"
                      placeholder="Badge(For OIC Only)!"
                      placeholderTextColor="white"
                      autoCapitalize="none"
                      value={badge}
                      onChangeText={handleBadgeChange}
                    />
                  </View>
                )}
              </View>

              <View className="flex-1">
                {showStationIdField && (
                  <View className="flex-row border-b-2 border-b-white">
                    <View className="mt-[10px]">
                      <MaterialCommunityIcons
                        name="police-station"
                        size={30}
                        color={'white'}
                      />
                    </View>
                    <TextInput
                      className="text-base px-5 text-white"
                      placeholder="Station ID(For Station Only)!"
                      placeholderTextColor="white"
                      autoCapitalize="none"
                      value={stationid}
                      onChangeText={handleStationIdChange}
                    />
                  </View>
                )}
              </View>

              {/* Button Start */}

              <TouchableOpacity
                className="flex-1 justify-center items-center p-5 top-5 rounded-lg mb-5"
                disabled={!isValidInput() || loading}
                style={[{backgroundColor: isValidInput() ? '#539165' : '#ccc'}]}
                onPress={handleSignup}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} /> // Show loader while loading
                ) : (
                  <Text className="text-white text-xl">Signup</Text> // Show login text when not loading
                )}
              </TouchableOpacity>

              {/* Button End */}
            </View>

            {/* Extra */}

            <View className="flex-1 flex-row justify-around mt-8 mb-2">
              <View className="translate-y-4">
                <Text className="text-[#fff] text-[18px] font-bold">
                  Already have an account
                </Text>
              </View>
              <TouchableOpacity
                className="bg-secondary p-4 w-32 items-center rounded-xl"
                onPress={() => navigation.navigate('Login')}>
                <Text className="text-black font-extrabold text-[18px]">
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            {/* Extra */}

            {/* Form End */}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
