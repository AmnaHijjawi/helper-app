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
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0069 //0.09//0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

// const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;



export default class UserLoc extends Component {

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
            location: {
                latitude: parseFloat(LATITUDE),
                longitude: parseFloat(LONGITUDE),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            error: false,
            info: props.navigation.getParam('info', { verify: 0 }),
            showProgress: true,
        };
        this.goToPage = this.goToPage.bind(this);
    }
    goToPage(page, param) {

        this.props.navigation.navigate(page, param)


    }
    redirectPage() {
        var redirectID = 'PreviousServicesTypeTow'
        this.props.navigation.navigate(redirectID, {});
    }
    async  checkLoc(num, val) {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = position.coords.longitude;
                //getting the Longitude from the location json
                const currentLatitude = position.coords.latitude;
                //getting the Latitude from the location json
                this.setState({
                    error: false,
                    location: {
                        latitude: parseFloat(currentLatitude),
                        longitude: parseFloat(currentLongitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                })

            },
            (error) => {
                // alert(error.message)

                if (error.code == 2) {
                    this.setState({ error: true })
                }
            }
            ,
            {
                enableHighAccuracy: false, timeout: 20000,
            }
        );
    }
   

    componentDidMount() {
        this.checkLoc()
    }
async confirm(){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?language=ar&latlng=" + this.state.location.latitude + "," +  this.state.location.longitude + "&key=AIzaSyDS3zDY54x0LOmE-CqTpigigRac6s0FnUw")
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=21.543656,39.201650&key=AIzaSyAv73ZPwjhkG-Z7bWpue9YCz57sXrFWMMo&language=ar
    .then((response) => response.json())
    .then(async (responseJson) => {
        console.log((responseJson.results));
        if (responseJson.results.length > 0) {
            var foundLocality
            var localityValue
            var foundSubLocality
            var subLocalityValue
            var foundneighbor
            var neighborValue
            // if (responseJson.results[0].formatted_address) {
            responseJson.results.map( async function (item1) {

                item1.address_components.map(async function (item) {
                    foundLocality = item.types.find(element => element == "locality");
                    foundSubLocality = item.types.find(element => element == "sublocality");
                    foundneighbor = item.types.find(element => element == "neighborhood");

                    if (foundLocality != undefined && localityValue != '') {
                        localityValue = item.long_name
                    }
                    if (foundSubLocality != undefined && subLocalityValue != '') {
                        subLocalityValue = item.long_name
                    }
                    if (foundneighbor != undefined && neighborValue != '') {
                        neighborValue = item.long_name
                    }
                })
            })
            // alert(localityValue)
            // setLocality(localityValue)
            // setSubLocality(subLocalityValue)
            console.warn(localityValue + ' , ' + subLocalityValue + ' , ' + neighborValue)
            if (subLocalityValue == undefined) {
                subLocalityValue = neighborValue
                responseJson.results[0].formatted_address = responseJson.results[0].formatted_address + ' ,' + neighborValue

            }
            // setStreetName(responseJson.results[0].formatted_address)

            // locCheck(localityValue, subLocalityValue)
            var theId = await AsyncStorage.getItem('@Helper:userId');

            try {
                let response = await fetch(config.DOMAIN + 'getData.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'editUserLocation',
                        userId: theId,
                        lat: this.state.location.latitude,
                        lon: this.state.location.longitude,
                        locality :localityValue,
                        sublocality :subLocalityValue,
                        fullAddress:responseJson.results[0].formatted_address
                    })
                });
        
                let res = await response.json();
                this.redirectPage()
        
            } catch (error) {
                this.setState({ error: error });
            }

        }
    })
  
}
    render() {
        return (
            <Container>
                <Content style={{ margin: width * 0.1 }}>
                    <View style={{}}>
                        <Image resizeMode='contain' style={{ alignSelf: 'center' }}
                            source={require('./images/loc.png')}
                        />

                    </View>

                    {this.state.error && <View style={{ marginTop: height * 0.04, alignItems: 'center' }}>
                        <Text style={[styles.TextStyle, { textAlign: "center", fontSize: 19, color: '#636363' }]}>
                            {strings.locAsk}
                        </Text>



                    </View>}
                    <TouchableOpacity style={[styles.TextStyle, { width: width * 0.5, alignSelf: "center", borderRadius: 20, margin: height * 0.01, backgroundColor: '#BB0000', flexDirection: "row", justifyContent: 'center' }]} 
                    onPress={() =>this.state.error? this.checkLoc() :  this.confirm()}>
                    {this.state.error ? <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32 }]}>{strings.retry}</Text>
                    :  <Text style={[styles.TextStyle, { color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32 }]}>{strings.confirm}</Text>
    }  
                    {/* <IconMaterial style={{ color: '#FFFFFF', fontSize: 19, alignItems: 'center', lineHeight: 32, paddingHorizontal: 7 }} name={backBtn} size={23} /> */}
                    </TouchableOpacity>
                    <View style={[styles.brancheBox]}>




                        {/* <View style={{
                            padding: 6,
                            marginTop: 10,
                            borderWidth: 1.3,
                            borderColor: '#BEBEBE',
                        }}> */}
                        <View style={mapStyles.mapContainer}>

                            <MapView
                                style={mapStyles.map}
                                ref={ref => { this.map = ref; }}
                                provider={PROVIDER_GOOGLE}
                                // showsUserLocation={true}
                                followsUserLocation={true}

                                region={this.state.location}
                            // onRegionChange={this.onRegionChange}
                            >
                                <Marker
                                    coordinate={this.state.location}
                                    title={''}
                                    description={''}
                                />

                            </MapView>


                            {/* </View> */}
                        </View>


                    </View>
                </Content>
            </Container>
        )
    }
}


const mapStyles = StyleSheet.create({
    mapContainer: {
        // padding:20,
        height: height * 0.33,
        // position: 'absolute',subTotal,Shipping,total
        // borderWidth:1.3,
        // borderColor:'#BEBEBE', OrderDate: 'تاريخ الطلب',

        // OrderId: 'رقم الطلب',

        // tax: 'الضريبة',
        // payBy:'طريقة الدفع',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 36,

        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
