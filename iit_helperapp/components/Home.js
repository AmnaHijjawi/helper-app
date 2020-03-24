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


    async getData() {
        var theId = await AsyncStorage.getItem('@Helper:userId');

        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'getUserInfo',
                    userId: theId,
                })
            });

            let res = await response.json();
            //    if(res.result.features){
            this.setState({ type: res.result.features })
            //    }
        } catch (error) {
            this.setState({ error: error });
        }

    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <Container>
                <Content>
                {(this.state.type == 0 || this.state.type == '') && <TouchableOpacity onPress={() => {
                    this.goToPage('VolunteerForm', {})
                }}
                    style={{ justifyContent: "center", width: width, height: height * 0.43 }} >
                    <Image style={{ alignSelf: 'center',height: height * 0.43}} resizeMode='cover' source={require('./images/volunteer.png')} />
                </TouchableOpacity>
                }
                {this.state.type != 0 &&
                    <TouchableOpacity onPress={() => {
                        this.goToPage('Services', {})
                    }}
                        style={{ justifyContent: "center", width: width, height: height * 0.43 }} >
                        <Image style={{ alignSelf: 'center', height: height * 0.43 }} resizeMode='cover' source={require('./images/volunteer.png')} />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={() => {
                        this.goToPage('NeedHelpForm', {})
                    }}
                    style={{ flexDirection: 'column', justifyContent: "center", width: width, height: height * 0.4 }} >
                    <Image resizeMode='center' style={{ alignSelf: 'center', height: height * 0.4 }} source={require('./images/needHelp.png')} />

                </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}


