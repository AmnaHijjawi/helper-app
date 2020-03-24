
import React, { Component } from 'react';
import { Linking, Platform, StyleSheet, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton, StudentsTab } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Entypo';
var config = require('./Config.js')
import Icon from 'react-native-vector-icons/AntDesign'

let pushNote;
export default class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            select: {
                lat: 32.024584,
                lon: 35.858844,
                name: 'عماره رقم 4',
                creation_date: '',
                fname: 'fathi',
                phone: '0999099',
                description: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
            },
            data: [
                {
                    lat: 32.024584,
                    lon: 35.858844,
                    name: 'عماره رقم 4',
                    creation_date: '',
                    fname: 'fathi',
                    phone: '0999099',
                    description: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
                },
                {
                    lat: 32.019481,
                    lon: 35.863050,
                    name: 'عماره رقم 4',
                    creation_date: '',
                    fname: 'fathi',
                    phone: '0999099',
                    description: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
                },
                {
                    lat: 32.022701,
                    lon: 35.862245,
                    fname: 'fathi',
                    phone: '0999099',
                    name: 'عماره رقم 4',
                    creation_date: '',
                    description: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
                },
            ],


        };
        this.openCloseModal = this.openCloseModal.bind(this)
    }





    UNSAFE_componentWillMount() {


    }

    openCloseModal(val) {
        if (val != '') {
            this.setState({ select: val })
        } else {
            this.setState({ select: {} })

        }
        this.setState({ modal: !this.state.modal })

    }

    render() {
        var component
        if (this.state.data.length > 0) {

            component = this.state.data.map((val, i) => {
                return <Marker
                    onPress={() => { this.openCloseModal(val) }}
                    image={require('./images/marker.png')}
                    coordinate={{
                        latitude: val.lat,
                        longitude: val.lon,

                    }}
                    draggable={false}


                />
            })
        }
        return (
            <Container>
                {/* <View style={[styles.headerExtension]} /> */}
                {/* <StudentsTab setActiveTab={this.setActiveTab} data={this.state.data} /> */}
                <View style={{}}>
                    <MapView
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            position: "absolute", height: height, top: 0, bottom: 0, left: 0, right: 0,
                        }}
                        initialRegion={{
                            latitude: this.state.data[0].lat,
                            longitude: this.state.data[0].lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {component}
                    </MapView>

                </View>

                {/* <View style={{ bottom: 0, position: "absolute", width: width }}>
                    <View style={{ padding: width * 0.03, width: '80%', alignSelf: "center", backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: "row", marginBottom: width * 0.02 }}>
                            <Icon name='location-pin' size={22} color={'#E77000'} />
                            <Text style={[styles.TextStyle, { color: '#003F6D', fontSize: 16, }]}>{strings.deliveryLocation}</Text>

                        </View>
                        <Text style={[styles.TextStyle, { color: '#2C2828', fontSize: 14, marginBottom: width * 0.02 }]}>{this.state.data.location}</Text>
                        <View style={{ flexDirection: "row", marginBottom: width * 0.02 }}>
                            <Text style={[styles.TextStyle, { color: '#2C2828', fontSize: 16,marginRight:width*0.08 }]}>{this.state.data.houseNo}</Text>
                            <Text style={[styles.TextStyle, { color: '#E77000', fontSize: 16, }]}>{this.state.data.time}</Text>

                        </View>
                    </View>
                </View> */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                        this.openCloseModal('')
                    }}>
                    <View style={[styles.modalContainer1]}>
                        <View style={[styles.modalContainer2]}>
                            <TouchableOpacity onPress={() => {
                                this.openCloseModal('')
                            }} style={{ position: "absolute", left: 0, top: -20 }}>
                                <Icon style={{ backgroundColor: "#fff", borderRadius: 40 }} name='closecircle' size={33} color='#E77000' />
                            </TouchableOpacity>



                            <View>

                                {/* 
    //service data : name , description 
    //userInfo show it when iser accept the service  */}
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>


        )
    }
}
