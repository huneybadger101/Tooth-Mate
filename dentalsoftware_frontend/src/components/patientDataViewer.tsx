import { Text, View, Button } from "@nodegui/react-nodegui";
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
            console.log(res.data.result);
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
        console.log("Called by index: " + index)
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const patientList = this.state.patients;
        let patientListStrings = [];

        for (let i in patientList) {
            patientListStrings.push(<Button style="width: 50px;" text={patientList[i].FirstName + " " + patientList[i].LastName} on={this.buttonHandler}/>)
        }

        const selectedPatientNHI = this.state.selectedPatientNHI;
        const selectedPatientName = this.state.selectedPatientName;
        const selectedPatientDOB = this.state.selectedPatientDOB;
        const selectedPatientNumber = this.state.selectedPatientNumber;
        const selectedPatientEmail = this.state.selectedPatientEmail;
        const selectedPatientNotes = this.state.selectedPatientNotes;


        return (
            <View style="flex: auto;">
                <View style="flex: auto; flex-direction: 'column';">
                    <Text>Selectable List of Patients: </Text>
                    {patientListStrings}
                    <View style="flex: auto; flex-direction: 'column';">
                        <Text>Patient NHI: {selectedPatientNHI}</Text>
                        <Text>Patient Name: {selectedPatientName}</Text>
                        <Text>Patient Date of Birth: {selectedPatientDOB}</Text>
                        <Text>Patient Contact Number: {selectedPatientNumber}</Text>
                        <Text>Patient Email Address: {selectedPatientEmail}</Text>
                        <Text>Patient Notes: {selectedPatientNotes}</Text>
                    </View>
                </View>
            </View>
        );
    }
} 

export default PatientDataViewer;
