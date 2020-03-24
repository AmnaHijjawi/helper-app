import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Input, Button } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import renderError from './Validation/RenderError';
import validate from './Validation/Validate_Wrapper';
var config = require('./Config.js')

let pushNote;
export default class WeekPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            message: '',
            messageErr: '',
            userId: '',

        };
        this.goToPage = this.goToPage.bind(this);
    }


    async ContactUsHandler() {
        let messageErr = validate('required', this.state.message)

        this.setState({
            messageErr: messageErr
        })
        if (!messageErr) {

            try {
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        'type': 'contactUs',
                        'message': this.state.message,
                        'userId': this.state.userId,
                    })
                });
                let res = await response.json();
                this.redirectPage();
            } catch (error) {
                alert(error);
            }
        }

    }
    redirectPage() {
        var redirectID = 'ContactUsSuccessMSG'
        this.props.navigation.navigate(redirectID, {});
    }
    getData = async () => {
        try {
            const userId = await AsyncStorage.getItem('@Helper:userId');
            const name = await AsyncStorage.getItem('@Helper:name');
            const phone = await AsyncStorage.getItem('@Helper:phone');
            if (userId != null && name != null && phone != null) {
                this.setState({
                    userId: userId,
                    name: name,
                    phone: phone
                })
            }
        } catch (e) {
            alert(Error);
        }


    }

    componentDidMount() {
        this.getData();
    }

    UNSAFE_componentWillMount() {


    }

    goToPage(page, param) {

        this.props.navigation.navigate(page, param)


    }

    render() {

        return (
            <Container>

                <Content >

                    <View style={{ marginTop: width * 0.1, marginBottom: width * 0.1 }}>
                        <Image style={{ alignSelf: 'center' }} source={require('./images/Login.png')} />
                    </View>
                    <View style={{ width: width * 0.8, alignSelf: 'center', marginBottom: width * 0.1 }}>
                        <View style={{}}>
                            <Text style={[styles.TextStyle, { marginBottom: 10, color: '#2C2828', fontSize: 14, }]}>{strings.name}</Text>
                            <Input style={{ backgroundColor: '#FBFBFB', borderRadius: 20, width: width * 0.8, fontSize: 12, height: width * 0.11, borderColor: '#C9C9C9', borderWidth: 1 }}
                                ref={(c) => this.name = c}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}
                                blurOnSubmit={false}
                                onSubmitEditing={(event) => { this.email._root.focus(); }}
                                disabled={true}
                            />
                        </View>

                        <View style={{ marginTop: width * 0.04 }}>
                            <Text style={[styles.TextStyle, { marginBottom: 10, color: '#2C2828', fontSize: 14, }]}>{strings.PhoneNumber}</Text>
                            <Input style={{ backgroundColor: '#FBFBFB', borderRadius: 20, width: width * 0.8, fontSize: 12, height: width * 0.11, borderColor: '#C9C9C9', borderWidth: 1 }}
                                ref={(c) => this.phone = c}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ phone: text })}
                                value={this.state.phone}
                                blurOnSubmit={false}
                                onSubmitEditing={(event) => { this.country._root.focus(); }}
                                disabled={true}
                            />
                        </View>

                        <View style={{ marginTop: width * 0.04, }}>
                            <Text style={[styles.TextStyle, { marginBottom: 10, color: '#2C2828', fontSize: 14, }]}>{strings.message}</Text>
                            <Input style={{ backgroundColor: '#FBFBFB', height: width * 0.39, borderRadius: 13, borderColor: '#C9C9C9', borderWidth: 1 }}
                                ref={(c) => this.msg = c}
                                returnKeyType={"next"}
                                onChangeText={(text) => this.setState({ message: text })}
                                value={this.state.message}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.ContactUsHandler()}
                                onBlur={() => { this.setState({ messageErr: validate('msg', this.state.message, this.state.isRTL) }); }} />
                        </View>
                        {renderError(this.props.isRTL, this.state.messageErr)}
                        <Button style={{ backgroundColor: '#BB0000', width: width * 0.8, height: 26, borderRadius: 20, marginTop: width * 0.1, justifyContent: 'center' }} onPress={() => this.ContactUsHandler()}>
                            <Text style={{ color: '#FFFFFF', fontFamily: strings.ArabicFont, fontSize: 14, alignSelf: 'center' }}>{strings.send}</Text>
                        </Button>

                    </View>


                </Content>
            </Container>


        )
    }
}
