import React, { Component } from 'react';
import { Container, Footer, Content, Textarea, Spinner, Input, Item, Form, Label, Row, FooterTab, Badge } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert
} from 'react-native';
import { StandardButton } from './ToBeReused'
var config = require('./Config.js')
export const { width: width, height: height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRTL: this.props.isRTL,
            showProgress: true,
        };
        this.goToPage = this.goToPage.bind(this);
    }
    goToPage(page, param) {

        this.props.navigation.navigate(page, param)


    }
    render() {
        return (
            <Container>
                <TouchableOpacity onPress={()=>{
                    this.goToPage('VolunteerForm',{})
                }}
                 style={{ justifyContent:"center", width:width,height:height*0.47}} >
                    <Image style={{alignSelf:'center'}} resizeMode='contain' source={require('./images/volunteer.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    this.goToPage('NeedHelpForm',{})
                }}
                style={{ flexDirection:'column', justifyContent:"center",width:width,height:height*0.47}} >
                <Image resizeMode='contain' style={{alignSelf:'center'}}  source={require('./images/needHelp.png')} />

                </TouchableOpacity>
            </Container>
        )
    }
}


