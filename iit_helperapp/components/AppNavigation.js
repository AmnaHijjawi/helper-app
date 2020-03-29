import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    I18nManager,
    ScrollView,
    Platform,
    View,
    Text,
    BackHandler,
    Linking,

    Alert,
    Keyboard, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon5 from 'react-native-vector-icons/AntDesign';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainStyle from './style/mainStyle';
import Strings from './Translation.js';
import SplashScreen from './SplashScreen';
import Home from './Home';
import Login from './Login';
import ConfirmationCode from './ConfirmationCode';
import EditProfile from './EditProfile';
import UserLoc from './UserLoc';
import VolunteerForm from './VolunteerForm';
import ContactUs from './ContactUs';
import ContactUsSuccessMSG from './ContactUsSuccessMSG';
import PreviousServicesTypeOne from './PreviousServicesTypeOne';
import PreviousServicesTypeTow from './PreviousServicesTypeTow';
import Services from './Services';
import NeedHelpForm from './NeedHelpForm';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNRestart from 'react-native-restart'
import Drawer from 'react-native-circle-drawer'
import Share, { ShareSheet } from 'react-native-share';

var IS_RTL = I18nManager.isRTL;
// I18nManager.forceRTL(true);
var config = require('./Config.js')

export const { width: width, height: height } = Dimensions.get('window');
export default class MainNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRTL: IS_RTL,
            // title: 'Helper'
        }
        this.openDrawer = this.openDrawer.bind(this)

        this._onDirectionChange = this._onDirectionChange.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }
    openDrawer() {
        this.refs.DRAWER.open()
    }
    closeDrawer() {
        this.refs.DRAWER.close()
    }

    shareProject(link) {

        // this.refs.DRAWER.close()

        let shareOptions = {
            title: 'Helper',
            url: this.link,
            subject: '',
            message: '',
        };
        // alert("share")
        // this.setState({ showFooter: false });
        // this.setState({ visibleShareModal: true });
        Share.open(shareOptions);

    }

    async getData() {
        var theId = await AsyncStorage.getItem('@Helper:userId');

        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'getAPPsLinks',
                })
            });

            let res = await response.json();
            if (Platform.OS == 'android') {
                this.link = res.result.android
            } else {
                this.link = res.result.ios
            }
            console.warn
        } catch (error) {
            this.setState({ error: error });
        }

    }
    async componentDidMount() {
        this.userId = null
        this.getData()
    }

    onBackPress = () => {
        if (this.currentRouteName == 'SplashScreen') {
            BackHandler.exitApp()
            return true;
        }
        return false;
    };

    async _onDirectionChange(navigation) {
        IS_RTL = !IS_RTL
        I18nManager.forceRTL(IS_RTL);
        RNRestart.Restart();
    }

    async UNSAFE_componentWillMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    async returnToPage(page, params) {
        this.refs.DRAWER.close()

        this.nav.navigate(page, params)
    }


    async backNav(navigation) {
        if (!navigation.goBack(null)) { }

    }

    // menu() {
    //     var r = this.renderSideMenu()
    //     console.log(r['_55'])
    //     this.menu = r['_55']
    // }

    render() {

        backBtn = !IS_RTL ? 'arrow-forward' : 'arrow-back'

        backNav = this.backNav
        langS = this._onDirectionChange


        if (IS_RTL) {
            strings = Strings.ar

        }
        else {
            strings = Strings.enUS
        }

        styles = MainStyle.returnStyles(IS_RTL);

        RTL = IS_RTL
        const BackBtn = ({ navigation, home }) => {



            if (home != 1) {
                return (
                    <TouchableOpacity style={{ margin: 10 }}>
                        <IconMaterial
                            name={backBtn} color={'#fff'} size={25} onPress={() => this.backNav(navigation)}
                        />
                    </TouchableOpacity>
                )
            } else {
                return <View />
            }
        }




        const IndexHeaderRight = ({ navigation, Headertitle, type }) => (
            <TouchableOpacity style={{ flexDirection: "row"},Platform.OS =='android'?{padding: 20 }:{paddingLeft:20}}
                // onPress={() => this.menu()}
                onPress={() => this.openDrawer(navigation)}
            >
                <IconMaterial size={22} color='#fff' name='menu' />
            </TouchableOpacity>

        );

        var DrawerBox = ({ navigation }) => (
            <View style={{ flex: 1 }}>
                <Image source={require('./images/menu.png')} />
                <View style={{ height: height * 0.05 }}>
                    <TouchableOpacity onPress={() => { this.returnToPage('Home', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <Image source={require('./images/home.png')} />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.Home}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.returnToPage('EditProfile', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <Image source={require('./images/account.png')} />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.MyAccount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.returnToPage('PreviousServicesTypeTow', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <Image source={require('./images/last.png')} />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.PreviousServices}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.returnToPage('PreviousServicesTypeOne', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <IconAwesome5 style={{ color: '#D98080', fontSize: 20 }} name='hand-holding-heart' />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.PreviousVolunteers}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.returnToPage('Services', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <Image source={require('./images/last.png')} />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.Services}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.returnToPage('ContactUs', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <Image source={require('./images/contactUs.png')} />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.contactUs}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.shareProject('') }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        <Image source={require('./images/share.png')} />
                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.share}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this._onDirectionChange() }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
                        {/* <Image source={require('./images/share.png')} /> */}
                        <Icon style={{ color: '#D98080', fontSize: 20 }} name='language' />

                        <Text style={[styles.TextStyle,
                        { color: '#201F1F', fontSize: 17, marginLeft: 10, }]} >{strings.lang}</Text>
                    </TouchableOpacity>
                    {Platform.OS === 'ios' && <TouchableOpacity onPress={() => this.closeDrawer()} style={{ borderRadius: width * 0.15, width: width * 0.15, height: width * 0.15, backgroundColor: '#BB0000', justifyContent: "center", alignItems: "center", alignSelf: 'center', marginTop: width * 0.2 }}>
                    <Icon5 name="close" color='#fff' size={30} style={{ position: 'absolute', backgroundColor: '002C87', alignSelf: 'center' }} />

                </TouchableOpacity>}
                </View>
            </View>

        );

        let TitleHeader = (props, title, home) => {
            const { navigation } = props;
            const { state, setParams } = navigation;
            const { params } = state;
            // title = title != '' && title != undefined ? title : this.state.title
            this.nav = navigation
            return {
                title: title,
                headerLeft: () => <IndexHeaderRight />,
                headerRight: () => <BackBtn navigation={navigation} home={home} />,
                headerStyle: { elevation: 0, backgroundColor: '#BB0000' },
                headerTitleStyle: {
                    color: '#fff',
                    fontWeight: "200",

                    fontFamily: strings.FontFamily,
                },
            }
        };

        Home.navigationOptions = (props) => TitleHeader(props, strings.Home, 1);
        // Login.navigationOptions = (props) => TitleHeader(props, strings.Login);
        EditProfile.navigationOptions = (props) => TitleHeader(props, strings.MyAccount);
        VolunteerForm.navigationOptions = (props) => TitleHeader(props, strings.VolunteerForm);
        ContactUs.navigationOptions = (props) => TitleHeader(props, strings.contactUs);
        PreviousServicesTypeOne.navigationOptions = (props) => TitleHeader(props, strings.PreviousVolunteers);
        PreviousServicesTypeTow.navigationOptions = (props) => TitleHeader(props, strings.PreviousServices);
        Services.navigationOptions = (props) => TitleHeader(props, strings.Services);
        NeedHelpForm.navigationOptions = (props) => TitleHeader(props, strings.NeedHelpForm);

        SplashScreen.navigationOptions = ({ navigation }) => {
            return {
                headerShown: false,
            };
        };

        Login.navigationOptions = ({ navigation }) => {
            return {
                headerShown: false,
            };
        };
        ConfirmationCode.navigationOptions = ({ navigation }) => {
            return {
                headerShown: false,
            };
        };

        UserLoc.navigationOptions = ({ navigation }) => {
            return {
                headerShown: false,
            };
        };
        ContactUsSuccessMSG.navigationOptions = ({ navigation }) => {
            return {
                headerShown: false,
            };
        };


        const MainNavigatorNav = createStackNavigator(

            {

                SplashScreen: SplashScreen,
                Home: Home,
                Login: Login,
                ConfirmationCode: ConfirmationCode,
                EditProfile: EditProfile,
                UserLoc: UserLoc,
                VolunteerForm: VolunteerForm,
                Services: Services,
                UserLoc: UserLoc,
                ContactUs: ContactUs,
                ContactUsSuccessMSG: ContactUsSuccessMSG,
                PreviousServicesTypeOne: PreviousServicesTypeOne,
                PreviousServicesTypeTow: PreviousServicesTypeTow,
                NeedHelpForm: NeedHelpForm,
            },
            {
                initialRouteName: 'SplashScreen',

            }
        );
        const App = createAppContainer(MainNavigatorNav);
        return (
            <Drawer primaryColor={'#fff'}
                secondaryColor={'#424242'}
                cancelColor={'#BB0000'}
                sideMenu={<DrawerBox />}
                //  sideMenu={this.renderSideMenu()}
                ref="DRAWER">
                <App ref={nav => { this.navigator = nav; }}
                    onNavigationStateChange={async (prevState, currentState, action) => {
                        this.currentRouteName = currentState.routes[currentState.index].routeName;
                        this.page = null
                        // this.userId = Math.random();
                        var theId
                        this.userId=theId = await AsyncStorage.getItem('@Helper:userId');
                        if (currentState.routes[currentState.index].index != undefined && currentState.routes[currentState.index].index != null) {
                            d = currentState.routes[currentState.index].index

                            if (currentState.routes[currentState.index].routes[d].index != undefined && currentState.routes[currentState.index].routes[d].index != null) {
                                d2 = currentState.routes[currentState.index].routes[d].index
                                this.page = currentState.routes[currentState.index].routes[d].routes[d2].routeName
                            }
                        }
                        
                        if ((action.type == "Navigation/BACK" && this.currentRouteName == 'SplashScreen')|| (action.type == "Navigation/BACK" && this.currentRouteName == 'UserLoc' && theId != null)) {
                            BackHandler.exitApp()
                        }



                    }} />
            </Drawer>

        )
    }
}
