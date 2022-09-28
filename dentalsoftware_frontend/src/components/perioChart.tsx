import { Button, Text, View } from "@nodegui/react-nodegui";
import React from "react";
import axios from 'axios';
import { toothNames } from "./Calendarhelpers/comboBoxVariables";
import ChartView from "./chartView";

export class PerioChart extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            patient: null,
            patientTeeth: null,
            selectedTooth: null,
            showSelectedTooth: false,
            selectedToothQuadrantIndex: 0
        }

        axios.post('http://localhost:3000/patients/getAllPatientData')
        .then((resPatients) => {
            let id;
            for (let i = 0; i < resPatients.data.result.length; i++) {
                //if (this.props.NHI == resPatients.data.result[i]['NHI']) {
                if ("ASD231" == resPatients.data.result[i]['NHI']) {
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
                    this.setState({
                        patient: resPatientsByID.data.result['patient'][0],
                        patientTeeth: resPatientsByID.data.result['patientTeeth'],
                        booking: booking
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
                            <View style="width: 300px; height: 300px; margin: 10px; flex-direction: 'column'; border: 1px solid black; background-color: 'white';">
                                <View style="flex-direction: 'row'; justify-content: 'space-between';">
                                    <View style={"margin-top: 5px; margin-left: 5px; background-color: 'pink'; float: 'left'; height: 91px; width: " + ((selectedTooth['leftUpperPocketGap'] + 4) * 7.5) + "px;"}/>
                                    <View style={"margin-top: 5px; margin-right: 5px; background-color: 'pink'; float: 'right'; height: 91px; width: " + ((selectedTooth['rightUpperPocketGap'] + 1) * 7.5) + "px;"}/>
                                </View>
                                <View style="flex-direction: 'row'; justify-content: 'space-between';">
                                    <View style={"margin-top: 5px; margin-left: 5px; background-color: 'pink'; float: 'left'; height: 91px; width: " + ((selectedTooth['leftMiddlePocketGap'] + 2) * 7.5) + "px;"}/>
                                    <View style={"margin-top: 5px; margin-right: 5px; background-color: 'pink'; float: 'right'; height: 91px; width: " + ((selectedTooth['rightMiddlePocketGap'] + 1.24) * 7.5) + "px;"}/>
                                </View>
                                <View style="flex-direction: 'row'; justify-content: 'space-between';">
                                    <View style={"margin-top: 5px; margin-left: 5px; background-color: 'pink'; float: 'left'; height: 91px; width: " + ((selectedTooth['leftLowerPocketGap'] + 7.2) * 7.5) + "px;"}/>
                                    <View style={"margin-top: 5px; margin-right: 5px; background-color: 'pink'; float: 'right'; height: 91px; width: " + ((selectedTooth['rightLowerPocketGap'] + 12) * 7.5) + "px;"}/>
                                </View>
                            </View>
                            <View style="flex-direction: 'column'; margin-top: 10px;">
                                <Text>Perio Data</Text>
                                <Text>Upper Left Pocket: {selectedTooth['leftUpperPocketGap'] + 4}mm</Text>
                                <Text>Middle Left Pocket: {selectedTooth['leftMiddlePocketGap'] + 2}mm</Text>
                                <Text>Lower Left Pocket: {selectedTooth['leftLowerPocketGap'] + 7.2}mm</Text>
                                <Text>Upper Right Pocket: {selectedTooth['rightUpperPocketGap'] + 1}mm</Text>
                                <Text>Middle Right Pocket: {selectedTooth['rightMiddlePocketGap'] + 1.24}mm</Text>
                                <Text>Lower Right Pocket: {selectedTooth['rightLowerPocketGap'] + 12}mm</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {

            return (
                <ChartView callback={callback} name={(this.state.patient['FirstName'] + " " + this.state.patient['LastName'] + "'s Perio Chart")}/>
            );
        }
    }
} 

export default PerioChart;
