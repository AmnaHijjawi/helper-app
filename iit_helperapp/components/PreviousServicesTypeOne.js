import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Badge, Spinner } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton, StudentsTab } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
var config = require('./Config.js')

export default class PreviousServicesTypeOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            isRTL: this.props.isRTL,
            userId: '232-a91ad7de5901bb8694a5b23ce4a57031',
            showProgress: true,
            showHide: true,
            data: [],
        };
    }
    async componentWillMount() {
    }
    showHide = () => {
        this.setState({
            showHide: !this.state.showHide,
        })
    }
    componentDidMount() {
        this.getUsreData();
    }
    renderLoading() {
        if (this.state.showProgress) {
            return (
                <Spinner color='#ff9619' style={styles.loader} />
            );
        }
    }
    async getUsreData() {
        this.setState({ showProgress: true });
        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    'type': 'getVolunteerService',
                    'userId': this.state.userId,
                })
            });
            let res = await response.json();

            this.setState({ showProgress: false, data: Object.values(res.result) });
        } catch (error) {
            alert(error);
        }
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
                        <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.03, top: 10 }}>
                            <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 14, alignSelf: 'center' }]}>{val.date}</Text>
                        </View>
                    </View >
            })
        }

        return (
            <Container>
                {this.renderLoading()}
                {component != '' ?
                    <ScrollView>
                        <View style={{ flexDirection: "row", paddingTop: 35 }}>
                            <Image style={{ marginLeft: 10, marginRight: 5, width: width * 0.08, height: width * 0.08, marginTop: -10 }} resizeMode={'contain'} source={require('./images/Hand.png')} />
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 14, color: '#201F1F', fontWeight: "bold" }}>{strings.ServicesIVolunteered}</Text>
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
                    <Text style={[styles.TextStyle, { textAlign: 'center', color: '#1B1919', fontSize: 22, marginTop: height * 0.3 }]}>{strings.emptyMsg}</Text>
                }
            </Container>
        )

    }
}

