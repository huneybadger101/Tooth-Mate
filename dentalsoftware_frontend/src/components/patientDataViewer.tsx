import { Text, View, Button } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import axios from 'axios';

export class PatientDataViewer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            patients: null
        }

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

        const patientList = this.state.patients;
        let patientListStrings = [];

        for (let i in patientList) {
            patientListStrings.push(<Button style="flex: 1; width: 100px; color: 'black'; font-size: 35px;" text={patientList[i].FirstName + " " + patientList[i].LastName} on={
                    {
                        // Only trigger when left click is released
                        [WidgetEventTypes.MouseButtonRelease]: () => this.buttonHandler(Number(i)),
                    }
                }/>
            )
        }

        const selectedPatientNHI = this.state.selectedPatientNHI;
        const selectedPatientName = this.state.selectedPatientName;
        const selectedPatientDOB = this.state.selectedPatientDOB;
        const selectedPatientNumber = this.state.selectedPatientNumber;
        const selectedPatientEmail = this.state.selectedPatientEmail;
        const selectedPatientNotes = this.state.selectedPatientNotes;

        const textStyle = "color: 'black'; font-size: 35px;";

        return (
            <View style="flex: auto;">
                <View style="flex: auto; flex-direction: 'row';">
                    <View style="flex: 1; background-color: 'grey';">
                        <Text style={textStyle}>Selectable List of Patients: </Text>
                        <View style="flex: auto;">
                            {patientListStrings}
                        </View>
                    </View>

                    <View style="flex: 2; flex-direction: 'column';">
                        <Text style={textStyle}>Patient NHI: {selectedPatientNHI}</Text>
                        <Text style={textStyle}>Patient Name: {selectedPatientName}</Text>
                        <Text style={textStyle}>Patient Date of Birth: {selectedPatientDOB}</Text>
                        <Text style={textStyle}>Patient Contact Number: {selectedPatientNumber}</Text>
                        <Text style={textStyle}>Patient Email Address: {selectedPatientEmail}</Text>
                        <Text style={textStyle}>Patient Notes: {selectedPatientNotes}</Text>
                    </View>

                    <View style="flex: 2; flex-direction: 'column';">
                        <Text style={textStyle}>Details here about patients last visit:</Text>
                        <Text style={textStyle}>Details here about patients next booking:</Text>
                    </View>
                </View>
            </View>
        );
    }
} 

export default PatientDataViewer;
