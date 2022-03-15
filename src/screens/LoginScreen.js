import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '103994216528-fp1ii0bfbsk4hrccafv1p53pgnc7tjcg.apps.googleusercontent.com',
});
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
} from 'react-native';
import * as setActions from '../reduxActions/ApplicationActions';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Fonts from '../assets/Font';
import Themes from '../assets/Theme';
import Button from '../components/Button';
import Error from '../components/ErrorMessage';
import TextInput from '../components/TextInput';
import GlobalStyles from '../styleSheets/GlobalStyles';
import Styles from '../styleSheets/LoginStyle';
import {saveData} from '../utils/LocalStorage';
import * as Keychain from 'react-native-keychain';
export default function LoginScreen({navigation, route}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const passwordFocus = useRef();
  let [errorResponse, seterrorResponse] = useState(null);
  let [loader, setLoader] = useState(false);
  let [enable, setEnable] = useState(true);
  let [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetails);
  const emailValidator =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = () => (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={toggleSecureEntry}
      style={Styles.eye_wrapper}>
      {secureTextEntry ? (
        <Image
          source={require('../assets/images/Password_Show.png')}
          styl={Styles.eye_icon}
        />
      ) : (
        <Image
          source={require('../assets/images/Password_Hide.png')}
          style={Styles.eye_icon}
        />
      )}
    </TouchableWithoutFeedback>
  );
  const ongoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    const gsgup = await auth()
      .signInWithCredential(googleCredential)
      .catch(e => {
        seterrorResponse('error', e.code);
        dispatch(setActions.getLoginDataError(e.code));
      });
      console.log(gsgup)
    if (gsgup != undefined) {
      
      dispatch(setActions.getLoginDataSuccess(gsgup));
      saveData('googlelogin', 'login');
      saveData('googleloginid', idToken);

     
    }
  };
  const signin = () => {
    try {
      const resigin = auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/wrong-password':
              dispatch(setActions.getLoginDataError(error.code));
              seterrorResponse('Wrong Password');
              break;
            case 'auth/too-many-requests':
              dispatch(setActions.getLoginDataError(error.code));
              seterrorResponse('Too many requests');
              break;
            default:
              dispatch(
                setActions.getLoginDataError(
                  'Cant signin Something went wrong',
                ),
              );
              seterrorResponse('Cant signin Something went wrong');
          }
        });
      resigin.then(value => {
        if (value != undefined) {
          Keychain.setGenericPassword(email, password);
          dispatch(setActions.getLoginDataSuccess(value));
          saveData('emaillogin', 'login');

          
        }
      });
    } catch (error) {
      alert(error);
    }
  };
  const onLoginPressed = () => {
    setLoader(true);
    if (emailValidator.test(email) && password != '') {
      try {
        const check = auth()
          .createUserWithEmailAndPassword(email, password)

          .catch(error => {
            switch (error.code) {
              case 'auth/weak-password':
                dispatch(setActions.getLoginDataError(error.code));
                seterrorResponse('Weak Password');
                break;
              case 'auth/email-already-in-use':
                signin();
                break;
              default:
                dispatch(setActions.getLoginDataError('Something Went Wrong'));
                seterrorResponse('Something Went Wrong');
            }
          });
        check.then(val => {
          saveData('login', 'login');
          Keychain.setGenericPassword(email, password);

          dispatch(setActions.getLoginDataSuccess(val));
          
        });
      } catch (error) {
        seterrorResponse(error);
      }
    }
  };
  const setPasswordFocus = () => {
    if (emailValidator.test(email)) {
      passwordFocus.current.focus();
    }
  };
  useEffect(() => {
    if (emailValidator.test(email) && password != '') {
      setEnable(false);
    } else {
      setEnable(true);
    }
    if (userData.data != undefined) {
      navigation.dispatch(StackActions.replace('HomeScreen'));
    }
    


  });

  return (
    <>
      <SafeAreaView style={Styles.splash_container}>
        <View style={GlobalStyles.screen_container}>
          <LinearGradient
            colors={[Themes.linear_gradient_end, Themes.linear_gradient_start]}
            style={Styles.login_background1}></LinearGradient>

          <View style={Styles.login_background2} />
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}>
            <View accessible={true} style={Styles.login_wrapper}>
              <View style={Styles.login_header}>
                <Text style={Fonts.header_title_1}>Sign Up</Text>
              </View>
              <View style={Styles.login_message}>
                <Text
                  style={[Fonts.title_normal_medium, GlobalStyles.text_align]}>
                  Please Fill All Fields to Sign Up.
                </Text>
              </View>
              {errorResponse != null && <Error message={errorResponse} />}
              <View style={Styles.login_input} accessible={true}>
                <TextInput
                  id="Login_email"
                  accessibilityLabel="Login_email"
                  value={email}
                  sub_place="EMAIL ADDRESS"
                  placeholder="Email Address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCompleteType="email"
                  enablesReturnKeyAutomatically={true}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  onChangeText={value => setEmail(value)}
                  onChange={() => seterrorResponse(null)}
                  onSubmitEditing={() => setPasswordFocus()}
                  blurOnSubmit={false}
                />
              </View>
              <View style={Styles.login_input} accessible={true}>
                <TextInput
                  id="Login_password"
                  accessibilityLabel="Login_password"
                  value={password}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    if (password != '') {
                      onLoginPressed();
                    }
                  }}
                  enablesReturnKeyAutomatically={false}
                  placeholder="Password"
                  sub_place="PASSWORD"
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={value => setPassword(value)}
                  onChange={() => seterrorResponse(null)}
                  blurOnSubmit={false}
                  ref={passwordFocus}
                />
              </View>
              <View style={Styles.login_btn} accessible={true}>
                <Button
                  id="Login_SignIn"
                  accessibilityLabel="Login_SignIn"
                  disable={enable}
                  onPress={() => {
                    seterrorResponse(null);
                    dispatch(setActions.getLoginData());
                    onLoginPressed();
                  }}
                  title="Sign In"
                  blurOnSubmit={true}
                />
              </View>
              <View style={Styles.login_btn} accessible={true}>
                <Button
                  id="Login_SignIn"
                  accessibilityLabel="Login_SignIn"
                  onPress={() => {
                    seterrorResponse(null);
                    dispatch(setActions.getLoginData());
                    ongoogle();
                  }}
                  title="Google Sign In"
                  blurOnSubmit={true}
                />
                <Text
                  style={[Fonts.title_normal_medium, GlobalStyles.text_align]}>
                  For Sigin using Google id
                </Text>
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </>
  );
}
