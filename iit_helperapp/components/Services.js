
import React, { Component } from 'react';
import { Linking, Platform, StyleSheet, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton, StudentsTab } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
var config = require('./Config.js')

let pushNote;
export default class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                houseNo: 'عماره رقم 4',
                time: "13 min",
                location: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
            },
            lat: 32.019481,
            long: 35.863050,

        };

    }





    UNSAFE_componentWillMount() {


    }



    render() {

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
                            latitude: this.state.lat,
                            longitude: this.state.long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker draggable
                            coordinate={{
                                latitude: this.state.lat,
                                longitude: this.state.long,

                            }}
                            draggable={false}


                        />
                    </MapView>

                </View>

                <View style={{ bottom: 0, position: "absolute", width: width }}>
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
                </View>
            </Container>


        )
    }
}
