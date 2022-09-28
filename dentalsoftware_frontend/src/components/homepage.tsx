import { Button, Text, View } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";
import Calendar from "./calendar";
import BookingPageDentalCharts from "./Calendarhelpers/bookingDentalChart";
import PatientDataViewer from "./PatientDataViewer";
import PatientCreator from "./patientCreator";
import QuoteViewer from "./quoteViewer";
import QuoteCreator from "./quoteCreator";
//import Setting from "./setting";


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

        let buttonStyle = "width: 400%; height: 200%; color: 'black'; font-size: 20px;";
        
        pagesRow1.push(<Button style={buttonStyle} text="Create New Patient" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<PatientCreator newTab={this.props.newTab}/>, "Patient Creator"),
                }
            }/>)
        pagesRow1.push(<View style="width: 100%;"></View>)
        pagesRow1.push(<Button style={buttonStyle} text="Calendar Page" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<Calendar newTab={this.props.newTab}/>, "Calendar"),
                }
            }/>)
        pagesRow2.push(<Button style={buttonStyle} text="Quote Creator" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<QuoteCreator newTab={this.props.newTab}/>, "Quote Creator"),
                }
            }/>)
        pagesRow2.push(<View style="width: 100%;"></View>)
        pagesRow2.push(<Button style={buttonStyle} text="View Quotes" on={
                {
                    // Only trigger when left click is released
                    [WidgetEventTypes.MouseButtonRelease]: () => this.newTab(<QuoteViewer newTab={this.props.newTab}/>, "Quote Viewer"),
                }
            }/>)

        return (
            <View style="flex: 1; justify-content: 'center'; align-items: 'center'; background-color: 'grey';">
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
