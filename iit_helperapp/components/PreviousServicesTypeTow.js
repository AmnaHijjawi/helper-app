import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Badge } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton, StudentsTab } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';


export default class PreviousServicesTypeTow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRTL: this.props.isRTL,
            showProgress: true,
            showHide: true,
            // status: 1 Finished
            // status: 2 Underway
            // status: 3 Waiting
            data: [
                {
                    id: 1,
                    description: '(تعليم عن بعد (الصف الرابع',
                    date: '24/3',
                    status: 1
                },
                {
                    id: 1,
                    description: '(تعليم عن بعد (الرياضيات',
                    date: '25/3',
                    status: 2
                },
                {
                    id: 1,
                    description: '(تعليم عن بعد (الرياضيات',
                    date: '26/3',
                    status: 3
                },
                {
                    id: 1,
                    description: '(تعليم عن بعد (علوم',
                    date: '27/3',
                    status: 1
                },
                {
                    id: 1,
                    description: '(تعليم عن بعد (علوم',
                    date: '28/3',
                    status: 1
                },
                {
                    id: 1,
                    description: '(تعليم عن بعد (الجغرافيا',
                    date: '29/3',
                    status: 1
                },
            ],
        };
    }
    async componentWillMount() {
    }
    showHide = () => {
        this.setState({
            showHide: !this.state.showHide,
        })
    }
    render() {
        var component
        if (this.state.data.length > 0) {

            component = this.state.data.map((val, i) => {
                return <View style={{ padding: 10, flexDirection: "row", backgroundColor: '#EEEEEE', paddingHorizontal: 13 }}>
                    <View style={{ flexDirection: "row" }} >
                        <View>
                            <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 16, }]}>{val.description}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.28, top: 10 }}>
                        <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 14, alignSelf: 'center' }]}>{val.date}</Text>
                    </View>
                    {val.status == 1 ?
                        <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.03, top: 10 }}>
                            <Text style={[styles.TextStyle, { color: '#1B1919', fontSize: 14, alignSelf: 'center' }]}>
                                {strings.HelpWasDone}
                            </Text>
                        </View>
                        :
                        <View style={{ flexDirection: "row", position: 'absolute', right: width * 0.015 }}>
                            {val.status == 2 ?
                                <Badge style={{ backgroundColor: '#BB0000', paddingTop: 3, width: width * 0.2 }}>
                                    <Text style={[styles.TextStyle, { color: '#fff', fontSize: 14, alignSelf: 'center' }]}>
                                        {strings.Underway}
                                    </Text>
                                </Badge>
                                :
                                <Badge style={{ backgroundColor: '#BB0000', paddingTop: 3, width: width * 0.2 }}>
                                    <Text style={[styles.TextStyle, { color: '#fff', fontSize: 14, alignSelf: 'center' }]}>
                                        {strings.Waiting}
                                    </Text>
                                </Badge>
                            }
                        </View>
                    }
                </View >
            })
        }

        return (
            <Container>
                <ScrollView>
                    <View style={{ flexDirection: "row", paddingTop: 35 }}>
                        <Image style={{ marginLeft: 10, marginRight: 5, width: width * 0.08, height: width * 0.08, marginTop: -10 }} resizeMode={'contain'} source={require('./images/Hand.png')} />
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
                    <View style={{ display: this.state.showHide ? 'flex' : 'none', marginTop: 7 }}>
                        {component}
                    </View>

                </ScrollView>
            </Container>
        )

    }
}

