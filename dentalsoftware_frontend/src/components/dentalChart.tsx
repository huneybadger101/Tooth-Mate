import { Button, Text, View } from "@nodegui/react-nodegui";
import React from "react";
import axios from 'axios';
import { toothNames } from "./Calendarhelpers/comboBoxVariables";
import ChartView from "./chartView";
import Alert from "./alert";

export class DentalChart extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            patient: null,
            patientTeeth: null,
            patientTeethQuadrant: null,
            selectedTooth: null,
            showSelectedTooth: false,
            selectedToothQuadrantIndex: 0,
            alertView: null
        }

        axios.post('http://localhost:3000/patients/getAllPatientData')
        .then((resPatients) => {
            let id;
            for (let i = 0; i < resPatients.data.result.length; i++) {
                //if (this.props.NHI == resPatients.data.result[i]['NHI']) {
                if ("USA125" == resPatients.data.result[i]['NHI']) {
                    id = resPatients.data.result[i]['ID'];
                    break;
                }
            }
            axios.post('http://localhost:3000/patients/getPaitientDataByID', null, {
                headers: {
                    'id': id
                }
            })
            .then((resPatientsByID) => {
                axios.post('http://localhost:3000/bookings/getAllBookings')
                .then((resBookings) => {
                    let booking;
                    for (let i = 0; i < resBookings.data.result.length; i++) {
                        if (resBookings.data.result[i]['ID'] == props.bookingID) {
                            booking = resBookings.data.result[i];
                            break;
                        }
                    }
                    let alert = <View/>
                    if (resPatientsByID.data.result['patient'][0]['ExistingConditions'] != null) {
                        let conditionData = JSON.parse(resPatientsByID.data.result['patient'][0]['ExistingConditions']);
                        let message = "";
                        for (let i = 0; i < conditionData['ExistingConditionsNames'].length; i++) {
                            message += conditionData['ExistingConditionsNames'][i] + " - " + conditionData['ExistingConditionsNotes'][i] + "\n\n"
                        }
                        alert = <Alert title={"Patient Pre-Existing Conditions"} message={message} style={"background-color: 'orange'; width: 600px; height: 400px;"} dismissAlert={this.alertDismissController}/>
                    }
                    this.setState({
                        patient: resPatientsByID.data.result['patient'][0],
                        patientTeeth: resPatientsByID.data.result['patientTeeth'],
                        patientTeethQuadrant: resPatientsByID.data.result['patientTeethQuadrant'],
                        booking: booking,
                        alertView: alert
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

    }

    alertDismissController = () => {
        this.setState({
            alertView: null
        })
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        if (this.state.patient == null) {
            return (<View></View>)
        }

        const callback = (number:number) => {
            this.setState({
                showSelectedTooth: true,
                selectedTooth: number
            })
        }

        if (this.state.showSelectedTooth) {

            let selectedTooth = this.state.patientTeeth[this.state.selectedTooth];
            let selectedToothQuadrants = [];

            for (let i = 0; i < this.state.patientTeethQuadrant.length; i++) {
                if (this.state.patientTeethQuadrant[i]['Tooth'] == this.state.selectedTooth + 1) {
                    console.log(this.state.patientTeethQuadrant[i])
                    selectedToothQuadrants.push(this.state.patientTeethQuadrant[i])
                }
            }

            return (
                <View style="flex: 1; justify-content: 'center'; align-items: 'center'; border: 1px solid black;">
                    <View style="flex-direction: 'column';">
                        <View style="flex-direction: 'row';">
                            <Button text="Back" on={{
                                clicked: () => {
                                    this.setState({
                                        showSelectedTooth: false
                                    })
                                }
                            }}/>
                            <View style="flex-direction: 'column';">
                                <Text>Patient Name: {this.state.patient['FirstName'] + " " + this.state.patient['LastName']}</Text>
                                <Text>Patient DOB: {this.state.patient['DOB'].split("T")[0]}</Text>
                            </View>
                            <View style="flex-direction: 'column';">
                                <Text>Tooth Number: {selectedTooth['ToothID']}</Text>
                                <Text>Tooth Name: {toothNames(selectedTooth['ToothID'])}</Text>
                            </View>
                        </View>
                        <View style="flex-direction: 'row';">
                            <View style="flex-direction: 'column';">
                                <View style="flex-direction: 'row';">
                                    <Button style={(selectedToothQuadrants[0]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="1" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 0
                                            })
                                        }
                                    }}/>
                                    <Button style={(selectedToothQuadrants[1]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="2" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 1
                                            })
                                        }
                                    }}/>
                                    <Button style={(selectedToothQuadrants[2]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="3" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 2
                                            })
                                        }
                                    }}/>
                                </View>
                                <View style="flex-direction: 'row';">
                                    <Button style={(selectedToothQuadrants[3]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="4" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 3
                                            })
                                        }
                                    }}/>
                                    <Button style={(selectedToothQuadrants[4]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="5" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 4
                                            })
                                        }
                                    }}/>
                                    <Button style={(selectedToothQuadrants[5]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="6" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 5
                                            })
                                        }
                                    }}/>
                                </View>
                                <View style="flex-direction: 'row';">
                                    <Button style={(selectedToothQuadrants[6]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="7" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 6
                                            })
                                        }
                                    }}/>
                                    <Button style={(selectedToothQuadrants[7]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="8" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 7
                                            })
                                        }
                                    }}/>
                                    <Button style={(selectedToothQuadrants[8]['AffectedArea'] ? "background: 'Grey';" : "") + "height: 100px; width: 100px;"} text="9" on={{
                                        clicked: () => {
                                            this.setState({
                                                selectedToothQuadrantIndex: 8
                                            })
                                        }
                                    }}/>
                                </View>
                            </View>
                            <View style="flex-direction: 'column';">
                                <Text>Tooth Details (Quadrant {this.state.selectedToothQuadrantIndex + 1})</Text>
                                <Text>Last Procedure: {this.state.booking['ProcedureName']}</Text>
                                <Text>Quadrant Notes: {selectedToothQuadrants[this.state.selectedToothQuadrantIndex]['Notes']}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {

            return (
                <ChartView callback={callback} name={(this.state.patient['FirstName'] + " " + this.state.patient['LastName'] + "'s Dental Chart")} alert={this.state.alertView}/>
            );
        }
    }
} 

export default DentalChart;
