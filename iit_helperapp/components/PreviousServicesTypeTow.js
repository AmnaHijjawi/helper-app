import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Badge, Spinner } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton, StudentsTab } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
var config = require('./Config.js')

export default class PreviousServicesTypeTow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRTL: this.props.isRTL,
            showProgress: false,
            showHide: true,
            userId: '',
            waitingModal: false,
            underwayModal: false,
            fieldId: '',
            // status: 1 Finished
            // status: 2 Underway
            // status: 3 Waiting
            data: [],
        };
    }
    async componentWillMount() {
    }
    async editUserData(status) {
        var theId = await AsyncStorage.getItem('@Helper:userId');

        if (status == 'UnderWay') {
            console.log(this.state.fieldId, 'ss');

            try {
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        'type': 'serviceDone',
                        'userId': theId,
                        'serviceId': this.state.fieldId,
                    })
                });
                let res = await response.json();
                this.setState({
                    underwayModal: false
                }, function () { this.getUsreData() })
            } catch (error) {
                alert(error);
            }
        } else if (status == 'Waiting') {
            try {
                console.log(this.state.fieldId, 'aa');
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        'type': 'cancelService',
                        'userId': theId,
                        'serviceId': this.state.fieldId,
                    })
                });
                let res = await response.json();
                this.setState({
                    waitingModal: false
                }, function () { this.getUsreData() })
            } catch (error) {
                alert(error);
            }
        }

    }
    async getUsreData() {
        var theId = await AsyncStorage.getItem('@Helper:userId');

        this.setState({ showProgress: true });
        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    'type': 'getUserService',
                    'userId': theId,
                })
            });
            let res = await response.json();

            this.setState({ showProgress: false, data: Object.values(res.result) });
        } catch (error) {
            alert(error);
        }
    }
    componentDidMount() {
        this.getUsreData();
    }
    showHide = () => {
        this.setState({
            showHide: !this.state.showHide,
        })
    }
    renderLoading() {
        if (this.state.showProgress) {
            return (
                <Spinner color='#ff9619' style={styles.loader} />
            );
        }
    }
    openCloseModalWaiting() {
        this.setState({
            waitingModal: false,
        })
    }
    openCloseModalUnderWay() {
        this.setState({
            underwayModal: false,
        })
    }
    showModalUnderWay(id) {
        this.setState({
            underwayModal: true,
            fieldId: id
        })
    }
    showModalWaiting(id) {
        this.setState({
            waitingModal: true,
            fieldId: id
        })
    }
    render() {
        var component = '';
        if (this.state.data.length > 0) {

            component = this.state.data.map((val, i) => {
                if (val.id != undefined && val.id != null)
                    return <View style={{ padding: 10, flexDirection: "row", backgroundColor: '#EEEEEE', paddingHorizontal: 13, marginRight: 13, marginLeft: 13, marginBottom: height * 0.01 }}>
                        <View style={{ flexDirection: "row" }} >
                            <View>
                                <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 16, }]}>{val.description}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.28, top: 10 }}>
                            <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 14, alignSelf: 'center' }]}>{val.creation_date}</Text>
                        </View>
                        {val.section == 1 ?
                            <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.03, top: 10 }}>
                                <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 14, alignSelf: 'center' }]}>
                                    {strings.HelpWasDone}
                                </Text>
                            </View>
                            :
                            <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.015, marginTop: 5 }}>
                                {val.keyword_SEO != '' ?
                                    <TouchableOpacity onPress={() => { this.showModalUnderWay(val.id) }}>
                                        <Badge style={{ backgroundColor: '#BB0000', paddingTop: 3, width: width * 0.2 }}>
                                            <Text style={[styles.TextStyle, { color: '#fff', fontSize: 14, alignSelf: 'center' }]}>
                                                {strings.Underway}
                                            </Text>
                                        </Badge>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { this.showModalWaiting(val.id) }}>
                                        <Badge style={{ backgroundColor: '#BB0000', paddingTop: 3, width: width * 0.2 }}>
                                            <Text style={[styles.TextStyle, { color: '#fff', fontSize: 14, alignSelf: 'center' }]}>
                                                {strings.Waiting}
                                            </Text>
                                        </Badge>
                                    </TouchableOpacity>
                                }
                            </View>
                        }
                    </View >
            })
        }

        return (
            <Container>
                {this.renderLoading()}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.waitingModal}
                    onRequestClose={() => {
                        this.openCloseModalWaiting()
                    }}>
                    <View style={[styles.modalContainer1]}>
                        <View style={[styles.modalContainer2]}>
                            <TouchableOpacity onPress={() => { this.openCloseModalWaiting() }} style={{ position: "absolute", left: 0, top: -20 }}>
                                <Icon style={{ backgroundColor: "#fff", borderRadius: 40 }} name='closecircle' size={33} color='#BB0000' />
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.TextStyle, { marginHorizontal: '20%', color: '#545252', fontSize: 16, alignItems: 'center' }]}>{strings.CancelOrderMSG}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    <TouchableOpacity style={[styles.TextStyle, styles.confirmBTN, { marginRight: 40, flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.2, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.editUserData('Waiting')}>
                                        <Text style={[styles.TextStyle, { color: '#fff', fontSize: 12 }]}>{strings.confirm}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.TextStyle, styles.profileBTN, { marginLeft: 40, flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.2, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.openCloseModalWaiting()}>
                                        <Text style={[styles.TextStyle, { color: '#0D0D0D', fontSize: 12 }]}>{strings.Cancel}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.underwayModal}
                    onRequestClose={() => {
                        this.openCloseModalUnderWay()
                    }}>
                    <View style={[styles.modalContainer1]}>
                        <View style={[styles.modalContainer2]}>
                            <TouchableOpacity onPress={() => { this.openCloseModalUnderWay() }} style={{ position: "absolute", left: 0, top: -20 }}>
                                <Icon style={{ backgroundColor: "#fff", borderRadius: 40 }} name='closecircle' size={33} color='#BB0000' />
                            </TouchableOpacity>
                            <View>
                                <Text style={[styles.TextStyle, { marginHorizontal: '20%', color: '#545252', fontSize: 16, alignItems: 'center' }]}>{strings.ServiceConfirmMSG}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    <TouchableOpacity style={[styles.TextStyle, styles.confirmBTN, { marginRight: 40, flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.2, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.editUserData('UnderWay')}>
                                        <Text style={[styles.TextStyle, { color: '#fff', fontSize: 12 }]}>{strings.yes}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.TextStyle, styles.profileBTN, { marginLeft: 40, flexDirection: "row", marginTop: '3%', justifyContent: 'center', width: width * 0.2, height: height * 0.035, paddingVertical: 3 }]} onPress={() => this.openCloseModalUnderWay()}>
                                        <Text style={[styles.TextStyle, { color: '#0D0D0D', fontSize: 12 }]}>{strings.no}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {component != '' ?
                    <ScrollView>
                        <View style={{ flexDirection: "row", paddingTop: 35 }}>
                            <Image style={{ marginLeft: 10, marginRight: 5, width: width * 0.08, height: width * 0.08, marginTop: -10 }} resizeMode={'contain'} source={require('./images/Person.png')} />
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 14, color: '#201F1F', fontWeight: "bold" }}>{strings.ServicesINeededHelpWith}</Text>
                            </View>
                            <View style={{ marginHorizontal: 80 }}>
                                <TouchableOpacity onPress={(event) => this.showHide()}>
                                    <Badge style={{ backgroundColor: '#BB0000', width: 20, height: 20, marginTop: 2, paddingTop: 2.5, marginRight: 10, paddingRight: RTL & 3, paddingLeft: !RTL & 3 }}>
                                        <Icon style={{ color: '#FFFFFF', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }} name={this.state.showHide ? 'up' : 'down'} />
                                    </Badge>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ display: this.state.showHide ? 'flex' : 'none', marginTop: 15 }}>
                            {component}
                        </View>

                    </ScrollView>
                    :
                    <Text style={[styles.TextStyle, { textAlign: 'center', color: '#1B1919', fontSize: 22, marginTop: height * 0.3 }]}>{'لا يوجد خدمات سابقة حاليا '}</Text>
                }
            </Container>
        )

    }
}

