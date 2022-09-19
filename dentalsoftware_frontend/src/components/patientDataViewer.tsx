import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import axios from 'axios';

export class PatientDataViewer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            patients: null,
            bookings: null,
            edit: false,
            editingVisits: [],
            editingVisitTeeth: [],
            editingNumVisits: 0,
            editingSelectedVisit: 0,
            editingSelectedTooth: 0,
            editingNumTeeth: 0,
            selectedIndex: null
        }

        axios.post('http://localhost:3000/patients/getAllPatientData')
        .then((res) => {
            axios.post('http://localhost:3000/bookings/getAllBookings')
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
            selectedNextBooking: nextBooking,
            selectedIndex: index
        })
    }

    createTicket = () => {
        this.setState({
            edit: true,
            editingVisits: [{
                Date: new Date().toISOString().split('T')[0],
                Time: new Date().toLocaleTimeString(),
                LengthOfVisit: "60"
            }],
            editingVisitTeeth: [
                {
                    VisitNumber: 0,
                    Tooth: 0, // Make this the id of the first index of the selected patients teeth
                    ProcedureName: "Procedure",
                    ProcedureCostDollars: "10",
                    ProcedureCostCents: "0"
                },
                {
                    VisitNumber: 0,
                    Tooth: 23, // Make this the id of the first index of the selected patients teeth
                    ProcedureName: "ProcedureASDASD",
                    ProcedureCostDollars: "1213120",
                    ProcedureCostCents: "02"
                }
            ],
            editingSelectedVisit: 0,
            editingSelectedTooth: 0,
        })
    }

    addVisit = (num:Number) => {
        let currentVisits = this.state.editingVisits;
        currentVisits.push({
            Date: new Date().toISOString().split('T')[0],
            Time: new Date().toLocaleTimeString(),
            LengthOfVisit: "60"
        })
        let currentTeeth = this.state.editingVisitTeeth;
        currentTeeth.push({
            VisitNumber: currentVisits.length - 1,
            Tooth: 0, // Make this the id of the first index of the selected patients teeth
            ProcedureName: "Procedure",
            ProcedureCostDollars: "10",
            ProcedureCostCents: "0"
        })
        this.setState({
            editingVisits: currentVisits,
            editingVisitTeeth: currentTeeth,
            editingSelectedVisit: currentVisits.length - 1,
            editingSelectedTooth: 0,
            editingNumVisits: num,
            editingNumTeeth: currentTeeth.length - 1
        })
    }

    addTooth = () => {
        let currentTeeth = this.state.editingVisitTeeth;
        currentTeeth.push({
            VisitNumber: this.state.editingSelectedVisit,
            Tooth: 23, // Make this the id of the first index of the selected patients teeth
            ProcedureName: "ProcedureADDEDNEW",
            ProcedureCostDollars: "10",
            ProcedureCostCents: "0"
        })
        this.setState({
            editingVisitTeeth: currentTeeth,
            editingSelectedTooth: currentTeeth.length - 1,
            editingNumTeeth: currentTeeth.length - 1
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

        if (this.state.edit) {

            const textHandlerDate = {
                textChanged: (textValue:any) =>{
                    this.state.editingVisits[this.state.editingSelectedVisit]['Date'] = textValue
                }
            }

            const textHandlerTime = {
                textChanged: (textValue:any) =>{
                    this.state.editingVisits[this.state.editingSelectedVisit]['Time'] = textValue
                }
            }

            const textHandlerLengthOfVisit = {
                textChanged: (textValue:any) =>{
                    this.state.editingVisits[this.state.editingSelectedVisit]['LengthOfVisit'] = textValue
                }
            }

            const changeNumberOfVists = (num:Number) => {
                if (num >= 0 && num > this.state.editingNumVisits) {
                    this.addVisit(num)
                } 
            }

            const move = (num:Number) => {
                if (num < 0 || num >= this.state.editingVisits.length) {
                    return;
                } else {
                    this.setState({
                        editingSelectedVisit: num
                    })
                }
            }

            let currentTeeth:any = [];

            for (let i = 0; i < this.state.editingVisitTeeth.length; i++) {
                if (this.state.editingVisitTeeth[i]['VisitNumber'] == this.state.editingSelectedVisit) {
                    currentTeeth.push(this.state.editingVisitTeeth[i])
                }
            }
            const textHandlerTooth = {
                textChanged: (textValue:any) =>{
                    currentTeeth[this.state.editingSelectedTooth]['Tooth'] = textValue
                }
            }

            const textHandlerProcedureName = {
                textChanged: (textValue:any) =>{
                    currentTeeth[this.state.editingSelectedTooth]['ProcedureName'] = textValue
                }
            }

            const textHandlerProcedureCostDollars = {
                textChanged: (textValue:any) =>{
                    currentTeeth[this.state.editingSelectedTooth]['ProcedureCostDollars'] = textValue
                }
            }

            const textHandlerProcedureCostCents = {
                textChanged: (textValue:any) =>{
                    currentTeeth[this.state.editingSelectedTooth]['ProcedureCostCents'] = textValue
                }
            }

            const moveTooth = (num:Number) => {
                if (num < 0 || num >= currentTeeth.length) {
                    return;
                } else {
                    this.setState({
                        editingSelectedTooth: num
                    })
                }
            }

            let selectedTooth = 
            <View style="flex: auto; flex-direction: 'column';">
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Tooth</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerTooth} text={String(currentTeeth[this.state.editingSelectedTooth]['Tooth'])} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure Name</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerProcedureName} text={currentTeeth[this.state.editingSelectedTooth]['ProcedureName']} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure Cost Dollars</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerProcedureCostDollars} text={currentTeeth[this.state.editingSelectedTooth]['ProcedureCostDollars']} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure Cost Cents</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerProcedureCostCents} text={currentTeeth[this.state.editingSelectedTooth]['ProcedureCostCents']} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Button style="flex: 1;" text={"<"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => moveTooth(this.state.editingSelectedTooth - 1),
                        }
                    }/>
                    <Button style="flex: 1;" text={">"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => moveTooth(this.state.editingSelectedTooth + 1),
                        }
                    }/>
                </View>
                <View style="flex: auto; flex-direction: 'row';">
                        <Button style="flex: 1;" text={"-"} on={
                            {
                                // Only trigger when left click is released
                                [WidgetEventTypes.MouseButtonRelease]: () => this.addTooth(),
                            }
                        }/>
                        <Button style="flex: 1;" text={"+"} on={
                            {
                                // Only trigger when left click is released
                                [WidgetEventTypes.MouseButtonRelease]: () => this.addTooth(),
                            }
                        }/>
                    </View>
            </View>;

            const editingView = 
            <View style="flex: auto; flex-direction: 'column';">
                <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Visit {this.state.editingSelectedVisit + 1}</Text>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Date</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerDate} text={this.state.editingVisits[this.state.editingSelectedVisit]['Date']} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Time</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerTime} text={this.state.editingVisits[this.state.editingSelectedVisit]['Time']} />
                </View>
                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Length of Visit</Text>
                    <LineEdit style={"flex: 2;"} on={textHandlerLengthOfVisit} text={this.state.editingVisits[this.state.editingSelectedVisit]['LengthOfVisit']} />
                </View>

                {selectedTooth}

            </View>

            return (
                <View style="flex: auto;">
                    {editingView}
                    <View style="flex: auto; flex-direction: 'row';">
                        <Button style="flex: 1;" text={"<"} on={
                            {
                                // Only trigger when left click is released
                                [WidgetEventTypes.MouseButtonRelease]: () => move(this.state.editingSelectedVisit - 1),
                            }
                        }/>
                        <Button style="flex: 1;" text={">"} on={
                            {
                                // Only trigger when left click is released
                                [WidgetEventTypes.MouseButtonRelease]: () => move(this.state.editingSelectedVisit + 1),
                            }
                        }/>
                    </View>
                    <View style="flex: auto; flex-direction: 'row';">
                        <Button style="flex: 1;" text={"-"} on={
                            {
                                // Only trigger when left click is released
                                [WidgetEventTypes.MouseButtonRelease]: () => changeNumberOfVists(this.state.editingNumVisits - 1),
                            }
                        }/>
                        <Button style="flex: 1;" text={"+"} on={
                            {
                                // Only trigger when left click is released
                                [WidgetEventTypes.MouseButtonRelease]: () => changeNumberOfVists(this.state.editingNumVisits + 1),
                            }
                        }/>
                    </View>
                </View>
            );
        } else {
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
    
                        <View style="flex: 2; flex-direction: 'column';">
                            <Button style="flex: 1; color: 'black'; font-size: 35px;" text={"Create Ticket"} on={
                                {
                                    // Only trigger when left click is released
                                    [WidgetEventTypes.MouseButtonRelease]: () => this.createTicket(),
                                }
                            }/>
                        </View>
                    </View>
                </View>
            );
        }
    }
} 

export default PatientDataViewer;
