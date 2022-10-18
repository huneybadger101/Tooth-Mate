import { Text, View, Button, LineEdit, ComboBox } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import ToothCreator from "./ToothCreator";
import axios from "axios";
import { toothComboBox, treatmentList, treatmentListTreatments } from "./Calendarhelpers/comboBoxVariables";
import PlainTextEditWrapper from "./PlainTextEditWrapper";

declare type ComboBoxItem = {
    text: string;
};

export class TicketCreator extends React.Component<any, any> {


    updateCheck:number;

    constructor(props: any) {
        super(props);

        this.updateCheck = 0;

        let patients: ComboBoxItem[] = [];

        this.state = {
            patientID: props.patient,
            patients: props.patients,
            patient: null,
            editingVisits: [{
                VisitNumber: 0,
                Patient: 0,
                PatientIndex: 0,
                Procedure: "",
                ProcedureIndex: 0,
                Tooth: "",
                ToothIndex: 0,
                Notes: ""
            }],
            editingSelectedVisit: 0,
            editingSelectedTooth: 0,
            currentTeeth: [],
            editingNumVisits: 0,
            editingNumTeeth: 0,
            selectedIndex: null,
            patientsViewed: patients
        }

        for (let i = 0; i < this.state.patients.length; i++) {
            if (this.state.patients[i]['ID'] == this.state.patientID) {
                patients.push({text: this.state.patients[i]['FirstName'] + " " + this.state.patients[i]['LastName']})
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
                Patient: this.state.patientID,
                Procedure: this.state.editingVisits[i]['Procedure'],
                Tooth: this.state.editingVisits[i]['Tooth'],
                Notes: this.state.editingVisits[i]['Notes']
            })
        }
        let data = {
            ticket: {
                PatientID: this.state.patientID,
                NumberOfVisits: this.state.editingVisits.length
            },
            ticketVisit: visits,
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

    addVisit = () => {
        let currentVisits = this.state.editingVisits;
        let newVisitNumber = 0;
        for (let i = 0; i < currentVisits.length; i++) {
            if (currentVisits[i]['VisitNumber'] >= newVisitNumber) {
                newVisitNumber = Number(currentVisits[i]['VisitNumber']) + 1;
            }
        }
        currentVisits.push({
            VisitNumber: 0,
            Patient: 0,
            PatientIndex: 0,
            Procedure: "",
            ProcedureIndex: 0,
            Tooth: "",
            ToothIndex: 0,
            Notes: ""
        })
    
        this.setState({
            editingVisits: currentVisits,
            editingSelectedVisit: currentVisits.length - 1,
            editingSelectedTooth: 0,
            editingNumVisits: currentVisits.length - 1,
        })

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

    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const move = (num:number, oldNum:number) => {
            this.updateCheck = 1;
            if (num < 0 || num >= this.state.editingVisits.length) {
                return;
            } else {
                this.setState({
                    editingSelectedVisit: num
                })
                let data = this.getData(num)
            }
            this.updateCheck = 0;
        }


         //Handles when a patient is selected in the menu
         const textHandlerPatientSelected = {
            currentTextChanged: (currentText:any) =>{
                let patientID = null;
                for (let i = 0; i < this.state.patients.length; i++) {
                    let tempName = this.state.patients[i]['FirstName'] + " " + this.state.patients[i]['LastName'];
                    if (currentText == tempName) {
                        patientID = this.state.patients[i]['ID'];
                        this.state.editingVisits[this.state.editingSelectedVisit]['PatientIndex'] = i;
                        break;
                    }
                }
                this.state.editingVisits[this.state.editingSelectedVisit]['Patient'] = patientID;
                this.setState({
                    patientID: patientID
                })
            }
        }

        //Handles and changes the text for the procedure type during booking edit and creation
        const indexHanlderProcedure = {
            currentIndexChanged: (index:any) =>{

                this.state.editingVisits[this.state.editingSelectedVisit]['ProcedureIndex'] = index;
                this.state.editingVisits[this.state.editingSelectedVisit]['Procedure'] = treatmentListTreatments(index);               
            }
        }

        const indexHanlderTooth = {
            currentIndexChanged: (index:any) =>{
               
                this.state.editingVisits[this.state.editingSelectedVisit]['ToothIndex'] = index;
                this.state.editingVisits[this.state.editingSelectedVisit]['Tooth'] = toothComboBox()[index].text;
            }
        }

        const textHandlerNotes = (textValue:String) => {
            this.state.editingVisits[this.state.editingSelectedVisit]['Notes'] = textValue
        }

        const editingView = 
        <View style="flex: auto; flex-direction: 'column';">
            <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Visit {this.state.editingSelectedVisit + 1}</Text>
            <View style="margin: 0px; flex-direction: 'row';">
                <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient</Text>
                <ComboBox style={"flex: 2;"} enabled={false} editable={false} items={this.state.patientsViewed} currentIndex={this.state.editingVisits[this.state.editingSelectedVisit]['PatientIndex']} on={textHandlerPatientSelected} />
            </View>
            <View style="margin-left: 10px; flex-direction: 'row';">
                <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Tooth</Text>
                <ComboBox style={"flex: 2;"} items={toothComboBox()} currentIndex={this.state.editingVisits[this.state.editingSelectedVisit]['ToothIndex']} on={indexHanlderTooth} />
            </View>
            <View style="margin-left: 10px; flex-direction: 'row';">
                <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure</Text>
                <ComboBox style={"flex: 2;"} items={treatmentList()} currentIndex={this.state.editingVisits[this.state.editingSelectedVisit]['ProcedureIndex']} on={indexHanlderProcedure} />
            </View>
            <View style="margin-left: 10px; flex-direction: 'row';">
                <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Notes</Text>
                <PlainTextEditWrapper callback={textHandlerNotes} style={"flex: 2;"}/>
            </View>
        </View>

        return (
            <View id="mainView" style="flex: auto;">
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
                            [WidgetEventTypes.MouseButtonRelease]: () => this.addVisit(),
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
