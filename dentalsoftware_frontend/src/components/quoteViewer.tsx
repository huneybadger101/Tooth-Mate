import { Button, Text, View } from "@nodegui/react-nodegui";
import React from "react";
import axios from 'axios';
import { createPDF } from './quotePDFGenerator';
import {  QFileDialog, FileMode } from "@nodegui/nodegui";

export class QuoteViewer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            quotes: null
        }

        axios.post('http://localhost:3000/quotes/getAllQuotes')
        .then((resQuotes) => {
            axios.post('http://localhost:3000/bookings/getAllBookings')
            .then((resBookings) => {
                axios.post('http://localhost:3000/patients/getAllPatientData')
                .then((resPatients) => {
                    axios.post('http://localhost:3000/accounts/getAllAccounts')
                    .then((resAccounts) => {
                        this.setState({
                            quotes: resQuotes.data.result,
                            bookings: resBookings.data.result,
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

        const createPDFButtonHandler = (quoteData:any):any => {

            let patient:any;
            let booking:any;
            let dentist:any;

            for (let i = 0; i < this.state.patients.length; i++) {
                if (this.state.patients[i]["ID"] == quoteData['Patient']) {
                    patient = this.state.patients[i];
                    break;
                }
            }

            for (let i = 0; i < this.state.bookings.length; i++) {
                if (this.state.bookings[i]["ID"] == quoteData['Booking']) {
                    booking = this.state.bookings[i];
                    break;
                }
            }

            for (let i = 0; i < this.state.accounts.length; i++) {
                if (this.state.accounts[i]["ID"] == quoteData['Dentist']) {
                    dentist = this.state.accounts[i];
                    break;
                }
            }

            let fileDialog = new QFileDialog();
            fileDialog.setFileMode(FileMode.Directory);
            fileDialog.setNameFilter('text (*txt)');
            fileDialog.exec();
            let selectedFiles = fileDialog.selectedFiles();
            selectedFiles.map((file)=>{
                let data = {
                    id: quoteData['ID'],
                    date: new Date().toString().split(" (")[0],
                    paymentStatus: quoteData['QuotePaymentStatus'],
                    paymentDeadline: quoteData['QuotePaymentDeadline'],
                    totalCost: quoteData['QuoteTotalCostDollars'] + "." + quoteData['QuoteTotalCostCents'],
                    patientName: patient['FirstName'] + " " + patient['MiddleName'] + " " + patient['LastName'],
                    patientNHI: patient['NHI'],
                    patientDOB: patient['DOB'],
                    patientContactNumber: patient['ContactNumber'],
                    patientEmailAddress: patient['Email'],
                    bookingID: booking['ID'],
                    bookingDate: booking['Date'],
                    bookingTime: booking['Time'],
                    bookingDentistName: dentist['AccountName'],
                    bookingLocation: booking['Location'],
                    bookingNotes: booking['Notes'],
                    bookingProcedure: booking['ProcedureName']
                };
                createPDF(data, file + "/Quote_" + quoteData['ID'] + "_Booking_" + booking['ID'] + ".pdf");
            })
        }

        const quoteList = this.state.quotes;
        let quoteViews = [];

        for (let i in quoteList) {
            quoteViews.push(
            <View>
                <Text>Quote ID: {quoteList[i]['ID']}</Text>
                <Text>Quote Creation Date: {quoteList[i]['QuoteCreationDate']}</Text>
                <Text>Quote Payment Status: {quoteList[i]['QuotePaymentStatus']}</Text>
                <Text>Quote Total Cost: ${quoteList[i]['QuoteTotalCostDollars']}.{quoteList[i]['QuoteTotalCostCents']}</Text>
                <Text>Quote Payment Deadline: {quoteList[i]['QuotePaymentDeadline']}</Text>
                <Button text={"Export Quote as PDF"} on={
                    {
                        clicked: () => {createPDFButtonHandler(quoteList[i])}
                    }
                }></Button>
            </View>
            )
        }

        const textStyle = "color: 'black'; font-size: 35px;";

        return (
            <View style="flex: auto;">
                <View style="flex: auto; flex-direction: 'row';">
                    <View style="flex: 1; background-color: 'grey';">
                        <Text style={textStyle}>Selectable List of Quotes: </Text>
                        <View style="flex: auto;">
                            {quoteViews}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
} 

export default QuoteViewer;
