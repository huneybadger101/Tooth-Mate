import { Text, View, Button } from "@nodegui/react-nodegui";
import React from "react";
import Bookings from "../bookings";
import { disableCalendarButton } from "../Calendarhelpers/calendarDayButtonDisable";
import Alert from "../alert";
import { disableDentalChartButton } from "../Calendarhelpers/calendarDayButtonDisable";

export class BookingPageDentalChart extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
        buttonOne: "height: 100px; width: 100px;",
        buttonTwo: "height: 100px; width: 100px;",
        buttonThree: "height: 100px; width: 100px;",
        buttonFour: "height: 100px; width: 100px;",
        buttonFive: "height: 100px; width: 100px;",
        buttonSix: "height: 100px; width: 100px;",
        buttonSeven: "height: 100px; width: 100px;",
        buttonEight: "height: 100px; width: 100px;",
        buttonNine: "height: 100px; width: 100px;",   





        dentalChartDataHolderOne: [],
         dentalChartDataHolderTwo: [],
         dentalChartDataHolderThree: [],
         dentalChartDataHolderFour: [],
         dentalChartDataHolderFive: [],
         dentalChartDataHolderSix: [],
         dentalChartDataHolderSeven: [],
         dentalChartDataHolderEight: [],
         dentalChartDataHolderNine: [],





        totalCharts: 0,
        currentlySelectedChart: 0,

        preventTotalReload: false
    }
  }

    render() {

      //NOTE: THE VALUES ABOVE ARE 1 BEHIND THE ACTUAL ASSOCIATION DUE TO IT BEING AN ARRAY HELPER
      //i.e. JANUARY = 0 rather than 1

        //Will hold the calendar days to be printed out later
        var buttonRowOne:any = [];
        var buttonRowTwo:any = [];
        var buttonRowThree:any = [];

        const bookingsCallback = (alert: any) => {
          this.setState({
            bookingsAlert: alert
          })
        }

        












        //Will set the array up to fill '0' to ensure buttons stay as the style they are meant to
        //Note that several setState function will set 'preventTotalReload' to true to prevent this to replay
        if (this.state.preventTotalReload == false)
        {     
            this.state.dentalChartDataHolderOne[0] = ("height: 100px; width: 100px;");
            this.state.dentalChartDataHolderTwo[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderThree[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderFour[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderFive[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderSix[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderSeven[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderEight[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderNine[0] = "height: 100px; width: 100px;";
        }

        
        
        








        //Handles adding a dental chart
        const dentalChartAddHandler = {
            clicked: () =>{

                //Has the index for the total chart count increase by one
                this.setState({totalCharts: this.state.totalCharts + 1, preventTotalReload: true});

                //Uses the new chart index to increase the chart arrays and store the default button style in them
                this.state.dentalChartDataHolderOne[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderTwo[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderThree[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderFour[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderFive[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderSix[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderSeven[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderEight[this.state.totalCharts] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderNine[this.state.totalCharts] = "height: 100px; width: 100px;";

                //Updates which chart is currently selected to newly made chart
                this.setState({
                    currentlySelectedChart: this.state.totalCharts
                });

                //Sets the buttons to the new index created to display the correct chart after creation
                this.setState({
                    buttonOne: this.state.dentalChartDataHolderOne[this.state.totalCharts],
                    buttonTwo: this.state.dentalChartDataHolderTwo[this.state.totalCharts],
                    buttonThree: this.state.dentalChartDataHolderThree[this.state.totalCharts],
                    buttonFour: this.state.dentalChartDataHolderFour[this.state.totalCharts],
                    buttonFive: this.state.dentalChartDataHolderFive[this.state.totalCharts],
                    buttonSix: this.state.dentalChartDataHolderSix[this.state.totalCharts],
                    buttonSeven: this.state.dentalChartDataHolderSeven[this.state.totalCharts],
                    buttonEight: this.state.dentalChartDataHolderEight[this.state.totalCharts],
                    buttonNine: this.state.dentalChartDataHolderNine[this.state.totalCharts]
                });
            }
        }

        //Handles removing a dental chart
        const dentalChartRemoveHandler = {
            clicked: () =>{

                console.log("Chart removed");

                this.setState({
                    preventTotalReload: true
                })
            }
        }

        //Hanldes changing the dental chart by clicking left arrow
        const dentalChartDisplayedLeftHanlder = {
            clicked: () => {

                if (this.state.currentlySelectedChart > 0)
                {
                    this.setState({
                        currentlySelectedChart: this.state.currentlySelectedChart - 1,
                        preventTotalReload: true
                    })

                    this.setState({
                        buttonOne: this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart],
                        buttonTwo: this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart],
                        buttonThree: this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart],
                        buttonFour: this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart],
                        buttonFive: this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart],
                        buttonSix: this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart],
                        buttonSeven: this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart],
                        buttonEight: this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart],
                        buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart]
                    });
                }
                
            }
        }

        //Hanldes changing the dental chart by clicking left arrow
        const dentalChartDisplayedRightHanlder = {
            clicked: () =>{

                if (this.state.currentlySelectedChart < this.state.totalCharts)
                {
                    this.setState({
                        currentlySelectedChart: this.state.currentlySelectedChart + 1,
                        preventTotalReload: true
                    });

                    this.setState({
                        buttonOne: this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart],
                        buttonTwo: this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart],
                        buttonThree: this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart],
                        buttonFour: this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart],
                        buttonFive: this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart],
                        buttonSix: this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart],
                        buttonSeven: this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart],
                        buttonEight: this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart],
                        buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart]
                    });
                }
            }
        }
        
        





            buttonRowOne.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "1" } style={this.state.buttonOne} on={{clicked: () => {

                    this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonOne);

                    this.setState({
                        buttonOne: this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowOne.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "2" } style={this.state.buttonTwo} on={{clicked: () => {

                    this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonTwo);

                    this.setState({
                        buttonTwo: this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowOne.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "3" } style={this.state.buttonThree} on={{clicked: () => {

                    this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonThree);

                    this.setState({
                        buttonThree: this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowTwo.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "4" } style={this.state.buttonFour} on={{clicked: () => {

                    this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonFour);

                    this.setState({
                        buttonFour: this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowTwo.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "5" } style={this.state.buttonFive} on={{clicked: () => {

                    this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonFive);

                    this.setState({
                        buttonFive: this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowTwo.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "6" } style={this.state.buttonSix} on={{clicked: () => {

                    this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonSix);

                    this.setState({
                        buttonSix: this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowThree.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "7" } style={this.state.buttonSeven} on={{clicked: () => {

                    this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonSeven);

                    this.setState({
                        buttonSeven: this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowThree.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "8" } style={this.state.buttonEight} on={{clicked: () => {

                    this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonEight);

                    this.setState({
                        buttonEight: this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )

            buttonRowThree.push(
                <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ "9" } style={this.state.buttonNine} on={{clicked: () => {

                    this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonNine);

                    this.setState({
                        buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart], preventTotalReload: true
                    });}}}/>
                </View>
            )



            

           
        

        const containerStyle = `
            flex-grow: 0 0 0;
            background: 'white';
        `;

        // Must wrap main App component in a React.Fragment component
        // in order to allow for sub-windows to be created later on
        return (


            <View style="flex-direction: 'row';">

              {/*This container will hold the calendar*/}
              <View style={containerStyle}>

                <View style="flex: 0; flex-direction: 'row';">
                    <Button text="-" style="width: 150px;" on={dentalChartRemoveHandler}></Button>
                    <Button text="+" style="width: 150px;" on={dentalChartAddHandler}></Button>
                </View>

                <View style="flex: 0; flex-direction: 'row';">
                    {buttonRowOne}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {buttonRowTwo}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {buttonRowThree}
                </View>

                <View style="flex: 0; flex-direction: 'row';">
                    <Text>{"Currently selected chart: " + this.state.currentlySelectedChart}</Text>
                </View>

                <View style="flex: 0; flex-direction: 'row';">
                    <Button text="<" style="width: 150px;" on={dentalChartDisplayedLeftHanlder}></Button>
                    <Button text=">" style="width: 150px;" on={dentalChartDisplayedRightHanlder}></Button>
                </View>

              </View>
            </View>
        );
    }
} 

export default BookingPageDentalChart;

