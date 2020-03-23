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
    });

    return styles;
  }
}
