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

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainStyle from './style/mainStyle';
import Strings from './Translation.js';
import SplashScreen from './SplashScreen';
import Home from './Home';

import Icon from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNRestart from 'react-native-restart'
import Drawer from 'react-native-circle-drawer'
import Share, { ShareSheet } from 'react-native-share';

var IS_RTL = I18nManager.isRTL;
export const { width: width, height: height } = Dimensions.get('window');
export default class MainNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRTL: IS_RTL,
            title: 'Helper'
        }
        this.openDrawer = this.openDrawer.bind(this)

        this._onDirectionChange = this._onDirectionChange.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
    }
    openDrawer() {
        this.refs.DRAWER.open()
    }

    shareProject(link) {

        // this.refs.DRAWER.close()

        let shareOptions = {
            title: 'Helper',
            url: 'app link ',
            subject: '',
            message: '',
        };
        // alert("share")
        // this.setState({ showFooter: false });
        // this.setState({ visibleShareModal: true });
        Share.open(shareOptions);

    }


    async componentDidMount() {
        this.userId = null
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
        const BackBtn = ({ navigation }) => {
            return (
                <TouchableOpacity style={{ margin: 10 }}>
                    <IconMaterial
                        name={backBtn} color={'#fff'} size={25} onPress={() => this.backNav(navigation)}
                    />
                </TouchableOpacity>
            )
        }




        const IndexHeaderRight = ({ navigation, Headertitle, type }) => (
            <TouchableOpacity style={{ flexDirection: "row", padding: 20 }}
                // onPress={() => this.menu()}
                onPress={() => this.openDrawer(navigation)}
            >
                <Icon size={22} color='#fff' name='menu' />
            </TouchableOpacity>

        );

        // var DrawerBox = ({ navigation }) => (
        //     <View style={{ flex: 1 }}>
        //         <Image source={require('./images/drawerLogo.png')} />
        //         <View style={{ height: height * 0.05 }}>
        //             <TouchableOpacity onPress={() => { this.returnToPage('Home', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
        //                 <Image source={require('./images/homeOR.png')} />
        //                 <Text style={[styles.TextStyle,
        //                 { color: '#0566A5', fontSize: 17, marginLeft: 10, }]} >{strings.Home}</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity style={{ marginTop: height * 0.02, flexDirection: "row" }}>
        //                 <Image source={require('./images/accountOR.png')} />
        //                 <Text style={[styles.TextStyle,
        //                 { color: '#0566A5', fontSize: 17, marginLeft: 10, }]} >{strings.MyAccount}</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity onPress={() => { this.returnToPage('Notification') }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
        //                 <Image source={require('./images/notifications_icon.png')} />
        //                 <Text style={[styles.TextStyle,
        //                 { color: '#0566A5', fontSize: 17, marginLeft: 10, }]} >{strings.Notification}</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity onPress={() => { this.returnToPage('ContactUs', {}) }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
        //                 <Image source={require('./images/contactUs.png')} />
        //                 <Text style={[styles.TextStyle,
        //                 { color: '#0566A5', fontSize: 17, marginLeft: 10, }]} >{strings.contactUs}</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity onPress={() => { this._onDirectionChange() }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
        //                 <Image source={require('./images/lang.png')} />
        //                 <Text style={[styles.TextStyle,
        //                 { color: '#0566A5', fontSize: 17, marginLeft: 10, }]} >{strings.lang}</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity onPress={() => { this.shareProject('') }} style={{ marginTop: height * 0.02, flexDirection: "row" }}>
        //                 <Image source={require('./images/share.png')} />
        //                 <Text style={[styles.TextStyle,
        //                 { color: '#0566A5', fontSize: 17, marginLeft: 10, }]} >{strings.share}</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>

        // );

        let TitleHeader = (props, title) => {
            const { navigation } = props;
            const { state, setParams } = navigation;
            const { params } = state;
            title = title != '' && title != undefined ? title : this.state.title
            this.nav = navigation
            return {
                title: title,
                headerLeft: () => <IndexHeaderRight />,
                headerRight: () => <BackBtn navigation={navigation} />,
                headerStyle: { elevation: 0, backgroundColor: '#003F6D' },
                headerTitleStyle: {
                    color: '#fff',
                    // fontSize:17
                    fontWeight: 'bold',
                },
            }
        };

        Home.navigationOptions = (props) => TitleHeader(props, strings.Home);
    
        SplashScreen.navigationOptions = ({ navigation }) => {
            return {
                headerShown: false,
            };
        };
      

        const MainNavigatorNav = createStackNavigator(

            {
                SplashScreen: SplashScreen,
                Home: Home,
          
            },
            {
                initialRouteName: 'SplashScreen',

            }
        );
        const App = createAppContainer(MainNavigatorNav);
        return (
            <App ref={nav => { this.navigator = nav; }}
                    onNavigationStateChange={async (prevState, currentState, action) => {
                        this.currentRouteName = currentState.routes[currentState.index].routeName;
                        this.page = null
                        // this.userId = Math.random();
                        this.userId = await AsyncStorage.getItem('@Helper:userId');
                        if (currentState.routes[currentState.index].index != undefined && currentState.routes[currentState.index].index != null) {
                            d = currentState.routes[currentState.index].index

                            if (currentState.routes[currentState.index].routes[d].index != undefined && currentState.routes[currentState.index].routes[d].index != null) {
                                d2 = currentState.routes[currentState.index].routes[d].index
                                this.page = currentState.routes[currentState.index].routes[d].routes[d2].routeName
                            }
                        }
                        if (action.type == "Navigation/BACK" && this.currentRouteName == 'SplashScreen') {
                            BackHandler.exitApp()
                        }

                    }} />
        )
    }
}