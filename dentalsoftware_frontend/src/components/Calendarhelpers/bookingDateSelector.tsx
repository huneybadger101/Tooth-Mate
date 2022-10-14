import { Text, View, Button, ComboBox, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import { disableDentalChartButton } from "../Calendarhelpers/calendarDayButtonDisable";
import { treatmentList, treatmentListPrices, treatmentListTimes, treatmentListTreatments, toothComboBox } from "./comboBoxVariables";
import DentalChartIniniteLoopFix from "../Calendarhelpers/loopPreventer";
import { bookingDentalChartTrueOrFalseInverted } from "../Calendarhelpers/textFormatFunctions";

export class BookingDateSelector extends React.Component<any, any> {

    //Sets up several state based variables to use throughout the .tsx file
    constructor(props: any) {
        super(props);
        this.state = {

            dateDay: [],
            dateMonth: [],
            dateYear: [],
            dateWeekday: [],

            totalDateCount: 1
        }
    }

    render() {//0 <- placeholder | 1 <- create booking | 2 <- edit booking | 3 <- ticket to booking

        this.props.callback(

            this.state.dateDay,
            this.state.dateMonth,
            this.state.dateYear,
            this.state.dateWeekday,

            this.state.totalDateCount
            
        );

        //Create booking
        if (pageState == 0)
        {
            this.state.dateDay[0] = this.props.data[0];
            this.state.dateMonth[0] = this.props.data[1];
            this.state.dateYear[0] = this.props.data[2];
            this.state.dateWeekday[0] = this.props.data[3];
            var pageState = this.props.data[4];
        }
        //Create booking
        else if (pageState == 1)
        {
            //TODO: CONTACT DB TO GET NEW DATES
        }
        //edit booking
        else if (pageState == 2)
        {
            //TODO: CONTACT DB TO GET NEW DATES
        }
        //ticket to booking
        else if (pageState == 3)
        {
            //TODO: CONTACT DB TO GET NEW DATES
        }
        



        return (

            <View>
  
                <Button text="Calendar Selector Button..."></Button>

            </View>
        );
    }
} 

export default BookingDateSelector;
