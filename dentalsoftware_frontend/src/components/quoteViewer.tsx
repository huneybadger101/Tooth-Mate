import { Text, View } from "@nodegui/react-nodegui";
import React from "react";
import axios from 'axios';

export class QuoteViewer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            quotes: null
        }

        axios.post('http://localhost:3000/getAllQuotes')
        .then((resQuotes) => {
            axios.post('http://localhost:3000/getAllBookings')
            .then((resBookings) => {
                axios.post('http://localhost:3000/getAllPatientData')
                .then((resPatients) => {
                    axios.post('http://localhost:3000/getAllAccounts')
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

        const quoteList = this.state.quotes;
        let quoteViews = [];

        for (let i in quoteList) {
            console.log(quoteList[i])
            quoteViews.push(
            <View>
                <Text>Quote ID: {quoteList[i]['ID']}</Text>
                <Text>Quote Creation Date: {quoteList[i]['QuoteCreationDate']}</Text>
                <Text>Quote Payment Status: {quoteList[i]['QuotePaymentStatus']}</Text>
                <Text>Quote Total Cost: ${quoteList[i]['QuoteTotalCostDollars']}.{quoteList[i]['QuoteTotalCostCents']}</Text>
                <Text>Quote Payment Deadline: {quoteList[i]['QuotePaymentDeadline']}</Text>
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
