import { Text, LineEdit, View, Button } from "@nodegui/react-nodegui";
import {  WidgetEventTypes, EchoMode } from "@nodegui/nodegui";
import React from "react";
import axios from 'axios';
import Alert from "./alert";

export class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: null,
            password: null,
            errorMessage: "",
            showCreateOptions: false,
            fullName: null,
            accessLevel: null,
            dentistNumber: null,
            dob: null,
            email: null,
            phone: null,
            alertView: null
        }
    }

    alertDismissController = () => {
        this.setState({
            alertView: null
        })
    }

    loginButtonHandler = () => {
        // Send username + password to API for checking, if good then login user, if bad then reject login
        axios.post('http://localhost:3000/login/loginAccount', null, {
            headers: {
                'username': this.state.username,
                'password': this.state.password,
            }
        })
        .then((res) => {
            if (res['data']['success'] == undefined) {
                this.setState({
                    alertView: <Alert title={"Error"} message={res['data']['error']} style={"background-color: 'red';"} titleStyle={"color: white;"} textStyle={"color: white;"} dismissAlert={this.alertDismissController}/>
                })
            } else {
                this.props.accountHelper.accountName = this.state.username;
                this.props.accountHelper.accountAccessLevel = res.data.result['AccountAccessLevel'];
                this.props.accountHelper.accountAdmin = (this.state.username == "admin");
                this.props.postLogin();
            }
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                alertView: <Alert title={"Error"} message={err} style={"background-color: 'red';"} dismissAlert={this.alertDismissController}/>
            })
        });
    }

    resetPasswordButtonHandler = () => {
        // Add user to a table of users which need a password reset, admin accounts can view the password reset page
    }

    createNewAccountButtonHandler = () => {
        // Create a new user with given username + password
        this.setState({
            showCreateOptions: true
        })
    }

    submitNewAccountButtonHandler = () => {

        let data = {
            'username': this.state.username,
            'password': this.state.password,
            'fullName': this.state.fullName,
            'accessLevel': this.state.accessLevel,
            'dentistNumber': this.state.dentistNumber,
            'DOB': this.state.dob,
            'Email_Address': this.state.email,
            'Contact_Number': this.state.phone
        }

        axios.post('http://localhost:3000/accounts/createNewAccount', null, {
            headers: {
                'data': JSON.stringify(data)
            }
        })
        .then((res) => {
            if (res['data']['result']['affectedRows'] > 0) {
                this.setState({
                    errorMessage: "Successfully created new account! Please login with the details you just submitted.",
                    showCreateOptions: false
                })
            } else {
                this.setState({
                    errorMessage: "Failed to create your account, please try again!",
                })
            }
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                errorMessage: err
            })
        });
        
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const loginButton = <Button id="button" text="Login" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.loginButtonHandler(),
            }
        }/>

        const resetPasswordButton = <Button id="button" text="Reset Password" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.resetPasswordButtonHandler(),
            }
        }/>

        const createNewAccountButton = <Button id="button" text="Create New Account" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.createNewAccountButtonHandler(),
            }
        }/>

        const submitNewAccountButton = <Button id="button" text="Submit" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.submitNewAccountButtonHandler(),
            }
        }/>

        const fullNameText = <LineEdit id="textEntry" on={{ textChanged: (textValue) => {
                                        this.setState({
                                            fullName: textValue.replace(/[^a-zA-Z! ]+/g, '')
                                        })
                                    } }} text={this.state.fullName} placeholderText={"Full Name"} 
                                />

        const accessLevelText = <LineEdit id="textEntry" on={{ textChanged: (textValue) => {
                                        this.setState({
                                            accessLevel: textValue.replace(/[^0-9! ]+/g, '')
                                        })
                                    } }} text={this.state.accessLevel} placeholderText={"Access Level"} 
                                />

        const dentistNumberText = <LineEdit id="textEntry" on={{ textChanged: (textValue) => {
                                    this.setState({
                                        dentistNumber: textValue.replace(/[^0-9! ]+/g, '')
                                    })
                                } }} text={this.state.dentistNumber} placeholderText={"Dentist Number"} 
                            />

        const dobText = <LineEdit id="textEntry" on={{ textChanged: (textValue) => {
                                this.setState({
                                    dob: textValue.replace(/[^a-zA-Z0-9/! ]+/g, '')
                                })
                            } }} text={this.state.dob} placeholderText={"Date of Birth"} 
                        />

        const emailText = <LineEdit id="textEntry" on={{ textChanged: (textValue) => {
                                this.setState({
                                    email: textValue.replace(/[^a-zA-Z0-9@.! ]+/g, '')
                                })
                            } }} text={this.state.email} placeholderText={"Email Address"} 
                        />
        const phoneText = <LineEdit id="textEntry" on={{ textChanged: (textValue) => {
                                this.setState({
                                   phone: textValue.replace(/[^0-9! ]+/g, '')
                                })
                            } }} text={this.state.phone} placeholderText={"Contact Phone Number"} 
                        />
        const errorMessage = <Text>{this.state.errorMessage}</Text>

        return (
            <View style="flex: auto;">
                <View style="flex: auto; flex-direction: 'column';">
                    <View style="flex: 1;">
                        <Text id="titleCenterAlign">Username</Text>
                        <LineEdit id="textEntry" on={{ returnPressed: () => {this.loginButtonHandler()}, textChanged: (textValue) => {
                            this.setState({
                                username: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                            })
                        } }} text={this.state.username} placeholderText={"Username"} />
                        <Text id="titleCenterAlign">Password</Text>
                        <LineEdit id="textEntry" echoMode={EchoMode.Password} on={{ returnPressed: () => {this.loginButtonHandler()}, textChanged: (textValue) => {
                            this.setState({
                                password: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                            })
                        } }} text={this.state.password} placeholderText={"Password"} />
                        {(this.state.showCreateOptions ? <Text id="titleCenterAlign">Full Name</Text> : null)}
                        {(this.state.showCreateOptions ? fullNameText : null)}
                        {(this.state.showCreateOptions ? <Text id="titleCenterAlign">Access Level</Text> : null)}
                        {(this.state.showCreateOptions ? accessLevelText : null)}
                        {(this.state.showCreateOptions ? <Text id="titleCenterAlign">Dentist Number</Text> : null)}
                        {(this.state.showCreateOptions ? dentistNumberText : null)}
                        {(this.state.showCreateOptions ? <Text id="titleCenterAlign">Date of Birth</Text> : null)}
                        {(this.state.showCreateOptions ? dobText : null)}
                        {(this.state.showCreateOptions ? <Text id="titleCenterAlign">Email Address</Text> : null)}
                        {(this.state.showCreateOptions ? emailText : null)}
                        {(this.state.showCreateOptions ? <Text id="titleCenterAlign">Phone Number</Text> : null)}
                        {(this.state.showCreateOptions ? phoneText : null)}
                        {(this.state.showCreateOptions ? submitNewAccountButton : null)}
                        {(!this.state.showCreateOptions ? loginButton : null)}
                        {(!this.state.showCreateOptions ? resetPasswordButton : null)}
                        {(!this.state.showCreateOptions ? createNewAccountButton : null)}
                        {this.state.alertView}
                    </View >
                </View>
            </View>
        );
    }
} 

export default Login;
