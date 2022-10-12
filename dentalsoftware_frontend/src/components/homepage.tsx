import { Button, Text, View } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import Calendar from "./calendar";
import PatientDataViewer from "./PatientDataViewer";
import PatientCreator from "./patientCreator";
import QuoteViewer from "./quoteViewer";
import QuoteCreator from "./quoteCreator";
import TicketCreator from "./TicketCreator";


export class Homepage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
      }

    newTab(component: JSX.Element, name: string) {
        this.props.newTab(component, name)
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        let pagesRow1 = [];
        let pagesRow2 = [];

        
        pagesRow1.push(<Button id="buttonLarge" text="Create New Patient" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<PatientCreator newTab={this.props.newTab}/>, "Patient Creator"),
                }
            }/>)
        pagesRow1.push(<View style="width: 100%;"></View>)
        pagesRow1.push(<Button id="buttonLarge" text="View Patient Data" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<PatientDataViewer newTab={this.props.newTab}/>, "Patient Data Viewer"),
                }
            }/>)
        pagesRow1.push(<View style="width: 100%;"></View>)
        pagesRow1.push(<Button id="buttonLarge" text="Calendar Page" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<Calendar newTab={this.props.newTab}/>, "Calendar"),
                }
            }/>)
        pagesRow2.push(<Button id="buttonLarge" text="Ticket Creator" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<TicketCreator newTab={this.props.newTab}/>, "Ticket Creator"),
                }
            }/>)
        pagesRow2.push(<View style="width: 100%;"></View>)
        pagesRow2.push(<Button id="buttonLarge" text="Quote Creator" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<QuoteCreator newTab={this.props.newTab}/>, "Quote Creator"),
                }
            }/>)
        pagesRow2.push(<View style="width: 100%;"></View>)
        pagesRow2.push(<Button id="buttonLarge" text="View Quotes" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<QuoteViewer newTab={this.props.newTab}/>, "Quote Viewer"),
                }
            }/>)

        return (
            <View id="mainView" style="flex: 1; justify-content: 'center'; align-items: 'center';">
                <View style="flex: 1; flex-direction: 'row';">
                </View>
                <View style="flex: 2; flex-direction: 'row';">
                    {pagesRow1}
                </View>
                <View style="flex: 2; flex-direction: 'row';">
                    {pagesRow2}
                </View>
                
            </View>
        );
    }
} 

export default Homepage;
