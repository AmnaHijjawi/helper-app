import React, { Component } from 'react';
import { Container, Footer, Content, Textarea, Spinner, Input, Item, Form, Label, Row, FooterTab, Badge, CheckBox } from 'native-base';
import {
    StyleSheet, TouchableOpacity, Button, Clipboard,
    ToastAndroid, TextInput, AlertIOS, Linking, Platform,
    I18nManager, AppRegistry, Dimensions, ScrollView, ImageBackground,
    View, Image, Text, Modal, TouchableHighlight, Alert
} from 'react-native';
import { StandardButton } from './ToBeReused'


import IconMaterial from 'react-native-vector-icons/Entypo';


import renderError from './Validation/RenderError';
import validate from './Validation/Validate_Wrapper';

var config = require('./Config.js')
export const { width: width, height: height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

export default class VolunteerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRTL: this.props.isRTL,
            showProgress: false,
            volunteerNote: '',
            volunteerNoteError: '',
            freeServiceAgree: 0,
            freeServiceAgreeError: '',
            fullName: '',
            fullNameError: '',
            nationalNumber: '',
            nationalNumberError: '',
            openVolunteerTypeOption: false,
            volunteerType: 0,
            carNum1: '',
            carNum2: '',
            carNumError: '',
            suceessFlag: 0
        };
        this.goToPage = this.goToPage.bind(this);
    }
    goToPage(page, param) {

        this.props.navigation.navigate(page, param)


    }

    renderLoading() {
        if (this.state.showProgress) {
            return (
                <Spinner color='#ff9619' style={styles.loader} />
            );
        }
    }

    async sendVolunteerForm() {
        let volunteerNoteError = validate('volunteerNote', this.state.volunteerNote)
        let fullNameError = validate('fullName', this.state.fullName)
        let nationalNumberError = validate('nationalNumber', this.state.nationalNumber)

        let volunteerTypeError = ''
        if (this.state.volunteerType != 1 && this.state.volunteerType != 2) {
            volunteerTypeError = strings.requiredField
        }

        let carNumError = ''
        if (validate('carNum2', this.state.carNum2) || validate('carNum2', this.state.carNum2)) {
            carNumError = strings.carNumError
        }
        let freeServiceAgreeError = ''
        if (this.state.freeServiceAgree != 1) {
            freeServiceAgreeError = strings.requiredField
        }

        if (this.state.volunteerType == 1) {
            this.setState({
                fullNameError: false,
                nationalNumberError: false,
                carNumError: false,
            })
            fullNameError = false
            nationalNumberError = false
            carNumError = false
        } else if (this.state.volunteerType == 2) {
            this.setState({
                fullNameError: fullNameError,
                nationalNumberError: nationalNumberError,
                carNumError: carNumError,
            })
        }

        this.setState({
            volunteerNoteError: volunteerNoteError,
            freeServiceAgreeError: freeServiceAgreeError,
            volunteerTypeError: volunteerTypeError
        })



        if (!volunteerNoteError && !freeServiceAgreeError && !fullNameError && !nationalNumberError && !volunteerTypeError && !carNumError) {
            this.setState({ showProgress: true, suceessFlag: 0 });

            const userId = await AsyncStorage.getItem('@Helper:userId');
            const name = await AsyncStorage.getItem('@Helper:name');
            let platNo = this.state.carNum2 + '-' + this.state.carNum1

            try {
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'editUser',
                        userId: userId,
                        name: this.state.fullName?this.state.fullName:name,
                        nationalId: this.state.nationalNumber,
                        platNo: platNo,
                        serviceType: this.state.volunteerType,
                        serviceDesc: this.state.volunteerNote
                    })
                });

                let res = await response.json();

                // console.log(res); 
                
                

                if (response.status >= 200 && response.status < 300) { 
                    this.setState({ showProgress: false });
                    this.clearData()
                    this.goToPage('ContactUsSuccessMSG',{ page: 'Volunteer' })

                } else {

                }
            } catch (error) {

            }
        }

    }

    clearData() {
        this.setState({
            suceessFlag: 1,
            volunteerNote: '',
            volunteerNoteError: '',
            freeServiceAgree: 0,
            freeServiceAgreeError: '',
            fullName: '',
            fullNameError: '',
            nationalNumber: '',
            nationalNumberError: '',
            openVolunteerTypeOption: false,
            volunteerType: 0,
            carNum1: '',
            carNum2: '',
            carNumError: ''
        })
    }

    agreeFreeServiceAction() {
        if (this.state.freeServiceAgree == 1) {
            var freeServiceAgree = 0
        } else {
            var freeServiceAgree = 1
        }

        this.setState({ freeServiceAgree: freeServiceAgree });
    }

    openSelectVolunteerTypeView() {
        this.setState({ openVolunteerTypeOption: !this.state.openVolunteerTypeOption });
    }

    changeVolunteerTypeView(volunteerType) {
        this.setState({ volunteerType: volunteerType })
    }

    render() {
        return (
            <Container>
                {this.renderLoading()}
                <Content style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: '#F8F8F8' }}>


                    <View style={{ marginTop: height * 0.03, marginBottom: height * 0.03, backgroundColor: 'white', borderWidth: 1, borderRadius: 4, borderColor: '#C9C9C9' }}>
                        <TouchableOpacity onPress={() => this.openSelectVolunteerTypeView()} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={[styles.TextStyle, { fontSize: 15 }]}>{strings.selectVolunteerType}</Text>
                            <IconMaterial style={{ color: 'black', fontSize: 19, alignItems: 'center', lineHeight: 20, paddingHorizontal: 10 }} name={'chevron-down'} size={23} />
                        </TouchableOpacity>


                        {this.state.openVolunteerTypeOption &&

                            <View style={{ paddingLeft: 20, paddingRight: 10 }}>
                                <TouchableOpacity onPress={() => this.changeVolunteerTypeView(1)} >
                                    <View style={[(this.state.volunteerType == 1) ? styles.volunteerActiveField : styles.noStyle]}>
                                        <Text style={[styles.TextStyle, { fontSize: 14, paddingBottom: 5, paddingTop: 5, paddingRight: 10 }]}>{strings.onlineEducation}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeVolunteerTypeView(2)} style={{ marginBottom: 10 }}>
                                    <View style={[(this.state.volunteerType == 2) ? styles.volunteerActiveField : styles.noStyle]}>
                                        <Text style={[styles.TextStyle, { fontSize: 14, paddingBottom: 5, paddingTop: 5, paddingRight: 10 }]}>{strings.otherServices}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                    {renderError(this.props.isRTL, this.state.volunteerTypeError)}

                    <View>
                        <Textarea style={[styles.TextStyle, styles.volunteerTextAreaInput]}
                            rowSpan={6}
                            bordered
                            returnKeyType={"next"}
                            placeholder={(this.state.volunteerType == 1) ? strings.volunteerNoteArea : ((this.state.volunteerType == 2) ? strings.volunteerNote2Area : '')}
                            value={this.state.volunteerNote}
                            onChangeText={(text) => this.setState({ volunteerNote: text })}
                            blurOnSubmit={false}
                            onBlur={() => { this.setState({ volunteerNoteError: validate('volunteerNote', this.state.volunteerNote, this.state.isRTL) }); }} />

                        {renderError(this.props.isRTL, this.state.volunteerNoteError)}
                    </View>
                    {this.state.volunteerType == 2 &&
                        <View>
                            <Input style={[styles.TextStyle,{ textAlign:"right", borderColor: '#C9C9C9', borderWidth: 1, height: width * 0.1, borderRadius: 4, marginTop: height * 0.02, backgroundColor: 'white', fontSize: 12, paddingLeft: 12 }]}
                                onChangeText={(text) => this.setState({ fullName: text })}
                                returnKeyType={"next"}
                                value={this.state.fullName}
                                blurOnSubmit={false}
                                placeholder={strings.fullName}
                                ref={(c) => this.fullName = c}
                                onSubmitEditing={(event) => { this.nationalNumber._root.focus(); }}
                                onBlur={() => { this.setState({ fullNameError: validate('fullName', this.state.fullName, this.state.isRTL) }); }}
                            />
                            {renderError(this.props.isRTL, this.state.fullNameError)}
                        </View>
                    }
                    {this.state.volunteerType == 2 &&
                        <View>
                            <Input style={[styles.TextStyle,{textAlign:"right", borderColor: '#C9C9C9', borderWidth: 1, height: width * 0.1, borderRadius: 4, marginTop: height * 0.02, backgroundColor: 'white', fontSize: 12, paddingLeft: 12 }]}
                                onChangeText={(text) => this.setState({ nationalNumber: text })}
                                keyboardType='numeric'
                                returnKeyType={"next"}
                                value={this.state.nationalNumber}
                                blurOnSubmit={false}
                                placeholder={strings.nationalNumber}
                                ref={(c) => this.nationalNumber = c}
                                onSubmitEditing={(event) => { this.carNum2._root.focus(); }}
                                onBlur={() => { this.setState({ nationalNumberError: validate('nationalNumber', this.state.nationalNumber, this.state.isRTL) }); }}
                            />
                            {renderError(this.props.isRTL, this.state.nationalNumberError)}
                        </View>
                    }

                    {this.state.volunteerType == 2 &&
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '23%', paddingTop: 20 }}>
                                <Text style={[styles.TextStyle]}>{strings.carNum}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Input style={[styles.TextStyle,{textAlign:"right", borderColor: '#C9C9C9', borderWidth: 1, height: width * 0.1, borderRadius: 4, marginTop: height * 0.02, backgroundColor: 'white' }]}
                                    onChangeText={(text) => this.setState({ carNum1: text })}
                                    returnKeyType={"next"}
                                    keyboardType='numeric'
                                    value={this.state.carNum1}
                                    blurOnSubmit={false}
                                    ref={(c) => this.carNum1 = c}
                                    onBlur={() => { this.setState({ carNumError: validate('carNum1', this.state.carNum1, this.state.isRTL) }); }}
                                />
                            </View>
                            <View style={{ width: '5%', paddingTop: 20 }}>
                                <Text style={{ textAlign: 'center' }}>-</Text>
                            </View>
                            <View style={{ width: '26%' }}>
                                <Input style={[styles.TextStyle,{ textAlign:"right",borderColor: '#C9C9C9', borderWidth: 1, height: width * 0.1, borderRadius: 4, marginTop: height * 0.02, backgroundColor: 'white' }]}
                                    onChangeText={(text) => this.setState({ carNum2: text })}
                                    returnKeyType={"next"}
                                    keyboardType='numeric'
                                    value={this.state.carNum2}
                                    blurOnSubmit={false}
                                    ref={(c) => this.carNum2 = c}
                                    onSubmitEditing={(event) => { this.carNum1._root.focus(); }}
                                    onBlur={() => { this.setState({ carNumError: validate('carNum2', this.state.carNum2, this.state.isRTL) }); }}
                                />
                            </View>

                        </View>
                    }
                    {renderError(this.props.isRTL, this.state.carNumError)}

                    {this.state.volunteerType == 2 &&
                        <View>
                            <Text style={[styles.TextStyle, { color: '#726C6C', fontSize: 12, marginTop: height * 0.01, marginBottom: height * 0.01 }]}>{strings.volunteerFormNote}</Text>
                        </View>
                    }

                    <View style={{ flexDirection: "row", marginTop: height * 0.02 }}>
                        <CheckBox checked={(this.state.freeServiceAgree == 1) ? true : false} color='#BB0000' onPress={() => this.agreeFreeServiceAction()} style={{ left: 0 }} />
                        <Text style={[styles.TextStyle,styles.volunteerCheckboxLableStyle]}>{strings.volunteerCheckboxLable}</Text>
                    </View>
                    {renderError(this.props.isRTL, this.state.freeServiceAgreeError)}

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={[styles.TextStyle, { borderRadius: 20, marginTop: height * 0.03, marginBottom: height * 0.02, backgroundColor: '#BB0000', flexDirection: "row", justifyContent: 'center', width: '40%' }]} onPress={() => this.sendVolunteerForm()}>
                            <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32 }]}>{strings.send}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.TextStyle, { color: 'green' }, { fontSize: 18 }, { textAlign: 'center' }]}>{this.state.suceessFlag ? strings.sentSuccesfully : ''}</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}


