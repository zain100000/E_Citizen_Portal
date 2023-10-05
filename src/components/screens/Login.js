import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
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

  const handleLogin = async () => {
    try {
      setLoading(true);
      const authCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = authCredential.user;

      // Fetch user data from Firebase Realtime Database
      const userSnapshot = await database()
        .ref(`users/${user.uid}`)
        .once('value');
      const userData = userSnapshot.val();

      if (userData) {
        const role = userData.role;
        if (role === 'citizen') {
          navigation.navigate('CitizenHome');
        } else if (role === 'oic') {
          navigation.navigate('OICHome');
        } else if (role === 'policestation') {
          navigation.navigate('PoliceHome');
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Validations

  const isValidInput = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);

    return isEmailValid && isPasswordValid;
  };

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

  // Validations

  const handleResetPassword = async () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent successfully');
      })
      .catch(error => {
        alert('Error sending password reset email:', error);
      });
  };

  return (
    <ImageBackground
      source={require('../../assets/login_bg.jpg')}
      className="w-full h-full object-cover">
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="flex-1 items-center mt-[80px]">
            <Text className="text-white text-4xl mb-5">Login</Text>
            <Text className="text-gray-300 text-[20px]">
              Please Login to Continue
            </Text>
          </View>

          <Animated.View
            style={[
              styles.container,
              {transform: [{translateY: formTranslateY}]},
            ]}>
            {/* Form Start */}

            <View className="flex-1 mt-20 w-full px-3">
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
                  placeholder="Enter Email"
                  placeholderTextColor={'#fff'}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={handleEmailChange}
                />
              </View>
              {emailError ? (
                <Text className="text-red-600 text-[18px] left-3 font-bold">
                  {emailError}
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

              {/* Forget Password */}
              <View className="flex-1 mt-8 px-2">
                <TouchableOpacity onPress={handleResetPassword}>
                  <Text className="text-[20px] text-white font-bold">
                    Forget Password ?
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Forget Password */}

              {/* Button Start */}

              <TouchableOpacity
                className="flex-1 justify-center items-center p-5 top-5 rounded-lg"
                disabled={!isValidInput() || loading}
                style={[{backgroundColor: isValidInput() ? '#539165' : '#ccc'}]}
                onPress={handleLogin}>
                {loading ? (
                  <ActivityIndicator color={'#fff'} /> // Show loader while loading
                ) : (
                  <Text className="text-white text-xl">Login</Text> // Show login text when not loading
                )}
              </TouchableOpacity>

              {/* Button End */}
            </View>

            {/* Extra */}

            <View className="flex-1 flex-row justify-around mt-10">
              <View className="translate-y-4">
                <Text className="text-white text-[18px] font-bold">
                  Didn't have an account
                </Text>
              </View>
              <TouchableOpacity
                className="bg-secondary p-4 w-32 items-center rounded-xl"
                onPress={() => navigation.navigate('Signup')}>
                <Text className="text-black font-extrabold text-[18px]">
                  Signup
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
