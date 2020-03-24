import React, { Component } from 'react';
import { Container, Content, Spinner, Input, Item, Form, Label, Row, Badge, Right } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
var config = require('./Config.js')
export const { width: width, height: height } = Dimensions.get('window');
export default class ContactUsSuccessMSG extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    goToPage(page, param) {

        this.props.navigation.navigate(page, param)
    }
    componentDidMount() {
    }

    render() {
        return (
            <Container>
                <View style={{ top: height * 0.3 }}>
                    <Image style={{ resizeMode: 'contain', marginHorizontal: width * 0.35 }}
                        source={require('./images/Success.png')}
                    />
                </View>
                <View style={{ top: height * 0.3, marginTop: 25 }}>
                    <Text style={[styles.TextStyle, { alignSelf: 'center', fontSize: 20, color: '#717171' }]}>{strings.YourMessageHasBeenSent} ،</Text>
                    <Text style={[styles.TextStyle, { alignSelf: 'center', fontSize: 20, color: '#717171', paddingHorizontal: 35, paddingTop:10, textAlign:"center" }]}>{strings.ContactUsMSGDescription} .</Text>
                </View>
                <Content style={{ top: height * 0.3, marginTop: 20, marginHorizontal: '20%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.TextStyle, styles.loginBTN, { flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.55, height: height * 0.05, paddingVertical: 3 }]} onPress={() => this.goToPage('Home')}>
                            <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32 }]}>{strings.Home}</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}

