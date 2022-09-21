import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import ToothCreator from "./ToothCreator";
import axios from "axios";

export class TicketCreator extends React.Component<any, any> {

    ToothCreatorComponent:any;

    updateCheck:number;

    constructor(props: any) {
        super(props);

        this.ToothCreatorComponent = React.createRef();

        this.updateCheck = 0;

        this.state = {
            patientID: props.patient,
            patients: props.patients,
            patient: null,
            editingVisits: [{
                Date: new Date().toISOString().split('T')[0],
                Time: new Date().toLocaleTimeString(),
                LengthOfVisit: "60",
                VisitNumber: 0,
                Teeth: []
            }],
            editingSelectedVisit: 0,
            editingSelectedTooth: 0,
            currentTeeth: [],
            editingNumVisits: 0,
            editingNumTeeth: 0,
            selectedIndex: null
        }

        for (let i = 0; i < this.state.patients.length; i++) {
            if (this.state.patients[i]['ID'] == this.state.patientID) {
                this.setState({
                    patient: this.state.patients[i]
                })
            }
        }
    }

    createNewTicket = () => {
        let visits = [];
        for (let i = 0; i < this.state.editingVisits.length; i++) {
            visits.push({
                VisitNumber: this.state.editingVisits[i]['VisitNumber'],
                Date: this.state.editingVisits[i]['Date'],
                Time: this.state.editingVisits[i]['Time'],
                VisitTimeLength: this.state.editingVisits[i]['LengthOfVisit']
            })
        }
        let visitTeeth = [];
        for (let i = 0; i < this.state.editingVisits.length; i++) {
            for (let k = 0; k < this.state.editingVisits[i]['Teeth']['Teeth'].length; k++) {
                visitTeeth.push({
                    VisitNumber: this.state.editingVisits[i]['Teeth']['Index'],
                    Tooth: this.state.editingVisits[i]['Teeth']['TeethIndexes'][k],
                    ToothData: this.state.editingVisits[i]['Teeth']['Teeth'][k],
                    ProcedureName: this.state.editingVisits[i]['Teeth']['Procedures'][k],
                    ProcedureCostDollars: this.state.editingVisits[i]['Teeth']['ProcedureCosts'][k].split("$")[1].split(".")[0],
                    ProcedureCostCents: this.state.editingVisits[i]['Teeth']['ProcedureCosts'][k].split("$")[1].split(".")[1],
                    ProcedureTime: this.state.editingVisits[i]['Teeth']['ProcedureTimes'][k],
                    Notes: this.state.editingVisits[i]['Teeth']['Notes'][k]
                })
            }
        }
        let data = {
            ticket: {
                PatientID: this.state.patientID,
                NumberOfVisits: this.state.editingVisits.length
            },
            ticketVisit: visits,
            ticketVisitTeeth: visitTeeth
        }
        axios.post('http://localhost:3000/tickets/createNewTicket', null, {
            headers: {
                'data': JSON.stringify(data)
            }
        })
        .then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                this.props.changeEdit()
            }

        })
        .catch((err) => {
            console.log(err)
        })
    }

    getVisitIndex = () => {
        return this.state.editingSelectedVisit;
    }

    getData = (index:number) => {
        return this.state.editingVisits[index]['Teeth'];
    }

    getTeeth = (teeth:any) => {
        if (this.updateCheck == 0) {
            this.state.editingVisits[this.state.editingSelectedVisit]['Teeth'] = teeth;
        }
    }

    addVisit = (num:number) => {
        let currentVisits = this.state.editingVisits;
        let newVisitNumber = 0;
        for (let i = 0; i < currentVisits.length; i++) {
            if (currentVisits[i]['VisitNumber'] >= newVisitNumber) {
                newVisitNumber = Number(currentVisits[i]['VisitNumber']) + 1;
            }
        }
        currentVisits.push({
            Date: new Date().toISOString().split('T')[0],
            Time: new Date().toLocaleTimeString(),
            LengthOfVisit: "60",
            VisitNumber: newVisitNumber,
            Teeth: []
        })
    
        this.setState({
            editingVisits: currentVisits,
            editingSelectedVisit: currentVisits.length - 1,
            editingSelectedTooth: 0,
            editingNumVisits: currentVisits.length - 1,
        })

        this.ToothCreatorComponent.current.updateViaRef();
    }

    removeVisit = (index:number) => {
        let currentVisits = this.state.editingVisits;
        if (currentVisits.length == 1) {
            return;
        }
        currentVisits.splice(index, 1);

        this.setState({
            editingVisits: currentVisits,
            editingSelectedVisit: 0,
            editingSelectedTooth: 0,
            editingNumVisits: currentVisits.length - 1,
        })

        this.ToothCreatorComponent.current.resetStateViaRef();
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

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

        const move = (num:number, oldNum:number) => {
            this.updateCheck = 1;
            if (num < 0 || num >= this.state.editingVisits.length) {
                return;
            } else {
                this.setState({
                    editingSelectedVisit: num
                })
                let data = this.getData(num)
                this.ToothCreatorComponent.current.setStateWithDataViaRef(data);
            }
            this.updateCheck = 0;
        }

        const textHandlerTooth = {
            textChanged: (textValue:any) =>{
                this.state.currentTeeth[this.state.editingSelectedTooth]['Tooth'] = textValue
            }
        }

        const textHandlerProcedureName = {
            textChanged: (textValue:any) =>{
                this.state.currentTeeth[this.state.editingSelectedTooth]['ProcedureName'] = textValue
            }
        }

        const textHandlerProcedureCostDollars = {
            textChanged: (textValue:any) =>{
                this.state.currentTeeth[this.state.editingSelectedTooth]['ProcedureCostDollars'] = textValue
            }
        }

        const textHandlerProcedureCostCents = {
            textChanged: (textValue:any) =>{
                this.state.currentTeeth[this.state.editingSelectedTooth]['ProcedureCostCents'] = textValue
            }
        }

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

            <ToothCreator style="flex: auto;" ref={this.ToothCreatorComponent} passbackTeeth={this.getTeeth} getData={this.getData} getVisitIndex={this.getVisitIndex}/>
        
        </View>

        return (
            <View style="flex: auto;">
                {editingView}
                <View style="flex-shrink: 1; flex-direction: 'row';">
                    <Button style="flex: auto;" text={"<"} enabled={(this.state.editingVisits.length > 1 ? true : false)} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => move(this.state.editingSelectedVisit - 1, this.state.editingSelectedVisit),
                        }
                    }/>
                    <Button style="flex: auto;" text={">"} enabled={(this.state.editingVisits.length > 1 ? true : false)} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => move(this.state.editingSelectedVisit + 1, this.state.editingSelectedVisit),
                        }
                    }/>
                </View>
                <View style="flex: auto; flex-direction: 'row';">
                    <Button style="flex: auto;" text={"-"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => this.removeVisit(this.state.editingSelectedVisit),
                        }
                    }/>
                    <Button style="flex: auto;" text={"+"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => this.addVisit(this.state.editingNumVisits + 1),
                        }
                    }/>
                </View>
                <View style="flex: auto; flex-direction: 'row';">
                    <Button style="flex: auto;" text={"Submit New Ticket"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => this.createNewTicket(),
                        }
                    }/>
                </View>
            </View>
        );
    }
} 

export default TicketCreator;
