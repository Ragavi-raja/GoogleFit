import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Image,  Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Themes from './assets/Theme';
import {default as mapping} from '../src/mapping.json';
import SplashScreen from '@screens_SplashScreen';
import HomeScreen from '@screens_HomeScreen';
import LoginScreen from '@screens_LoginScreen';
import messaging from '@react-native-firebase/messaging';
const {Navigator, Screen} = createNativeStackNavigator();
const TabTheme = {
  dark: false,
  colors: {
    primary: Themes.alert_info,
    background: Theme.background_primary,
    card: Theme.background_primary,
    text: Themes.text_primary,
    border: Themes.border_shadow,
    notification: Themes.alert_error,
  },
};
function HomeNavigator({route, navigation}) {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Themes.background_secondary}
        barStyle={'dark-content'}
      />
      <Navigator initialRouteName="HomeBottom">
       
        <Screen
          name="Settings"
          component={Settings}
          options={{
            title: '',
            headerShown: true,
            headerLeft: () => headerNavigateBack(navigation, false),
            headerStyle: {
              backgroundColor: Themes.background_primary,
            },
            headerTintColor: Themes.text_headline,
            // headerTitleStyle: Fonts.header_title_2,
          }}
        />
        <Screen
          name="HomeQA"
          component={HomeQAScreen}
          header="null"
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Screen
          name="HomeQASuccess"
          component={HomeQASuccessScreen}
          header="null"
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Screen
          name="PhysicalActivityAdd"
          component={PhysicalActivityAddScreen}
          header="null"
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          header="null"
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Screen
          name="SelectedDeviceScreen"
          component={SelectedDeviceScreen}
          header="null"
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Screen
          name="ChangeEmailScreen"
          component={ChangeEmailScreen}
          header="null"
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Screen
          name="PhysicalActivityConfirm"
          component={PhysicalActivityConfirmScreen}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
    
      
     
        
      
      
      

       
        
      
      
      
      
      
     
      </Navigator>
    </>
  );
}
const AppNavigator = () => (
  <>
    {/* <StatusBar
      animated={true}
      backgroundColor={Themes.linear_gradient_end}
      barStyle={'light-content'}
    /> */}
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">     
      <Screen name="Splash" component={SplashScreen} header="null" />    
      <Screen name="Login" component={LoginScreen} header="null" />
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  </>
);
const setupCloudMessaging = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
};
const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    global.deviceToken = fcmToken;
  } else {
    global.deviceToken = '';
  }
};
function App(props) {
  setupCloudMessaging();
  
  useEffect(() => {
    return messaging().onMessage(async remoteMessage => {
      /* Used for indicating new messages */
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);
  return (
    <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
      <NavigationContainer  
       theme={TabTheme}    
        onStateChange={props.onStateChange}
        onReady={props.onReady}>
        <AppNavigator />
      </NavigationContainer>
    </ApplicationProvider>  
    
  );
}
export default (App);