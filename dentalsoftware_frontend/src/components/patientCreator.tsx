import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import { NHIcorrectFormatCheck } from "./Calendarhelpers/textFormatFunctions";
import React from "react";
import axios from 'axios';
import Alert from "./alert";

export class PatientDataViewer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            patients: null,
            currentFirstName: "",
            currentMiddleName: "",
            currentLastName: "",
            currentNHI: "",
            currentDOB: "",
            currentContactNumber: "",
            currentEmailAddress: "",
            currentNotes: "",
            alertView: null,
            currentExistingConditionsViews: [],
            currentExistingConditionNames: [],
            currentExistingConditionNotes: []
        }

        axios.post('http://localhost:3000/patients/getAllPatientData')
        .then((res) => {
            this.setState({
                patients: res.data.result,
            })
        })
        .catch((err) => {
            console.log(err)
        });

    }

    buttonHandler = (index: number) => {
        const patient = this.state.patients[index];

        this.setState({
            selectedPatientNHI: patient['NHI'],
            selectedPatientName: patient['FirstName'] + " " + patient['LastName'],
            selectedPatientDOB: patient['DOB'],
            selectedPatientNumber: patient['ContactNumber'],
            selectedPatientEmail: patient['Email'],
            selectedPatientNotes: patient['Notes']
        })
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        if (this.state.patients == null) {
            return (<View/>)
        }

        let alertView = <View/>;

        const textHandlerFirstName = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentFirstName: textValue.replace(/[^a-zA-Z! ]+/g, '')
                })
            }
        }

        const textHandlerMiddleName = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentMiddleName: textValue.replace(/[^a-zA-Z! ]+/g, '')
                })
            }
        }
        const textHandlerLastName = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentLastName: textValue.replace(/[^a-zA-Z! ]+/g, '')
                })
            }
        }

        const textHandlerNHI = {
            textChanged: (textValue:any) =>{

                textValue = textValue.replace(/[^a-zA-Z0-9! ]+/g, '');
                textValue = NHIcorrectFormatCheck(textValue);

                this.setState({
                    currentNHI: textValue
                })
            }
        }

        const textHandlerDOB = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentDOB: textValue
                })
            }
        }

        const textHandlerContactNumber = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentContactNumber: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                })
            }
        }

        const textHandlerEmailAddress = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentEmailAddress: textValue.replace(/[^a-zA-Z0-9@.! ]+/g, '')
                })
            }
        }

        const textHandlerNotes = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentNotes: textValue
                })
            }
        }

        const textHandlerExistingConditionsNames = (textValue:any, index:number) => {
            this.state.currentExistingConditionNames[index] = textValue;
        }

        const textHandlerExistingConditionsNotes = (textValue:any, index:number) => {
            this.state.currentExistingConditionNotes[index] = textValue;
        }

        const alertDismissController = () => {
            this.setState({
                alertView: null
            })
        }

        const submitNewPatient = {
            clicked: () => {
                let result;
                let patientData = {
                    patient_NHI: this.state.currentNHI,
                    patient_First_Name: this.state.currentFirstName,
                    patient_Middle_Name: this.state.currentMiddleName,
                    patient_Last_Name: this.state.currentLastName,
                    patient_DOB: this.state.currentDOB,
                    patient_Contact_Number: this.state.currentContactNumber,
                    patient_Email_Address: this.state.currentEmailAddress,
                    patient_Notes: this.state.currentNotes,
                    patient_Existing_Conditions: (this.state.currentExistingConditionNames != "" ? {ExistingConditionsNames: this.state.currentExistingConditionNames, ExistingConditionsNotes: this.state.currentExistingConditionNotes} : undefined)
                }
                axios.post('http://localhost:3000/patients/createNewPatient', null, {
                    headers: {
                        'data': JSON.stringify(patientData)
                    }
                })
                .then((res) => {
                    if (res.data.error) {
                        result = 1
                        alertView = <Alert title={"Error"} message={res.data.error} style={"background-color: 'red';"} dismissAlert={alertDismissController}></Alert>
                        this.setState({
                            alertView: alertView
                        })
                    } else {
                        result = 0
                        alertView = <Alert title={"Success"} message={"Added booking to database!"} style={"background-color: 'green';"} dismissAlert={alertDismissController}></Alert>
                        this.setState({
                            alertView: alertView,
                            currentFirstName: "",
                            currentMiddleName: "",
                            currentLastName: "",
                            currentNHI: "",
                            currentDOB: "",
                            currentContactNumber: "",
                            currentEmailAddress: "",
                            currentNotes: "",
                            currentExistingConditionNames: [],
                            currentExistingConditionNotes: [],
                            currentExistingConditionsViews: []
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    result = 1
                    alertView = <Alert title={"Error"} message={err} style={"background-color: 'red';"} dismissAlert={alertDismissController}></Alert>
                    this.setState({
                        alertView: alertView
                    })
                })
            }
        }

        const removeExistingCondition = () => {
            this.state.currentExistingConditionNames.pop()
            this.state.currentExistingConditionNotes.pop()
            this.state.currentExistingConditionsViews.pop()
            this.setState(this.state)
        }

        const addExistingCondition = () => {
            let currentIndex = this.state.currentExistingConditionsViews.length;
            this.state.currentExistingConditionsViews.push(
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Condition {this.state.currentExistingConditionsViews.length + 1} Name</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={{textChanged: (text) => textHandlerExistingConditionsNames(text, currentIndex)}} text={this.state.currentExistingConditionNames[currentIndex]} />
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Condition {this.state.currentExistingConditionsViews.length + 1} Notes</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={{textChanged: (text) => textHandlerExistingConditionsNotes(text, currentIndex)}} text={this.state.currentExistingConditionNotes[currentIndex]} />
                </View>
            )
            this.setState(this.state)
        }

        const textStyle = "color: 'black'; font-size: 20px;"; 

        return (
            <View id="mainView" style="flex: auto;">
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient First Name</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerFirstName} text={this.state.currentFirstName} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient Middle Name (Optional)</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerMiddleName} text={this.state.currentMiddleName} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient Last Name</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerLastName} text={this.state.currentLastName} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient NHI Number</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerNHI} text={this.state.currentNHI} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient DOB</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerDOB} text={this.state.currentDOB} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient Contact Number</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerContactNumber} text={this.state.currentContactNumber} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient Email Address</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerEmailAddress} text={this.state.currentEmailAddress} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text id="titleCenterAlign" style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient Notes</Text>
                    <LineEdit id="textEntry" style={"flex: 2;"} on={textHandlerNotes} text={this.state.currentNotes} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Button id="button" text="Remove Existing Condition" on={{pressed: removeExistingCondition}}/>
                    <Button id="button" text="Add Existing Condition" on={{pressed: addExistingCondition}}/>
                </View>
                {this.state.currentExistingConditionsViews.map((view:any)=>{
                        return view
                })}
                
                <View style="margin: 0px; flex-direction: 'row';">
                    <Button id="button" text={"Submit"} on={submitNewPatient}></Button>
                </View>

                {this.state.alertView}
            </View>
        );
    }
} 

export default PatientDataViewer;