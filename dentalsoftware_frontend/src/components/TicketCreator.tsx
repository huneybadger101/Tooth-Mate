import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import ToothCreator from "./ToothCreator";

export class TicketCreator extends React.Component<any, any> {

    ToothCreatorComponent:any;

    constructor(props: any) {
        super(props);

        this.ToothCreatorComponent = React.createRef();

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

    getTeeth = (teeth:any, index:number) => {
        this.state.editingVisits[index]['Teeth'].push(teeth)
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
            editingNumVisits: num,
        })

        this.ToothCreatorComponent.current.updateViaRef(num - 1);
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

        const move = (num:Number, oldNum:Number) => {
            if (num < 0 || num >= this.state.editingVisits.length) {
                return;
            } else {
                this.setState({
                    editingSelectedVisit: num
                })
                this.ToothCreatorComponent.current.setStateWithDataViaRef(this.state.editingVisits[this.state.editingSelectedVisit]['Teeth'], oldNum);
            }
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

            <ToothCreator ref={this.ToothCreatorComponent} passbackTeeth={this.getTeeth}/>

        </View>

        return (
            <View style="flex: auto;">
                {editingView}
                <View style="flex: auto; flex-direction: 'row';">
                    <Button style="flex: 1;" text={"<"} enabled={(this.state.editingVisits.length > 1 ? true : false)} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => move(this.state.editingSelectedVisit - 1, this.state.editingSelectedVisit),
                        }
                    }/>
                    <Button style="flex: 1;" text={">"} enabled={(this.state.editingVisits.length > 1 ? true : false)} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => move(this.state.editingSelectedVisit + 1, this.state.editingSelectedVisit),
                        }
                    }/>
                </View>
                <View style="flex: auto; flex-direction: 'row';">
                    <Button style="flex: 1;" text={"-"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => this.removeVisit(this.state.editingSelectedVisit),
                        }
                    }/>
                    <Button style="flex: 1;" text={"+"} on={
                        {
                            // Only trigger when left click is released
                            [WidgetEventTypes.MouseButtonRelease]: () => this.addVisit(this.state.editingNumVisits + 1),
                        }
                    }/>
                </View>
            </View>
        );
    }
} 

export default TicketCreator;
