import { LineEdit, View, Button } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import axios from 'axios';

export class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: null,
            password: null
        }
        /*
        axios.post('http://localhost:3000/getAllPatientData')
        .then((res) => {
            this.setState({
                patients: res.data.result,
                selectedPatientNHI: null,
                selectedPatientName: null,
                selectedPatientDOB: null,
                selectedPatientNumber: null,
                selectedPatientEmail: null,
                selectedPatientNotes: null
            })
        })
        .catch((err) => {
            console.log(err)
        });
        */
    }

    loginButtonHandler = () => {
        // Send username + password to API for checking, if good then login user, if bad then reject login
        console.log(this.state.username)
        console.log(this.state.password)
    }

    resetPasswordButtonHandler = () => {
        // Add user to a table of users which need a password reset, admin accounts can view the password reset page
    }

    createNewAccountButtonHandler = () => {
        // Create a new user with given username + password
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const loginButton = <Button text="Login" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.loginButtonHandler(),
            }
        }/>

        const resetPasswordButton = <Button text="Reset Password" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.resetPasswordButtonHandler(),
            }
        }/>

        const createNewAccountButton = <Button text="Create New Account" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.createNewAccountButtonHandler(),
            }
        }/>



        return (
            <View style="flex: auto;">
                <View style="flex: auto; flex-direction: 'column';">
                    <View style="flex: 1; background-color: 'grey';">
                        <LineEdit on={{ textChanged: (textValue) => {
                            this.setState({
                                username: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                            })
                        } }} text={this.state.username} placeholderText={"Username"} />
                        <LineEdit on={{ textChanged: (textValue) => {
                            this.setState({
                                password: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                            })
                        } }} text={this.state.password} placeholderText={"Password"} />
                        {loginButton}
                        {resetPasswordButton}
                    </View >
                    <View style="flex: 1; background-color: 'grey';">
                        {createNewAccountButton}
                    </View >
                </View>
            </View>
        );
    }
} 

export default Login;
