
import {StackActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {Image, ActivityIndicator, Platform,Text, View,SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import * as setActions from '../reduxActions/ApplicationActions';
import Theme from '../assets/Theme';
import Style from '../styleSheets/LoginStyle';
import Fonts from '../assets/Font';
import Button from '../components/Button';
import Error from '../components/ErrorMessage';
import GlobalStyles from '../styleSheets/GlobalStyles';
import * as Keychain from 'react-native-keychain';
import {readData, saveData} from '../utils/LocalStorage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '103994216528-fp1ii0bfbsk4hrccafv1p53pgnc7tjcg.apps.googleusercontent.com',
});
export default function SplashScreen({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errorResponse, seterrorResponse] = useState(null);
  let [stages, setStages] = useState(0);
  let [loader, setLoader] = useState(false);
  
  const movescreen = screen => {
    console.log("setTimeout", screen)
    // setTimeout(() => {
     
      navigation.dispatch(StackActions.replace(screen));
    // }, 200);
  };
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetails);
  useFocusEffect(
    React.useCallback(() => {
      console.log("n u")
          
    }, []),
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

      navigation.dispatch(StackActions.replace('HomeScreen'));
    }
  };
  const signin = async (emails,passwords) => {   
     
    try {
      setStages(2)
      setLoader(true)
      const resigin = await auth()
        .signInWithEmailAndPassword(emails, passwords)
        .catch(error => {    
          setLoader(false)
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
              dispatch(setActions.getLoginDataError(error.code));
              seterrorResponse('Cant signin Something went wrong');
          }
        });
        console.log("email2",resigin)      
        if(resigin != undefined){

          dispatch(setActions.getLoginDataSuccess(resigin));       
             
        }else{
          setStages(3)
        }
       
    } catch (error) {
      console.log(error)
      alert("Splash",error);
    }
  };
  const checkUserStatus = async () => {    
    const credentials = await Keychain.getGenericPassword();   
    if (credentials != undefined) {
      console.log("email",credentials) 
          
      signin(credentials.username,credentials.password)      
    } else {
      setStages(3)
    }
  };

  useEffect(() => {
    console.log("stages",stages)      
   if(stages == 1){
     
    readData('emaillogin').then(_val => {
      if(_val == 'login'){         
        console.log("email")      
        checkUserStatus();        
      }else{
        readData('googlelogin').then(_val => {
          if(_val == 'login'){         
                 
            ongoogle();        
          }else{
            setStages(3)
          }
         });
      }
     }); 
      


   }
   
    if(stages == 2 && userData.data != undefined){
      console.log("userData",stages)
      if (userData.data != undefined){
        console.log("userData1",stages)
         movescreen('HomeScreen');
      }else if(userData.errordata != undefined ){
        seterrorResponse("Please Signin again")
        setStages(3);
      }
    }

    if(stages == 3){
      movescreen('Login')
    }
    
       
  });
  return (
  
    
      <SafeAreaView style={Style.splash_container}>     
          <Image
            source={require('../assets/images/logo.png')}
            style={Style.splash_img}
          /> 
           {!loader && (
             <>
           <View style={Style.login_btn} accessible={true}>
              <Button
                id="Login_SignIn"
                accessibilityLabel="Login_SignIn"
                disable={false}
                onPress={() => {seterrorResponse(null);
                  dispatch(setActions.getLoginData());
                  setStages(1)
                }}
                title="Sign In"
                blurOnSubmit={true}
              />
            </View>
            <View style={Style.login_btn} accessible={true}>
              <Button
                id="Login_SignIn"
                accessibilityLabel="Login_SignIn"
                disable={false}
                onPress={() => {seterrorResponse(null);
                  dispatch(setActions.getLoginData());
                  setStages(3)
                }}
                title="Sign up"
                blurOnSubmit={true}
              />
            </View>
            </>)}
          {loader && (
           <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
           }}>
           <Text style={Fonts.body_normal_small}>
             signing in..
           </Text>
           <ActivityIndicator
             size="large"
             color={Theme.nav_active}
           />
         </View>
          )}
           {errorResponse != null && <Error message={errorResponse} />}
         
       
      </SafeAreaView>
      
    
  );
}
