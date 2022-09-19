import { Text, View, Button, LineEdit, ComboBox } from "@nodegui/react-nodegui";
import React from "react";
import axios from 'axios';
import Alert from "./alert";
import QuoteHelper from './quoteHelper';

declare type ComboBoxItem = {
    text: string;
};


export class QuoteCreator extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            quotes: null,
            bookings: [],
            bookingsRawData: null,
            patients: null,
            accounts: null,
            currentPatient: null,
            currentDentist: null,
            currentBooking: null,
            currentTotalCost: "",
            alertView: null,
            selectedPatientNHI: null,
            selectedPatientName: null,
            selectedPatientDOB: null,
            selectedPatientNumber: null,
            selectedPatientEmail: null,
            selectedPatientNotes: null,
        }

        if (QuoteHelper.alreadyRun == undefined) {
            QuoteHelper.alreadyRun = 0;
        } 

        axios.post('http://localhost:3000/quotes/getAllQuotes')
        .then((resQuotes) => {
            axios.post('http://localhost:3000/bookings/getAllBookings')
            .then((resBookings) => {
                axios.post('http://localhost:3000/patients/getAllPatientData')
                .then((resPatients) => {
                    axios.post('http://localhost:3000/accounts/getAllAccounts')
                    .then((resAccounts) => {

                        let bookings: ComboBoxItem[] = [];
                        for (let i = 0; i < resBookings.data.result.length; i++) {
                            for (let k = 0; k < resPatients.data.result.length; k++) {
                                if (resPatients.data.result[k]['ID'] == resBookings.data.result[i]['Patient']) {
                                    bookings.push({text: resBookings.data.result[i]['ID'] + ": " + resPatients.data.result[k]['FirstName'] + " " + resPatients.data.result[k]['LastName'] + " - Date: " + resBookings.data.result[i]['Date'].split("T")[0]})
                                }
                            }
                        }
                        this.setState({
                            quotes: resQuotes.data.result,
                            bookings: bookings,
                            bookingsRawData: resBookings.data.result,
                            patients: resPatients.data.result,
                            accounts: resAccounts.data.result,
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
            })
            .catch((err) => {
                console.log(err)
            });
        })
        .catch((err) => {
            console.log(err)
        });

    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        let alertView = <View/>;

        const updateState = (id: any) => {
            if (QuoteHelper.alreadyRun == 0) {
                let bookingID = null;
                let patientID = null;
                let dentistID = null;
                let patient = null;
                for (let i = 0; i < this.state.bookingsRawData.length; i++) {
                    let tempName = this.state.bookingsRawData[i]['ID'];
                    if (id == tempName) {
                        bookingID = this.state.bookingsRawData[i]['ID'];
                        patientID = this.state.bookingsRawData[i]['Patient'];
                        dentistID = this.state.bookingsRawData[i]['Dentist'];
                        for (let k = 0; k < this.state.patients.length; k++) {
                            if (this.state.patients[k]['ID'] == this.state.bookingsRawData[i]['Patient']) {
                                patient = this.state.patients[k];
                                this.setState({
                                    currentBooking: bookingID,
                                    currentPatient: patientID,
                                    currentDentist: dentistID,
                                    selectedPatientNHI: patient['NHI'],
                                    selectedPatientName: patient['FirstName'] + " " + patient['LastName'],
                                    selectedPatientDOB: patient['DOB'],
                                    selectedPatientNumber: patient['ContactNumber'],
                                    selectedPatientEmail: patient['Email'],
                                    selectedPatientNotes: patient['Notes']
                                })
                                break;
                            }
                        }
                        break;
                    }
                }
                QuoteHelper.alreadyRun = 25;
            } else {
                QuoteHelper.alreadyRun--;
            }
        }

        const textHandlerBookingSelected = {
            currentTextChanged: (currentText:any) =>{

                updateState(currentText.split(":")[0])
                
            }
        }

        const textHandlerCost = {
            textChanged: (textValue:any) =>{
                this.setState({
                    currentTotalCost: textValue.replace(/[^0-9.! ]+/g, '')
                })
            }
        }

        const alertDismissController = () => {
            this.setState({
                alertView: null
            })
        }

        const submitQuote = {
            clicked: async () => {
                let quoteData = {
                    patientID: this.state.currentPatient,
                    dentistID: this.state.currentDentist,
                    bookingID: this.state.currentBooking,
                    totalCostDollars: this.state.currentTotalCost.split(".")[0],
                    totalCostCents: this.state.currentTotalCost.split(".")[1]
                }
                axios.post('http://localhost:3000/quotes/createNewQuote', null, {
                    headers: {
                        'data': JSON.stringify(quoteData)
                    }
                })
                .then((res) => {
                    if (res.data.error) {
                        alertView = <Alert title={"Error"} message={res.data.error} style={"background-color: 'red'; width: 600px; height: 400px;"} dismissAlert={alertDismissController}></Alert>
                    } else {
                        alertView = <Alert title={"Success"} message={"Added quote to database!"} style={"background-color: 'green'; width: 300px; height: 100px;"} dismissAlert={alertDismissController}></Alert>
                    }
                    this.setState({
                        alertView: alertView
                    })
                })
                .catch((err) => {
                    console.log(err)
                    alertView = <Alert title={"Error"} message={err} style={"background-color: 'red'; width: 600px; height: 400px;"} dismissAlert={alertDismissController}></Alert>
                    this.setState({
                        alertView: alertView
                    })
                })
            }
        }

        const textStyle = "color: 'black'; font-size: 20px;";

        return (
            <View style="flex: auto;">
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Booking</Text>
                    <ComboBox style={"flex: 2;"} items={this.state.bookings} currentText={"Please select a booking"} on={textHandlerBookingSelected} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Total Cost</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerCost} text={"$" + this.state.currentTotalCost} />
                </View>
                <Button text={"Submit"} on={submitQuote}></Button>
                <Text style={textStyle}>Selected Booking Information:</Text>
                <View style="flex: 2; flex-direction: 'column';">
                        <Text>Patient NHI: {this.state.selectedPatientNHI}</Text>
                        <Text>Patient Name: {this.state.selectedPatientName}</Text>
                        <Text>Patient Date of Birth: {this.state.selectedPatientDOB}</Text>
                        <Text>Patient Contact Number: {this.state.selectedPatientNumber}</Text>
                        <Text>Patient Email Address: {this.state.selectedPatientEmail}</Text>
                        <Text>Patient Notes: {this.state.selectedPatientNotes}</Text>
                    </View>
                {this.state.alertView}
            </View>
        );
    }
} 

export default QuoteCreator;