import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions } from 'react-native';
export const { width: width, height: height } = Dimensions.get('window');
import firebase from 'react-native-firebase';
import type, { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';
var config = require('./Config.js')
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart'


let pushNote;
export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loginStatus: false,
      forgetPassword: false,
      error: '',
      noticFunc: 0,
      first: 1,
      value: '',


    };
    pushNote = 0
  }



  async checkPushToken() {
    const pushNotesVal = await AsyncStorage.getItem('@Helper:pushNotes');
    if (pushNotesVal !== null && pushNotesVal != '') {
      pushNote = pushNotesVal;
    }
    console.log('test', pushNote)
    // pushNote=0
    if (pushNote == '0') {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        // user doesn't have permission
        try {
          await firebase.messaging().requestPermission();
          this.getToken();
        } catch (error) {
          // User has rejected permissions
        }
      }
    }


  }
  async getToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      this.onPushRegistered(fcmToken);
    } else {
      // user doesn't have a device token yet
    }
  }
  async onPushRegistered(deviceToken) {
    console.log("Device Token Received", deviceToken);
    try {
      let response = await fetch(config.PUSH_NOTES_DOMAIN + '/pushNotification/token.php?type=saveToken', {
        method: 'POST',
        body: JSON.stringify({
          token: deviceToken,
          app: config.APP_NAME,
          os: Platform.OS
        })
      });

      let res = await response.json();
      console.log("************  ", res)
      if (response.status >= 200 && response.status < 300) {
        if (res.result == '1') {
          try {
            await AsyncStorage.setItem('@Helper:pushNotes', '1');
            await AsyncStorage.setItem('@Helper:deviceToken', deviceToken);
          } catch (error) {
            this.setState({ error: error });
          }
        }
      } else {
        this.setState({ error: res });
      }
    } catch (error) {
      this.setState({ error: error });
    }
  }





  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.onTokenRefreshListener();

  }






  // handleNotification(functionName, id, data) {
  //   var navigator = this.props.navigator;
  //   console.log("functionName:", functionName + "#" + id);
  //   console.log("navigator: ", navigator);
  //   // Alert.alert(
  //   //   data._title,
  //   //   data._body,
  //   //   [

  //   //     { text: 'ok', onPress: () => console.log('1') },
  //   //   ],
  //   //   { cancelable: false }
  //   // )
  //   navigator.navigate(functionName, { id: id });
  // }
  // handleOpenURL = (event) => { // D
  //   this.navigate(event.url);
  // }




 async componentDidMount() {
    if (Platform.os == 'android'){
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    }
    this.checkPushToken();

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh((fcmToken: string) => {
      this.onPushRegistered(fcmToken);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      //     // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      //     // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;

      //     // if (Platform.OS === 'ios') {
      //     //     notification.ios.setBadge(0);
      //     // }

      // this.handleNotification(notification._data.functionName, notification._data.id, notification);
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {

    });


    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {

      const channelId = new firebase.notifications.Android.Channel("Default", "Default", firebase.notifications.Android.Importance.High);
      firebase.notifications().android.createChannel(channelId);

      let notification_to_be_displayed = new firebase.notifications.Notification({
        data: notification.data,
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body,

      });

      if (Platform.OS == "android") {
        notification_to_be_displayed
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setChannelId("Default")
          .android.setVibrate(1000);
      }

      firebase.notifications().displayNotification(notification_to_be_displayed);

    });
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      // Process your message as required
    });
    firebase.notifications().getInitialNotification().then((data: NotificationOpen) => {
      // firebase.notifications().getInitialNotification((notification: NotificationOpen) => {

      if (data) {

        // this.handleNotification(data.notification._data.functionName, data.notification._data.id, data.notification._title, data.notification._body)   // 2nd parameter can be useful
      }

    })

  }


  UNSAFE_componentWillMount() {
    this.loginInterval = setInterval(() => {
      this.renderLoading();
    }, 3000);
  }

  async renderLoading() {

   var theId = await AsyncStorage.getItem('@Helper:userId');
    if (theId != null) {
      var redirectID = 'Home'
    }
    else {
      var redirectID = 'Login'
    }
    var firstOpen = await AsyncStorage.getItem('@Helper:firstOpen');
    if (firstOpen == null) {
      if (!RTL) {
        I18nManager.forceRTL(true);
        RNRestart.Restart();
      }
      await AsyncStorage.setItem('@Helper:firstOpen', '1');
    }
    // var redirectID = 'VolunteerForm'
    clearInterval(this.loginInterval);
    // value = await AsyncStorage.getItem('@Helper:noticFlag');

    this.props.navigation.navigate(redirectID, {});
    // this.props.navigation.navigate


  }


  render() {

    return (
      <View style={[styles.splashScreenStyle]} >
      <Image style={{ alignSelf: 'center' }}

        source={require('./images/sp.png')}
      />
    </View>


    )
  }
}
