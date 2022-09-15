import { Text, View, Button } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import axios from 'axios';

export class PatientDataViewer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            patients: null,
            bookings: null
        }

        axios.post('http://localhost:3000/getAllPatientData')
        .then((res) => {
            axios.post('http://localhost:3000/getAllBookings')
            .then((resBookings) => {

                this.setState({
                    patients: res.data.result,
                    bookings: resBookings.data.result,
                    selectedPatientNHI: null,
                    selectedPatientName: null,
                    selectedPatientDOB: null,
                    selectedPatientNumber: null,
                    selectedPatientEmail: null,
                    selectedPatientNotes: null,
                    selectedLastBooking: null,
                    selectedNextBooking: null
                })

            })
            .catch((err) => {
                console.log(err)
            });
        })
        .catch((err) => {
            console.log(err)
        });

    }

    buttonHandler = (index: number) => {
        const patient = this.state.patients[index];
        let currentDate = new Date();
        let booking = [];
        let lastBooking;
        let nextBooking;

        for (let i = 0; i < this.state.bookings.length; i++) {
            if (this.state.bookings[i]['Patient'] == patient['ID']) {
                booking.push(this.state.bookings[i]);
            }
        }

        for (let i = 0; i < booking.length; i++) {
            let tempDate = new Date(booking[i]['Date']);
            if (tempDate < currentDate) {
                lastBooking = booking[i]['Date'];
            } else if (tempDate > currentDate) {
                nextBooking = booking[i]['Date'];
            }
        }

        if (lastBooking == undefined) {
            lastBooking = "No previous bookings!"
        }

        if (nextBooking == undefined) {
            nextBooking = "No upcoming bookings!"
        }

        this.setState({
            selectedPatientNHI: patient['NHI'],
            selectedPatientName: patient['FirstName'] + " " + patient['LastName'],
            selectedPatientDOB: patient['DOB'],
            selectedPatientNumber: patient['ContactNumber'],
            selectedPatientEmail: patient['Email'],
            selectedPatientNotes: patient['Notes'],
            selectedLastBooking: lastBooking,
            selectedNextBooking: nextBooking
        })
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const patientList = this.state.patients;
        let patientListStrings = [];

        for (let i in patientList) {
            patientListStrings.push(<Button style="flex: 1; color: 'black'; font-size: 35px;" text={patientList[i].FirstName + " " + patientList[i].LastName} on={
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

        const selectedPatientLastBooking = this.state.selectedLastBooking;
        const selectedPatientNextBooking = this.state.selectedNextBooking;

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
                        <Text style={textStyle}>{selectedPatientName}'s Last Booking: {selectedPatientLastBooking}</Text>
                        <Text style={textStyle}>{selectedPatientName}'s Next Booking: {selectedPatientNextBooking}</Text>
                    </View>
                </View>
            </View>
        );
    }
} 

export default PatientDataViewer;
