import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import Fonts from '../assets/Font';
import Themes from '../assets/Theme';
import * as Keychain from 'react-native-keychain';
import * as setActions from '../reduxActions/ApplicationActions';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import Styles from '../styleSheets/LoginStyle';
import GlobalStyles from '../styleSheets/GlobalStyles';
import {readData, saveData} from '../utils/LocalStorage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '103994216528-fp1ii0bfbsk4hrccafv1p53pgnc7tjcg.apps.googleusercontent.com',
});
export default function HomeScreen({navigation, route}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetails);
  let [email, setEmail] = useState();
  let [stages, setStages] = useState(1);
  let [loader, setLoader] = useState(true);
  const ongoogle = async () => {
    saveData('googlelogin', '');
    saveData('googleloginid', '');
    try {
      const signout = GoogleSignin.signOut();

      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      alert(error);
    }
  };
  const logout = async () => {
  
    readData('emaillogin').then(async(_val) => {
      if (_val == 'login') {
        const user = await auth()
          .signOut(email)
          .catch(e => {
            alert(e.code);
          });

        if (user == undefined) {
          dispatch(setActions.logOutData());
          Keychain.resetGenericPassword();
          saveData('emaillogin', '');
          dispatch(setActions.logout());
          navigation.dispatch(StackActions.replace('Login'));
        }
      }
    });
    readData('googlelogin').then(_val => {
      if (_val == 'login') {
        ongoogle();
      } else {
        setStages(3);
      }
    });
  };
  useEffect(() => {
    if (userData.data != undefined) {
      setLoader(false);
      setEmail(userData.data.user.email);
      if (!userData.data.additionalUserInfo.isNewUser) {
        setStages('Login SuccessFull');
      } else {
        setStages('SignUp SuccessFull');
      }
    }
  });
  return (
    <>
      <SafeAreaView style={Styles.splash_container}>
        {loader ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={Theme.nav_active} />
          </View>
        ) : (
          <View style={GlobalStyles.screen_container}>
            <LinearGradient
              colors={[
                Themes.linear_gradient_end,
                Themes.linear_gradient_start,
              ]}
              style={Styles.login_background1}>
              <Text
                style={[Fonts.header_large_title_1, GlobalStyles.text_align]}>
                {stages}
              </Text>
            </LinearGradient>
            <View style={Styles.login_background2} />

            <Text style={[Fonts.header_large_title_1, GlobalStyles.text_align]}>
              Welcome,
            </Text>
            <Text style={[Fonts.header_large_title_1, GlobalStyles.text_align]}>
              {email}
            </Text>

            <View style={Styles.login_btn} accessible={true}>
              <Button
                id="Login_SignIn"
                accessibilityLabel="Login_SignIn"
                onPress={() => {
                  logout();
                }}
                title="Logout"
                blurOnSubmit={true}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
