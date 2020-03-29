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
import ModalSelector from 'react-native-modal-selector'
import renderError from './Validation/RenderError';
import validate from './Validation/Validate_Wrapper';

var config = require('./Config.js')
export const { width: width, height: height } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';


export default class NeedHelpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRTL: this.props.isRTL,
            showProgress: false,
            suceessFlag: 0,

            openHelpTypeOption: false,
            helpType: 0,
            helpTypeError: '',
            serviceDesc: '',
            serviceDescError: '',

            selectdClass: '',
            selectdClassError: '',
            selectedClassName: ''
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

    openSelectHelpTypeView() {
        this.setState({ openHelpTypeOption: !this.state.openHelpTypeOption });
    }

    changeHelpTypeView(helpType) {
        this.setState({ helpType: helpType })
    }


    async sendNeedHelpForm() {
        let helpTypeError = ''
        if (this.state.helpType != 1 && this.state.helpType != 2) {
            helpTypeError = strings.requiredField
        }

        let serviceDescError = validate('volunteerNote', this.state.serviceDesc)


        this.setState({
            helpTypeError: helpTypeError,
            serviceDescError: serviceDescError
        })

        let selectdClassError = ''
        if ((this.state.selectdClass == 'null' || this.state.selectdClass == undefined || this.state.selectdClass == '') && this.state.helpType == 1) {
            selectdClassError = strings.selectdClassError
        } else {
            selectdClassError = false
        }

        if (this.state.helpType == 1) {
            this.setState({
                selectdClassError: selectdClassError
            })
        } else if (this.state.helpType == 2) {
            this.setState({
                selectdClassError: ''
            })
            selectdClassError = false
        }




        if (!helpTypeError && !serviceDescError && !selectdClassError) {
            this.setState({ showProgress: true, suceessFlag: 0 });

            const userId = await AsyncStorage.getItem('@Helper:userId');

            try {
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'addService',
                        userId: userId,
                        name: this.state.selectedClassName,
                        desc: this.state.serviceDesc,
                        serviceType: this.state.helpType
                    })
                });

                let res = await response.json();

                // console.log(res); 



                if (response.status >= 200 && response.status < 300) {
                    this.setState({ showProgress: false });
                    this.clearData()
                    this.goToPage('ContactUsSuccessMSG',{ page: 'NeedHelp' })

                } else {

                }
            } catch (error) {

            }

        }
    }

    clearData() {
        this.setState({
            suceessFlag: 1,
            openHelpTypeOption: false,
            helpType: 0,
            helpTypeError: '',
            serviceDesc: '',
            serviceDescError: '',

            selectdClass: '',
            selectdClassError: '',
            selectedClassName: ''
        })
    }

    render() {

        let index = 1;
        const classArray = [
            { key: index++, label: strings.firstGrade },
            { key: index++, label: strings.secondGrade },
            { key: index++, label: strings.thirdGrade },
            { key: index++, label: strings.fourthGrade },
            { key: index++, label: strings.fifthGrade },
            { key: index++, label: strings.sixthGrade },
            { key: index++, label: strings.seventhGrade },
            { key: index++, label: strings.eighthGrade },
            { key: index++, label: strings.ninthGrade },
            { key: index++, label: strings.tenthGrade },
            { key: index++, label: strings.eleventhGrade },
            { key: index++, label: strings.tawjihi },
        ];

        return (
            <Container style={{ backgroundColor: '#F8F8F8' }}>
                {this.renderLoading()}

                <Content style={{ margin:15, backgroundColor: '#F8F8F8' }}>


                    <View style={{ marginTop: height * 0.03, marginBottom: height * 0.03, backgroundColor: 'white', borderWidth: 1, borderRadius: 4, borderColor: '#C9C9C9' }}>
                        <TouchableOpacity onPress={() => this.openSelectHelpTypeView()} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={[styles.TextStyle, { fontSize: 15 }]}>{strings.selectServiceType}</Text>
                            <IconMaterial style={{ color: 'black', fontSize: 19, alignItems: 'center', lineHeight: 20, paddingHorizontal: 10 }} name={'chevron-down'} size={23} />
                        </TouchableOpacity>


                        {this.state.openHelpTypeOption &&

                            <View style={{ paddingLeft: 20, paddingRight: 10 }}>
                                <TouchableOpacity onPress={() => this.changeHelpTypeView(1)} >
                                    <View style={[(this.state.helpType == 1) ? styles.volunteerActiveField : styles.noStyle]}>
                                        <Text style={[styles.TextStyle, { fontSize: 14, paddingBottom: 5, paddingTop: 5, paddingRight: 10 }]}>{strings.onlineEducation}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeHelpTypeView(2)} style={{ marginBottom: 10 }}>
                                    <View style={[(this.state.helpType == 2) ? styles.volunteerActiveField : styles.noStyle]}>
                                        <Text style={[styles.TextStyle, { fontSize: 14, paddingBottom: 5, paddingTop: 5, paddingRight: 10 }]}>{strings.otherServices}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                    {renderError(this.props.isRTL, this.state.helpTypeError)}


                    {this.state.helpType == 1 &&
                        <View>
                            <ModalSelector
                                data={classArray}
                                optionStyle={{ backgroundColor: 'white' }}
                                optionContainerStyle={{ backgroundColor: 'white' }}
                                cancelContainerStyle={{ backgroundColor: 'white' }}
                                optionTextStyle={[styles.TextStyle,{textAlign:"center", color: 'black' }]}
                                initValue={strings.class}
                                // supportedOrientations={['landscape']}
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={strings.cancel}
                                onChange={(option) => { this.setState({ selectdClass: option.key, selectedClassName: option.label }) }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 1, height: width * 0.1, backgroundColor: 'white' }}>
                                    <TextInput
                                        editable={false}
                                        placeholder={strings.class} style={[styles.TextStyle, {padding:4, alignContent:'center',alignSelf:'center', alignItems: 'center',  color: 'black' }]}>{this.state.selectedClassName}</TextInput>

                                    <IconMaterial style={{ color: 'black', fontSize: 19, alignItems: 'center',padding:4,  paddingHorizontal: 10 }} name={'chevron-down'} size={23} />
                                </View>

                            </ModalSelector>
                            {renderError(this.props.isRTL, this.state.selectdClassError)}
                        </View>
                    }


                    {/* {this.state.helpType == 2 && */}
                        <View>
                            <Textarea style={[styles.TextStyle, styles.volunteerTextAreaInput,{textAlign:RTL?"right":'left',}]}
                                rowSpan={6}
                                bordered
                                returnKeyType={"next"}
                                placeholder={(this.state.helpType == 1) ? strings.serviceDescEduPlaceholder : ((this.state.helpType == 2) ? strings.serviceDescPlaceholder : '')}                                value={this.state.serviceDesc}
                                onChangeText={(text) => this.setState({ serviceDesc: text })}
                                blurOnSubmit={false}
                                onBlur={() => { this.setState({ serviceDescError: validate('volunteerNote', this.state.serviceDesc, this.state.isRTL) }); }} />

                            {renderError(this.props.isRTL, this.state.serviceDescError)}
                        </View>
                    {/* } */}



                    <View>
                        <Text style={[styles.TextStyle, { color: '#726C6C', fontSize: 12, marginTop: height * 0.01, marginBottom: height * 0.01 }]}>{strings.needHelpFormNote}</Text>
                    </View>


                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={[styles.TextStyle, { borderRadius: 20, marginTop: height * 0.03, marginBottom: height * 0.02, backgroundColor: '#BB0000', flexDirection: "row", justifyContent: 'center', width: '40%' }]} onPress={() => this.sendNeedHelpForm()}>
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