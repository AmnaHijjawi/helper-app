import React, { Component } from 'react';
import { Container, Footer, Content, FooterTab, Button, Textarea, Spinner, Input, Item, Title, Form, Label } from 'native-base';

import {
    StyleSheet, TouchableOpacity, Clipboard, TouchableHighlight, PermissionsAndroid,
    ToastAndroid, AlertIOS, Linking, Platform, I18nManager, ImageBackground,
    AppRegistry, Dimensions, TextInput, ScrollView, View, Image, Alert, Text
} from 'react-native';
var config = require('./Config.js')
import Strings from './Translation.js';
export const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';

import Colors from './style/Colors'
// import Sound from 'react-native-sound';
// import renderError from './Validation/RenderError';
// import validate from './Validation/Validate_Wrapper';
// import DropdownCustom from './plugins/DropDownCustom'

// import { AudioRecorder, AudioUtils } from 'react-native-audio';// Entypo home
//  MaterialCommunityIcons  chat-processing
//  Ionicons  ios-paper
// FontAwesome  user



