import React, { Component } from 'react';
import { Container, Content, Spinner, Input, Item, Form, Label, Row, Badge, Right } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import renderError from './Validation/RenderError';
import validate from './Validation/Validate_Wrapper';
var config = require('./Config.js');
export const { width: width, height: height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

export default class ConfirmationCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            c1: '',
            c2: '',
            c3: '',
            c4: '',
            isRTL: this.props.isRTL,
            isFocused: 0,
            // code: 0,
            error:false,
            info: props.navigation.getParam('info', { verify: 0 }),
            showProgress: true,
        };
        this.goToPage = this.goToPage.bind(this);
    }
    goToPage(page, param) {

        this.props.navigation.navigate(page, param)


    }
    redirectPage() {
        var redirectID = 'Home'
        this.props.navigation.navigate(redirectID, {});
    }
    onchangeInput(num, val) {
        if (num == 1 && val != '') {
            this.c2.focus();
            this.setState({ c1: val })
        } else if (num == 1 && val == '') {
            this.setState({ c1: val })

        }


        if (num == 2 && val != '') {
            this._xc.focus();
            this.setState({ c2: val })
        } else if (num == 2 && val == '') {
            this.setState({ c2: val })

        }


        if (num == 3 && val != '') {
            this._c4.focus();
            this.setState({ c3: val })
        } else if (num == 3 && val == '') {
            this.setState({ c3: val })
        }




        if (num == 4 && val != '') {
            this.setState({ c4: val })
        } else if (num == 4 && val == '') {
            this.setState({ c4: val })
        }
        if (this.state.c1 != '' && this.state.c2 != '' && this.state.c3 != '' && this.state.c4 != '') {
            this.confirm();
        }
    }
    async storePushTokenUser(userEmail) {
        const pushNotesVal = await AsyncStorage.getItem('@Helper:pushNotes');

        // if (pushNotesVal == '1') {
        const deviceToken = await AsyncStorage.getItem('@Helper:deviceToken');
        // deviceToken = '159754a4e018a942677a4ce799dce95052286e88db66ec97ba0a004c1fe484ba';
        console.log(deviceToken)
        try {
            let response = await fetch(config.PUSH_NOTES_DOMAIN + '/pushNotification/token.php?type=updateTokenUser', {
                method: 'POST',
                body: JSON.stringify({
                    token: deviceToken,
                    app: config.APP_NAME,
                    os: Platform.OS,
                    userId: userEmail
                })
            });

            let res = await response.json();

            if (response.status >= 200 && response.status < 300) {
                if (res.result == '1') {
                    try {
                        await AsyncStorage.setItem('@Helper:pushNotes', '2');
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
        // }
    }
    async confirm() {
        const codeByUser = this.state.c1 + this.state.c2 + this.state.c3 + this.state.c4

        console.log('entered code', codeByUser)
        console.log(' code', this.state.info.verify)
        if (codeByUser != "") {
            console.log('here1')
            if (codeByUser == this.state.info.verify) {
                // var name = this.state.info.fname + ' ' + this.state.info.lname
                await AsyncStorage.setItem('@Helper:userId', this.state.info.userId);
                await AsyncStorage.setItem('@Helper:name', this.state.info.name);
                await AsyncStorage.setItem('@Helper:phone', this.state.info.phone);
                // await AsyncStorage.setItem('@Helper:email', this.state.info.userEmail);
                var id = this.state.info.userId.split('-')
                this.storePushTokenUser(id[0])
                this.activate()
                // this.redirectPage()
                // alert('done')


            } else {

             
                this.setState({error:true, c1: '', c2: '', c3: '', c4: '' })
            }
        }

    }
    componentDidMount() {
    }
    async activate() {
        // this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'verify', 
                    userId: this.state.info.userId,

                })
            });

            let res = await response.json();
           

        } catch (error) {
            this.setState({ error: error });
        }
    }
    render() {
        return (
            <Container>
                <Content>
                <View style={{ marginTop: height * 0.1 }}>
                        <Image resizeMode='contain' style={{ alignSelf: 'center' }}
                            source={require('./images/Login.png')}
                        />

                    </View>

                    <View style={{ marginTop: height * 0.08, alignItems: 'center' }}>
                        <Text style={[styles.TextStyle, { fontSize: 19, color: '#636363' }]}>
                            {strings.EnterConfirmationCode}
                        </Text>
                        <Text style={[styles.TextStyle, { fontSize: 16, color: '#636363' }]}>
                            {strings.ConfirmationCodeSentBySMS}
                        </Text>
                        {this.state.error&&
                        <Text style={[styles.TextStyle, { marginTop:20, fontSize: 16, color: 'red' }]}>
                            {strings.inVaildCode}
                        </Text>}

                    </View>
                    <Item style={{ borderColor: 'white', flexDirection: RTL ? 'row-reverse' : 'row', justifyContent: 'center', alignSelf: 'center', width: width * 0.66, marginTop: height * 0.065 }}>

                        <TextInput maxLength={1} style={[styles.circle, this.state.isFocused == 1 && styles.circleFocus]}
                            returnKeyType={"next"}
                            keyboardType='numeric'
                            onChangeText={(text) => this.onchangeInput(1, text)}
                            value={this.state.c1}
                            blurOnSubmit={true}
                            onSubmitEditing={(event) => { this.c2._root.focus(); }}
                            onFocus={() => { this.setState({ isFocused: 1 }); }}
                            onBlur={() => { this.setState({ passwordError: validate('required', this.state.c1, this.state.isRTL), isFocused: '' }); }}
                        />
                        <TextInput maxLength={1} style={[styles.circle, this.state.isFocused == 2 && styles.circleFocus]}
                            returnKeyType={"next"}
                            keyboardType='numeric'
                            onChangeText={(text) => this.onchangeInput(2, text)}
                            value={this.state.c2}
                            blurOnSubmit={true}
                            onSubmitEditing={(event) => { this._xc._root.focus(); }}
                            ref={(c) => this.c2 = c}
                            onFocus={() => { this.setState({ isFocused: 2 }); }}
                            onBlur={() => { this.setState({ passwordError: validate('required', this.state.password, this.state.isRTL), isFocused: '' }); }}
                        />
                        <TextInput maxLength={1} style={[styles.circle, this.state.isFocused == 3 && styles.circleFocus]}
                            returnKeyType={"next"}
                            keyboardType='numeric'
                            onChangeText={(text) => this.onchangeInput(3, text)}
                            value={this.state.c3}
                            blurOnSubmit={true}
                            onSubmitEditing={(event) => { this._c4._root.focus(); }}
                            ref={(c) => this._xc = c}
                            onFocus={() => { this.setState({ isFocused: 3 }); }}
                            onBlur={() => { this.setState({ passwordError: validate('required', this.state.c2, this.state.isRTL), isFocused: '' }); }}
                        />
                        <TextInput maxLength={1} style={[styles.circle, this.state.isFocused == 4 && styles.circleFocus]}
                            returnKeyType={"go"}
                            keyboardType='numeric'
                            onChangeText={(text) => this.onchangeInput(4, text)}
                            value={this.state.c4}
                            blurOnSubmit={true}
                            ref={(c) => this._c4 = c}
                            onSubmitEditing={() => this.confirm()}
                            onFocus={() => { this.setState({ isFocused: 4 }); }}
                            onBlur={() => { this.setState({ passwordError: validate('required', this.state.c4, this.state.isRTL), isFocused: '' }); }}
                        />
                    </Item>
                    
                    <TouchableOpacity style={[styles.TextStyle, {width:width*0.5,alignSelf:"center", borderRadius: 20, marginTop: height * 0.1, backgroundColor: '#BB0000', flexDirection: "row", justifyContent: 'center' }]} onPress={() => this.confirm()}>
                        <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32 }]}>{strings.send}</Text>
                        {/* <IconMaterial style={{ color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32, paddingHorizontal: 7 }} name={backBtn} size={23} /> */}
                    </TouchableOpacity>

                </Content>
            </Container>
        )
    }
}


