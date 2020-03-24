
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
import MapIcon from 'react-native-vector-icons/FontAwesome5';
import ListIcon from 'react-native-vector-icons/MaterialCommunityIcons';
let pushNote;
export default class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            viewMode: 1,
            viewModalUserData: 0,
            select: {
                lat: 32.024584,
                lon: 35.858844,
                name: 'عماره رقم 4',
                creation_date: '',
                fname: 'fathi',
                phone: '0999099',
                description: 'مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء) ',
            },
            data: [
                {
                    id: 3,
                    type: 2,
                    lat: 32.024584,
                    lon: 35.858844,
                    name: 'عماره رقم 1',
                    creation_date: '24/3',
                    fname: 'fathi',
                    phone: '0999099',
                    description: 'مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء)مكة المكرمة - حي البحيرات (شارع الشهداء) ',
                },
                {
                    id: 3,
                    type: 2,
                    lat: 32.019481,
                    lon: 35.863050,
                    name: 'عماره رقم 2',
                    creation_date: '24/3',
                    fname: 'fathi',
                    phone: '0999099',
                    description: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
                },
                {
                    id: 3,
                    type: 2,
                    lat: 32.022701,
                    lon: 35.862245,
                    fname: 'fathi',
                    phone: '0999099',
                    name: 'عماره رقم 4',
                    creation_date: '24/3',
                    description: 'مكة المكرمة - حي البحيرات (شارع الشهداء) ',
                },
            ],
        };
        this.openCloseModal = this.openCloseModal.bind(this)
    }


    async getData() {
        var theId = await AsyncStorage.getItem('@Helper:userId');

        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'getServicesInArea',
                    userId: theId,
                })
            });

            let res = await response.json();
            this.setState({ showProgress: false })
            console.log("__ res__", res);
            this.setState({ data: res.result.data })


        } catch (error) {
            this.setState({ error: error });
        }

    }


    UNSAFE_componentWillMount() {
        // this.getData()

    }

    openCloseModal(val) {
        if (val != '') {
            this.setState({ select: val })
        } else {
            this.setState({ select: {} })

        }
        this.setState({ modal: !this.state.modal, viewModalUserData: 0 })
    }
    changeViewMode(viewMode) {
        this.setState({ viewMode: viewMode })
    }
    async acceptServiceAction(serviceData) {

        const userId = await AsyncStorage.getItem('@Helper:userId');

        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'acceptService',
                    userId: userId,
                    name: serviceData.name,
                    serviceId: serviceData.id,
                    serviceType: serviceData.type
                })
            });

            let res = await response.json();

            if (response.status >= 200 && response.status < 300) {
                this.setState({ viewModalUserData: 1 })
                // this.getData()

            } else {

            }
        } catch (error) {

        }
        // console.log(serviceData);

    }
    render() {

        var listComponent
        if (this.state.data.length > 0) {

            listComponent = this.state.data.map((val, i) => {

                return <TouchableOpacity onPress={() => { this.openCloseModal(val) }} style={{ marginRight: 13, marginLeft: 13, padding: 10, backgroundColor: '#EEEEEE', paddingHorizontal: 13, marginBottom: height * 0.01 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "row" }} >
                            <View>
                                <Text style={[styles.TextStyle, { color: '#BB0000', fontSize: 16, }]}>{val.name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.03, top: 10 }}>
                            <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 14, alignSelf: 'center' }]}>{val.creation_date}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 16, marginTop: height * 0.005 }]}>{val.description}</Text>
                    </View>
                </TouchableOpacity>
            })
        }

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
                <View style={{ flexDirection: 'row', marginTop: height * 0.02, marginBottom: height * 0.02, paddingLeft: 10 }}>
                    <TouchableOpacity onPress={() => this.changeViewMode(1)}>
                        <MapIcon style={[(this.state.viewMode == 1) ? { color: '#BB0000' } : { color: 'gray' }, { fontSize: 25, alignItems: 'center', lineHeight: 32, paddingHorizontal: 7 }]}
                            name={'map-marked-alt'} size={23} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeViewMode(2)}>
                        <ListIcon style={[(this.state.viewMode == 2) ? { color: '#BB0000' } : { color: 'gray' }, { fontSize: 25, alignItems: 'center', lineHeight: 32, paddingHorizontal: 7 }]} name={'format-list-checkbox'} size={23} />
                    </TouchableOpacity>
                </View>



                {this.state.viewMode == 1 &&
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
                }


                {this.state.viewMode == 2 &&
                    <View>
                        <ScrollView>
                            <View style={{ display: 'flex', marginTop: height * 0.02 }}>
                                {listComponent}
                            </View>
                        </ScrollView>
                    </View>
                }


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
                            }} style={{ position: "absolute",padding:10, left: 0, top: -20 }}>
                                <Icon style={{ backgroundColor: "#fff", borderRadius: 40 }} name='closecircle' size={33} color='#BB0000' />
                            </TouchableOpacity>


                            {this.state.viewModalUserData == 1 ?
                                <View style={{ alignItems: 'center' }}>

                                    <Text style={[styles.TextStyle, { color: '#BB0000', fontSize: 18, textAlign: 'center' }]}>{this.state.select.fname}</Text>
                                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { Linking.openURL('tel:' + this.state.select.phone.replace(" ", "")) }}>
                                        <Icon name={'phone'} size={20} color='#BB0000' />
                                        <Text style={[styles.TextStyle, { marginLeft: 7, color: '#1B1919', fontSize: 18, textAlign: 'center' }]}>{this.state.select.phone}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ alignItems: 'center' }}>

                                    <Text style={[styles.TextStyle, { color: '#BB0000', fontSize: 16, textAlign: 'center' }]}>{this.state.select.name}</Text>
                                    <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 16, textAlign: 'center' }]}>{this.state.select.description}</Text>

                                    <TouchableOpacity onPress={() => this.acceptServiceAction(this.state.select)} style={[{ borderRadius: 20, marginTop: height * 0.03, marginBottom: height * 0.02, backgroundColor: '#BB0000', flexDirection: "row", justifyContent: 'center' }]}>
                                        <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, lineHeight: 32, textAlign: 'center', width: '50%' }]}>{strings.helpNow}</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    </View>
                </Modal>
            </Container>


        )
    }
}
