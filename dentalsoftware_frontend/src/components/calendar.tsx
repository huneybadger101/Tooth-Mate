import { Text, View, Button } from "@nodegui/react-nodegui";
import React from "react";
import { getWeekdayStart } from "./Calendarhelpers/calendarHelper";
import { getMonthDayCount } from "./Calendarhelpers/calendarMonthDayCount";
import { getWeekdaySelected } from "./Calendarhelpers/calendarDisplaySelectedDate";
import Bookings from "./bookings";
import { testButtons } from "./Calendarhelpers/calendarDayButtonDisable";
import Alert from "./alert";

export class Calendar extends React.Component<any, any> {

  constructor(props: any) {

    //Creates a date object
    var date = new Date();

    //Creates several state variables
    //NOTE: State variables will allow for dynamic content loading in the application
      //i.e., if a state variable is changed and connected to a buttons text, the button will reload with the text updated automatically
    super(props);
    this.state = {
        month: [],
        day: [],
        year: date.getFullYear(),
        daySelected: 0,
        weekDaySelected: getWeekdayStart(date.getMonth(), date.getFullYear()),
        monthSelected: date.getMonth(),
        monthDayCount: getMonthDayCount(date.getMonth(), date.getFullYear()),
        currentDaySelected: 0,
        currentMonthSelected: 0,
        currentYearSelected: 0,
        currentWeekdaySelected: 0,
        rightHandMessage: true,
        rightHandDateInfo: false,
        currentBookingSelected: "",
        editBookingButton: false
    }
  }

