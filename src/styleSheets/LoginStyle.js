import {StyleSheet, Dimensions} from 'react-native';
import Themes from '../assets/Theme';

export default StyleSheet.create({
  splash_container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: Themes.linear_gradient_start,
  },
  // splash_statusbar: {
  //   flex: 0,
  //   backgroundColor: Themes.linear_gradient_end,
  // },
  splash_img: {   
    alignSelf: 'center',
   
  },
  /* container: {
    flex: 1,
    backgroundColor: '#FFFF',
    height: '100%',
  }, */
  login_scroll: {
    flexGrow: 1,
  },
  login_background1: {
    height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  login_background2: {
    width: 0,
    height: 0,
    borderTopWidth: 100,
    borderTopColor: '#137AC9',
    borderLeftColor: 'transparent',
    borderLeftWidth: Dimensions.get('window').width / 2,
    borderRightColor: 'transparent',
    borderRightWidth: Dimensions.get('window').width / 2,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  login_evolve_img: {
    width: 172,
    height: 48,
    marginBottom: 47,
  },
  login_wrapper: {
    /* flex: Platform.OS === 'ios' ? 3 : 5, */
    backgroundColor: Themes.background_primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginHorizontal: 24,
    marginTop: -147,
    flex: 1,
    flexDirection: 'column',
  },
  login_header: {
    width: '100%',
    marginTop: 31,
    alignItems: 'center',
  },
  login_message: {
    margin: 24,
    textAlign: 'center',
    alignItems: 'center',
  },
  login_input: {
    height: 76,
    width: '100%',
    margin: 0,
  },
  login_btn: {
    marginTop:30,
    marginHorizontal: 30,
   
  },
  login_error_alert: {
    marginTop: 24,
  },
  login_nav: {
    alignItems: 'center',
  },
  login_footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 16,
  },
  face_image: {
    width: 64,
    height: 64,
    alignSelf: 'center',
  },
  touch_image: {
    width: 47,
    height: 64,
    alignSelf: 'center',
  },
  email_image: {
    width: 59.9,
    height: 60,
    alignSelf: 'center',
    marginTop: 120,
    marginBottom: 2,
  },
  evolveimage: {
    width: 220,
    height: 60,
  },
  
  eye_wrapper: {
    height: 24,
    width: 30,
    paddingLeft: 10,
    paddingTop: 10,
  },
  eye_icon: {
    height: 14,
    width: 20,
  },
});
