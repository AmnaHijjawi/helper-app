import React, { Component } from 'react';
import { Container, Content, Spinner, Input, Item, Form, Label, Row, Badge, Right } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import renderError from './Validation/RenderError';
import validate from './Validation/Validate_Wrapper';
var config = require('./Config.js')
export const { width: width, height: height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            phoneError: '',
            name: '',
            nameError: '',
            isRTL: this.props.isRTL,
            showProgress: true,
            errMsg: '',
            errorLogin: false,
        };
        this.goToPage = this.goToPage.bind(this);
    }
    goToPage(page, param) {

        this.props.navigation.navigate(page, param)


    }
    async signInHandler() {
        console.log("__ State__", this.state);

        let phoneError = validate('mobile', this.state.phone)

        this.setState({
            phoneError: phoneError,
        })
        if (!phoneError) {
            this.setState({ showProgress: true })
            try {
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'addUser',
                        phone: this.state.phone,
                        name:this.state.name,
                    })
                });

                let res = await response.json();
                this.setState({ showProgress: false })
                console.log("__ res__", res);
                if (res.error == 1) {
                    this.setState({ errorLogin: true, errMsg: res.errorMsg });
                } else {
                    this.setState({ errorLogin: false, errMsg: '' });


                    // await AsyncStorage.setItem('@Makdoos:userId', res.userId);
                    // await AsyncStorage.setItem('@Makdoos:name', res.userName);
                    // await AsyncStorage.setItem('@Makdoos:phone', res.phone);
                    // await AsyncStorage.setItem('@Makdoos:email', res.email);
                    this.redirectPage('ConfirmationCode', { info: res });


                }

                if (res.lgout == 1) {

                }
            } catch (error) {
                this.setState({ error: error });
            }



        }
    }
    redirectPage(redirectID, param) {
        this.props.navigation.navigate(redirectID, param);
    }
    render() {
        return (
            <Container>


                <Content style={{ margin: width * 0.1 }} >
                    <View style={{ marginTop: height * 0.1 }}>
                        <Image resizeMode='contain' style={{ alignSelf: 'center' }}
                            source={require('./images/Login.png')}
                        />

                    </View>

                    {this.state.errorLogin &&
                        <Text style={[styles.TextStyle, { textAlign: 'center', alignSelf: "center", fontSize: 11, color: 'red' }]}>{this.state, errMsg}</Text>
                    }
                    <View style={{ marginTop: height * 0.06 }}>
                      
                        <View style={{ flexDirection: 'row', borderColor: '#003F6D', borderBottomWidth: 1.5, }} >
                        {/* <Icon name='phone' style={{alignSelf:"center"}} size={20} color='#BB0000' /> */}
                        <Icon2 name='user' style={{alignSelf:"center"}} size={22} color='#BB0000' />

                            <Input style={{color:'#000000',  width:'70%'}}
                                onChangeText={(text) => this.setState({ name: text })}
                                returnKeyType={"next"}
                                value={this.state.phone}
                                blurOnSubmit={false}
                                placeholder={strings.name}
                                ref={(c) => this.phone = c}
                                onBlur={() => { this.setState({nameError: validate('mobile', this.state.phone, this.state.isRTL) }); }}
                            />
                        </View>


                        {renderError(this.props.isRTL, this.state.phoneError)}

                        <View style={{ flexDirection: 'row', borderColor: '#003F6D', borderBottomWidth: 1.5, }} >
                        <Icon name='phone' style={{alignSelf:"center"}} size={20} color='#BB0000' />
                        {/* <Icon name='user' style={{alignSelf:"center"}} size={22} color='#BB0000' /> */}

                            <Input style={{color:'#000000',  width:'70%'}}
                                onChangeText={(text) => this.setState({ phone: text })}
                                returnKeyType={"next"}
                                value={this.state.phone}
                                blurOnSubmit={false}
                                placeholder={strings.PhoneNumber}
                                ref={(c) => this.phone = c}
                                onBlur={() => { this.setState({ phoneError: validate('mobile', this.state.phone, this.state.isRTL) }); }}
                            />
                            <Text style={[{alignSelf:"center",fontSize:18,color:'#707070'}]}>+962</Text>
                        </View>


                        {renderError(this.props.isRTL, this.state.phoneError)}


                    </View>

                    <TouchableOpacity style={[styles.TextStyle, { borderRadius: 20, marginTop: height * 0.1, backgroundColor: '#BB0000', flexDirection: "row", justifyContent: 'center' }]} onPress={() => this.signInHandler()}>
                        <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32 }]}>{strings.ConfirmPhoneNumber}</Text>
                        <IconMaterial style={{ color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32, paddingHorizontal: 7 }} name={backBtn} size={23} />
                    </TouchableOpacity>

                </Content>
            </Container>
        )
    }
}


