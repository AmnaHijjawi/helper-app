import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Spinner, Segment, Button, Header, Body } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
var config = require('./Config.js')

let pushNote;
export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '232-a91ad7de5901bb8694a5b23ce4a57031',
            name: '',
            phone: '',
            nationalId: '',//null
            platNo: '',//null
            serviceType: '',//0
            description: '',
            userData: [],
            modal: false,
        };
    }
    async editUserData() {
        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    'type': 'editUser',
                    'userId': this.state.userId,
                    'name': this.state.name,
                    'nationalId': '',
                    'platNo': '',
                    'serviceType': 0,
                })
            });
            let res = await response.json();
            this.setState({
                modal:false
            })
            this.goToPage("Home");
        } catch (error) {
            alert(error);
        }
    }
    UNSAFE_componentWillMount() {
    }
    async getUsreData() {
        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    'type': 'getUserInfo',
                    'userId': this.state.userId,
                })
            });
            let res = await response.json();
            let userData = res.result;
            if (userData.features == 1 || userData.features == 2) {
                this.setState({
                    name: userData.fname,
                    phone: userData.phone,
                    nationalId: userData.nationalId,
                    platNo: userData.platNo,
                    userData: userData
                })
            } else if (userData.features == 0) {
                this.setState({
                    name: userData.fname,
                    phone: userData.phone,
                    userData: userData
                })
            }
        } catch (error) {
            alert(error);
        }
    }
    componentDidMount() {
        this.getUsreData();
    }
    goToPage(page, param) {
        this.props.navigation.navigate(page, param);
    }
    setServiceType(val) {
        this.setState({ serviceType: val })
    }
    openCloseModal() {
        this.setState({
            modal: false,
        })
    }
    showModal() {
        this.setState({
            modal: true,
        })
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#F8F8F8' }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                        this.openCloseModal()
                    }}>
                    <View style={[styles.modalContainer1]}>
                        <View style={[styles.modalContainer2]}>
                            <TouchableOpacity onPress={() => { this.openCloseModal() }} style={{ position: "absolute", left: 0, top: -20 }}>
                                <Icon style={{ backgroundColor: "#fff", borderRadius: 40 }} name='closecircle' size={33} color='#BB0000' />
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.TextStyle, { marginHorizontal: '20%', color: '#545252', fontSize: 16, alignItems: 'center' }]}>{strings.CancelVolunteerServiceMSG}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop:20 }}>
                                    <TouchableOpacity style={[styles.TextStyle, styles.confirmBTN, { marginRight: 40, flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.2, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.editUserData()}>
                                        <Text style={[styles.TextStyle, { color: '#fff', fontSize: 12 }]}>{strings.confirm}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.TextStyle, styles.profileBTN, { marginLeft: 40, flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.2, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.openCloseModal()}>
                                        <Text style={[styles.TextStyle, { color: '#0D0D0D', fontSize: 12 }]}>{strings.Cancel}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ top: height * 0.04 }}>
                    <Image style={{ resizeMode: 'contain', marginHorizontal: width * 0.42 }}
                        source={require('./images/Profile.png')}
                    />
                </View>
                <Content style={{ top: height * 0.04, marginTop: 15 }}>
                    {(this.state.userData.features == 1 || this.state.userData.features == 2) &&
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: '20%' }}>
                            <TouchableOpacity style={[styles.TextStyle, styles.profileBTN, { flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.6, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.showModal()}>
                                <Text style={[styles.TextStyle, { color: '#0D0D0D', fontSize: 12, alignItems: 'center' }]}>{strings.CancelVolunteering}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: '8%' }}>
                            <Text style={[styles.TextStyle, { color: '#545252', fontSize: 16, marginHorizontal: '5%' }]}>
                                {strings.UserName}
                            </Text>
                            <Text style={[styles.TextStyle, { color: '#787878', fontSize: 12, marginHorizontal: '10%' }]}>
                                {this.state.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: '3%' }}>
                            <Text style={[styles.TextStyle, { color: '#545252', fontSize: 16, marginHorizontal: '5%' }]}>
                                {strings.PhoneNumber}
                            </Text>
                            <Text style={[styles.TextStyle, { color: '#787878', fontSize: 12, marginHorizontal: '10%' }]}>
                                {this.state.phone}
                            </Text>
                        </View>
                        {(this.state.userData.features == 1 || this.state.userData.features == 2) &&
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: '3%' }}>
                                <Text style={[styles.TextStyle, { color: '#545252', fontSize: 16, marginHorizontal: '5%' }]}>
                                    {strings.nationalNumber}
                                </Text>
                                <Text style={[styles.TextStyle, { color: '#787878', fontSize: 12, marginHorizontal: '10%' }]}>
                                    {this.state.nationalId}
                                </Text>
                            </View>
                        }
                        {(this.state.userData.features == 1 || this.state.userData.features == 2) &&
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: '3%' }}>
                                <Text style={[styles.TextStyle, { color: '#545252', fontSize: 16, marginHorizontal: '5%' }]}>
                                    {strings.carNum}
                                </Text>
                                <Text style={[styles.TextStyle, { color: '#787878', fontSize: 12, marginHorizontal: '10%' }]}>
                                    {this.state.platNo}
                                </Text>
                            </View>
                        }
                    </View>
                </Content>
            </Container>


        )
    }
}
