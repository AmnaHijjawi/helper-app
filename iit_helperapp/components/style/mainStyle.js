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
        textAlign: 'left',
        fontFamily: strings.FontFamily,
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
        backgroundColor:'#FDE7E8',
        borderWidth: 1,
        borderColor: '#BB0000',
      },
      errorMsg: {
        color: '#FFF',
        fontSize: 15,
        backgroundColor: '#CC0000',
        marginBottom: 10,
        textAlign: IS_RTL ? 'right' : 'left',
        lineHeight: 30,
        paddingBottom: 10,
        paddingHorizontal: 10
      },
      brancheBox: {
        // padding: 5,
        margin: 10,
        alignSelf: "center",
        width: width * 0.8,
        // height: height * 0.5,
        overflow:'hidden',
        backgroundColor: '#fff',
        borderRadius: 36,
        shadowColor: "#000",
   

        elevation: 4,
      },
    });

    return styles;
  }
}
