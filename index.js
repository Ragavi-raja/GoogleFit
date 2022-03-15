
import {AppRegistry} from 'react-native';
import React from 'react';
import App from '~App';
import {name as appName} from './app.json';
import configureStore from '~reduxReducers';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
const store = configureStore();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