    render() {

      //Sets the day values in a state based array
      this.state.day[0] = "Monday";
      this.state.day[1] = "Tuesday";
      this.state.day[2] = "Wednesday";
      this.state.day[3] = "Thursday";
      this.state.day[4] = "Friday";
      this.state.day[5] = "Saturday";
      this.state.day[6] = "Sunday";
      
      //Sets the months in a state based array
      this.state.month[0] = "January";
      this.state.month[1] = "February";
      this.state.month[2] = "March";
      this.state.month[3] = "April";
      this.state.month[4] = "May";
      this.state.month[5] = "June";
      this.state.month[6] = "July";
      this.state.month[7] = "August";
      this.state.month[8] = "September";
      this.state.month[9] = "October";
      this.state.month[10] = "November";
      this.state.month[11] = "December";

      //NOTE: THE VALUES ABOVE ARE 1 BEHIND THE ACTUAL ASSOCIATION DUE TO IT BEING AN ARRAY HELPER
      //i.e. JANUARY = 0 rather than 1

        //Will hold the calendar days to be printed out later
        var calendar1:any = [];
        var calendar2:any = [];
        var calendar3:any = [];
        var calendar4:any = [];
        var calendar5:any = [];
        var calendar6:any = [];
        var bookingList:any = [];
        var bookingPage:any;

        //Button handler for when increasing the month or year
        //When clicked and the month is december, the year will be increased by 1 and the month will restart from Jan
        const buttonHandlerIncreaseMonth = {
          clicked: () => {
              if (this.state.monthSelected == 11)
              {
                  this.setState({year: this.state.year + 1})
                  this.setState({monthSelected: 0})
              }
              else
              {
                  this.setState({monthSelected: this.state.monthSelected + 1})
              }

              //Sets the weekday start for each month using a function from another file (calendayHelper.tsx)
              this.setState({weekDaySelected: getWeekdayStart(this.state.monthSelected, this.state.year)});
              this.setState({monthDayCount: getMonthDayCount(this.state.monthSelected, this.state.year)}); 
          }
        }
        
        //Button handler for when decreasing the month or year
        const buttonHandlerDecreaseMonth = {
          clicked: () => {
              if (this.state.monthSelected == 0)
              {
                  this.setState({year: this.state.year - 1})
                  this.setState({monthSelected: 11})
              }
              else
              {
                  this.setState({monthSelected: this.state.monthSelected - 1})
              }

              //Sets the weekday start for each month using a function from another file (calendayHelper.tsx)
              this.setState({weekDaySelected: getWeekdayStart(this.state.monthSelected, this.state.year)});
              this.setState({monthDayCount: getMonthDayCount(this.state.monthSelected, this.state.year)});
          }
        }

        //This for loop contains the code to create date nodes in rows of 7.
        //These will be displayed on the actual calendar and will be in the form of buttons
        //When clicked, the chosen date will be saved to a state based variable for use
        for (var i = 0; i < 7; i++) {

          if (i >= this.state.weekDaySelected)
          {
            let buttonName_0 = (i + (1 - this.state.weekDaySelected)).toString();
            calendar1.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ buttonName_0 } 
                style="height: 100px; width: 100px;" 
                enabled={testButtons(buttonName_0, this.state.daySelected, this.state.monthSelected, this.state.currentMonthSelected)}
                on={{clicked: () => {
                  this.setState(
                  {daySelected: buttonName_0,
                    rightHandDateInfo: true,
                    rightHandMessage: false,
                    currentMonthSelected: this.state.monthSelected,
                    currentYearSelected: this.state.year,
                    currentWeekdaySelected: getWeekdaySelected(this.state.monthSelected, this.state.year, buttonName_0)}
                  )}}} />
              </View>
              )
          }
          else
          {
            calendar1.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px; background-color: 'grey';">
                <Text></Text>
              </View>
              )
          }
          
          let buttonName_1 = (i + (8 - this.state.weekDaySelected)).toString();
          calendar2.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Button text={ buttonName_1 } 
              style="height: 100px; width: 100px;" 
              enabled={testButtons(buttonName_1, this.state.daySelected, this.state.monthSelected, this.state.currentMonthSelected)} 
              on={{clicked: () => this.setState(
                {daySelected: buttonName_1,
                  rightHandDateInfo: true,
                  rightHandMessage: false,
                  currentMonthSelected: this.state.monthSelected,
                  currentYearSelected: this.state.year,
                  currentWeekdaySelected: getWeekdaySelected(this.state.monthSelected, this.state.year, buttonName_1)}
                )}} />
            </View>
          )

          let buttonName_2 = (i + (15 - this.state.weekDaySelected)).toString();
          calendar3.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Button text={ buttonName_2 } 
              style="height: 100px; width: 100px;" 
              enabled={testButtons(buttonName_2, this.state.daySelected, this.state.monthSelected, this.state.currentMonthSelected)} 
              on={{clicked: () => this.setState(
                {daySelected: buttonName_2,
                  rightHandDateInfo: true,
                  rightHandMessage: false,
                  currentMonthSelected: this.state.monthSelected,
                  currentYearSelected: this.state.year,
                  currentWeekdaySelected: getWeekdaySelected(this.state.monthSelected, this.state.year, buttonName_2)}
                )}} />
            </View>
          )

          if (i + (22 - this.state.weekDaySelected) <= this.state.monthDayCount){
            let buttonName_3 = (i + (22 - this.state.weekDaySelected)).toString();
            calendar4.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ buttonName_3 } 
                style="height: 100px; width: 100px;" 
                enabled={testButtons(buttonName_3, this.state.daySelected, this.state.monthSelected, this.state.currentMonthSelected)} 
                on={{clicked: () => this.setState(
                  {daySelected: buttonName_3,
                    rightHandDateInfo: true,
                    rightHandMessage: false,
                    currentMonthSelected: this.state.monthSelected,
                    currentYearSelected: this.state.year,
                    currentWeekdaySelected: getWeekdaySelected(this.state.monthSelected, this.state.year, buttonName_3)}
                  )}} />
              </View>
            )
          }

          if (i + (29 - this.state.weekDaySelected) <= this.state.monthDayCount){
            let buttonName_4 = (i + (29 - this.state.weekDaySelected)).toString();
            calendar5.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ buttonName_4 } 
                style="height: 100px; width: 100px;" 
                enabled={testButtons(buttonName_4, this.state.daySelected, this.state.monthSelected, this.state.currentMonthSelected)} 
                on={{clicked: () => this.setState(
                  {daySelected: buttonName_4, 
                  rightHandDateInfo: true,
                  rightHandMessage: false,
                  currentMonthSelected: this.state.monthSelected,
                  currentYearSelected: this.state.year,
                  currentWeekdaySelected: getWeekdaySelected(this.state.monthSelected, this.state.year, buttonName_4)}
                  )}} />
              </View>
            )
          }
          else
          {
            calendar5.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px; background-color: 'grey';">
                <Text></Text>
              </View>
              )
          }

          if (i + (36 - this.state.weekDaySelected) <= this.state.monthDayCount){
            let buttonName_5 = (i + (36 - this.state.weekDaySelected)).toString();
            calendar6.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ buttonName_5 } 
                style="height: 100px; width: 100px;" 
                enabled={testButtons(buttonName_5, this.state.daySelected, this.state.monthSelected, this.state.currentMonthSelected)}
                on={{clicked: () => this.setState(
                  {daySelected: buttonName_5,
                    rightHandDateInfo: true,
                    rightHandMessage: false,
                    currentMonthSelected: this.state.monthSelected,
                    currentYearSelected: this.state.year,
                    currentWeekdaySelected: getWeekdaySelected(this.state.monthSelected, this.state.year, buttonName_5)}
                  )}} />
              </View>
            )
          }
          else
          {
            calendar6.push(
              <View style="border: 1px solid black; height: 100px; width: 100px; background-color: 'grey';">
                <Text></Text>
              </View>
              )
          }
        }








        const containerStyle = `
            flex-grow: 0 0 0;
            background: 'white';
        `;

        const containerStyle2 = `
            flex-grow: 2 2 2;
            
            flex-direction: 'column';
            background: 'white';
        `;

        const containerStyle3 = `
            flex-shrink: 2;
            bottom: 10px;
            flex-direction: 'column';
            background: 'white';
        `;

        // Must wrap main App component in a React.Fragment component
        // in order to allow for sub-windows to be created later on
        return (

          <View style={"flex-grow: 1; flex-direction: 'column';"}>

            <View style="flex-direction: 'row';">

              {/*This container will hold the calendar*/}
              <View style={containerStyle}>

                <View style="flex: 0; flex-direction: 'row';">
                    <Button style="width: 200px;" text={"<<"} on={buttonHandlerDecreaseMonth}/>
                        <Text style="border: 1px solid black; width: 300px;">{this.state.month[this.state.monthSelected] + ", " + this.state.year}</Text>
                    <Button style="width: 200px;" text={">>"} on={buttonHandlerIncreaseMonth}/>
                </View>

                <View style="flex: 0; flex-direction: 'row';">
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[0]}</Text>
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[1]}</Text>
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[2]}</Text>
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[3]}</Text>
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[4]}</Text>
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[5]}</Text>
                    <Text style="flex: 0; border: 1px solid black; width: 100px;">{this.state.day[6]}</Text>
                </View>

                <View style="flex: 0; flex-direction: 'row';">
                    {calendar1}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar2}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar3}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar4}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar5}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar6}
                </View>

              </View>


              {/**/}
              <View style={containerStyle2}>


                {/*Will call the bookings component to be diplayed on the calendar page and send several variables for use in the bookings page*/}
                <Bookings data={
                  this.state.daySelected + "." + 
                  (this.state.currentMonthSelected + 1) + "." +
                  this.state.currentYearSelected + "." +
                  this.state.day[this.state.currentWeekdaySelected]
                }/>
                

              </View>
            </View>


            {/**/}
            <View style={containerStyle3}>

                {/* <ScrollArea style={"flex-grow: 1;"}>
                <View style={"flex-grow: 1; width: 500px;"}>
                  {bookingList}
                </View>
                </ScrollArea> */}

            </View>

            <Alert title={"Hello"} message={"World"} subView={<Button>Test button</Button>} style={"background-color: 'green'; width: 600px; height: 400px;"}></Alert>
          </View>
        );
    }
} 

export default Calendar;