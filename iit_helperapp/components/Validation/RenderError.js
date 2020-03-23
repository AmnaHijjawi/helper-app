import React, {Component} from 'react';
import MainStyle from '../style/mainStyle';
import {
  Text,
} from 'react-native';

let styles = null;


export default function renderError(isRTL , errorMsg) {
  styles = MainStyle.returnStyles(isRTL);
    if (errorMsg != '' && errorMsg != null) {
           return (
               <Text style={[styles.errorMsg]}>{errorMsg}</Text>
           );
       } else{
           return null;
       }
}
