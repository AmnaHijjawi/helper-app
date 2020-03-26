import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Dimensions, PixelRatio, I18nManager, Platform

} from 'react-native';
export const { width: width, height: height } = Dimensions.get('window');

// import strings from '../Translation.js';
import { viewportWidth } from '../ToBeReused.js';
import { viewportHeight } from '../AppNavigation.js';
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
export default class MainStyle extends Component {
  static returnStyles(IS_RTL) {
    // alert(strings.FontFamilybold)
    var styles = StyleSheet.create({

      //// waheed 
      TextStyle: {
        color:'#000000',
        textAlign: 'left',
        fontFamily: strings.FontFamily,
      },

      loginBTN: {
        backgroundColor: '#BB0000',
        borderRadius: 20,
        width: width * 0.65,
        height: 35,
        textAlign: 'center',
      },
      profileBTN: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: width * 0.65,
        height: 35,
        textAlign: 'center',
        borderColor: '#BB0000',
        borderWidth: 1.5
      },
      confirmBTN: {
        backgroundColor: '#BB0000',
        borderRadius: 20,
        width: width * 0.65,
        height: 35,
        textAlign: 'center',
      },
      modalContainer1: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

      },
      modalContainer2: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width * 0.88,
        maxHeight: height * 0.9,
        alignItems: 'center'
      },
      splashScreenStyle: {
        backgroundColor: '#BB0000',
        width: width,
        height: height,
        alignSelf: 'center',
        justifyContent: 'center'
      },
      circle: {
        width: 52,
        height: 52,
        borderRadius: 40,
        marginLeft: 15,
        backgroundColor: '#F1F1F1',
        color: '#003F6D',
        textAlign: "center",
        fontSize: 26,
      },
      circleFocus: {
        backgroundColor: '#FDE7E8',
        borderWidth: 1,
        borderColor: '#BB0000',
      },
      volunteerTextAreaInput: {
        fontSize: 15,
        color: 'black',
        padding: 10,
        textAlign: 'right',
        borderRadius: 4,
        backgroundColor: 'white'
      },
      volunteerCheckboxLableStyle: {
        paddingRight: 15,
        color: '#707070'
      },
      volunteerActiveField: {
        backgroundColor: '#FDEDED'
      },

      errorMsg: {
        fontFamily: strings.FontFamily,

        color: '#FFF',
        fontSize: 15,
        backgroundColor: '#CC0000',
        marginBottom: 10,
        textAlign: IS_RTL ? 'right' : 'left',
        padding: 4,
      },

      loader: {
        // position : 'absolute',
        // top : 20,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: 70,
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        left: '50%',
        marginLeft: -35,
        top: height * 0.36,
        // top: 10,
        bottom: 0,
        marginTop: -35,
        zIndex: 10,
      },
      modalContainer1: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

      },
      modalContainer2: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width * 0.88,
        maxHeight: height * 0.9,
        alignItems: 'center'
      },
      brancheBox: {
        // padding: 5,
        margin: 10,
        alignSelf: "center",
        width: width * 0.8,
        // height: height * 0.5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 36,
        shadowColor: "#000",


        elevation: 4,
      },
    });

    return styles;
  }
}
