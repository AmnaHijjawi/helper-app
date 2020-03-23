import React, { Component } from 'react';
import { Linking, Platform, I18nManager, AppRegistry, View, Image, Modal, Alert, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Input, Item, Spinner, Segment, Button, Header, Body } from 'native-base';
export const { width: width, height: height } = Dimensions.get('window');
import { StandardButton } from './ToBeReused'
import AsyncStorage from '@react-native-community/async-storage';
var config = require('./Config.js')

let pushNote;
export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userId: '230',
            name: '',
            nationalId: '',
            platNo: '',
            serviceType: '',
            area: '',
            description: ''
        };
    }
    async editUserData() {
        try {
            let response = await fetch(config.DOMAIN + 'getData.php', {
                method: 'POST',
                body: JSON.stringify({
                    'type': 'editUser',
                    'name': this.state.name,
                    'userId': this.state.userId,
                    'nationalId': this.state.nationalId,
                    'platNo': this.state.platNo,
                    'serviceType': this.state.serviceType,
                    'area': this.state.area,
                    'serviceDesc': this.state.description
                })
            });
            let res = await response.json();
        } catch (error) {
            alert(error);
        }
    }
    UNSAFE_componentWillMount() {
    }
    componentDidMount() {
    }
    goToPage(page, param) {
        this.props.navigation.navigate(page, param);
    }
    setServiceType(val) {
        this.setState({ serviceType: val })
    }
    render() {
        var component
        if (this.state.data.length > 0) {



            component = this.state.data.map((val, i) => {
                return (
                    <TouchableOpacity onPress={() => { this.goToPage('CafeteriaItems', { categoryId: val.id, studentId: this.state.studentId }) }} key={i} style={[{ marginBottom: height * 0.06, width: '35%' }]}>
                        <Image resizeMode='contain' style={{ width: width * 0.15, height: width * 0.15, alignSelf: "center" }}

                            source={{ uri: val.image }}
                        // source={{ uri: val.image }}
                        />
                        <Text style={[styles.TextStyle, styles.catsStyles]}>{val.name}</Text>
                        {/* <Text style={[styles.TextStyle, styles.catsStyles]}>{strings[val.name]}</Text> */}
                    </TouchableOpacity>
                )
            })
        }

        return (
            <Container>
                <Content>
                    <Form>


                        <TouchableOpacity onPress={() => this.setServiceType(1)}>
                            <Text>IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setServiceType(2)}>
                            <Text>Out</Text>
                        </TouchableOpacity>
                        {this.state.serviceType == 2 &&
                            <View>
                                <Item regular>
                                    <Input name='name' value={this.state.name} onChangeText={(text) => this.setState({ name: text })} placeholder='Name' />
                                </Item>
                                <Item regular>
                                    <Input name='nationalId' value={this.state.nationalId} onChangeText={(text) => this.setState({ nationalId: text })} placeholder='National Id' />
                                </Item>
                                <Item regular>
                                    <Input name='area' value={this.state.area} onChangeText={(text) => this.setState({ area: text })} placeholder='Area' />
                                </Item>
                                <Item regular>
                                    <Input name='platNo' value={this.state.platNo} onChangeText={(text) => this.setState({ platNo: text })} placeholder='PlatNo' />
                                </Item>
                            </View>
                        }
                        {this.state.serviceType == 1 &&
                            <Item regular>
                                <Input name='description' value={this.state.description} onChangeText={(text) => this.setState({ description: text })} placeholder='Description' />
                            </Item>
                        }
                        <TouchableOpacity onPress={() => this.editUserData()}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </Form>
                </Content>
            </Container>


        )
    }
}
