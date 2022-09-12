import { Text, View, Button, ComboBox, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import Bookings from "../bookings";
import Alert from "../alert";
import { disableDentalChartButton } from "../Calendarhelpers/calendarDayButtonDisable";
import { treatmentList } from "./comboBoxVariables";

export class BookingPageDentalChart extends React.Component<any, any> {

    //Sets up several state based variables to use throughout the .tsx file
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
            procedure: [],
            patientNotes: [],
            preventTotalReload: false
        }
    }

    render() {

        //Will hold the button rows
        var buttonRowOne:any = [];
        var buttonRowTwo:any = [];
        var buttonRowThree:any = [];

        //Function to call back to an alert
        const bookingsCallback = (alert: any) => {
          this.setState({
            bookingsAlert: alert
          })
        }

        //Will set the array up to fill '0' to ensure buttons stay as the style they are meant to
        //Note that several setState function will set 'preventTotalReload' to true to prevent this to replay
        if (this.state.preventTotalReload == false)
        {     
            this.state.dentalChartDataHolderOne[0] = "height: 100px; width: 100px;";
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

        //Handles removing a dental chart`
        const dentalChartRemoveHandler = {
            clicked: () =>{

                console.log("Chart removed");
                this.setState({
                    preventTotalReload: true
                })

                if (this.state.totalCharts > 0)
                {
                    for (var num = this.state.currentlySelectedChart; num < this.state.totalCharts; num++)
                    {
                        this.state.dentalChartDataHolderOne[num] = this.state.dentalChartDataHolderOne[num + 1];
                        this.state.dentalChartDataHolderTwo[num] = this.state.dentalChartDataHolderTwo[num + 1];
                        this.state.dentalChartDataHolderThree[num] = this.state.dentalChartDataHolderThree[num + 1];
                        this.state.dentalChartDataHolderFour[num] = this.state.dentalChartDataHolderFour[num + 1];
                        this.state.dentalChartDataHolderFive[num] = this.state.dentalChartDataHolderFive[num + 1];
                        this.state.dentalChartDataHolderSix[num] = this.state.dentalChartDataHolderSix[num + 1];
                        this.state.dentalChartDataHolderSeven[num] = this.state.dentalChartDataHolderSeven[num + 1];
                        this.state.dentalChartDataHolderEight[num] = this.state.dentalChartDataHolderEight[num + 1];
                        this.state.dentalChartDataHolderNine[num] = this.state.dentalChartDataHolderNine[num + 1];
                    }

                    //Changes the tooth back to the first index
                    this.setState({
                        buttonOne: this.state.dentalChartDataHolderOne[0],
                        buttonTwo: this.state.dentalChartDataHolderTwo[0],
                        buttonThree: this.state.dentalChartDataHolderThree[0],
                        buttonFour: this.state.dentalChartDataHolderFour[0],
                        buttonFive: this.state.dentalChartDataHolderFive[0],
                        buttonSix: this.state.dentalChartDataHolderSix[0],
                        buttonSeven: this.state.dentalChartDataHolderSeven[0],
                        buttonEight: this.state.dentalChartDataHolderEight[0],
                        buttonNine: this.state.dentalChartDataHolderNine[0],
                        totalCharts: this.state.totalCharts - 1,
                        currentlySelectedChart: 0
                    });
                }
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

        //Handles and changes the text for the procedure type during booking edit and creation
        const textHandlerProcedure = {
            currentTextChanged: (currentText:any) =>{
                
                this.state.procedure[this.state.currentlySelectedChart] = currentText;
            }
        }

        const textHandlerNotes = {
            textChanged: (textValue:any) =>{

                this.state.patientNotes[this.state.currentlySelectedChart] = textValue.replace(/[^a-zA-Z0-9,! ]+/g, '');
                

                this.setState({
                    //TODO: replace past a specific length
                })
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

        return (

            <View style={"flex-grow: 1; flex-direction: 'column';"}>
  
                <View style="flex-direction: 'row';">
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
  
  
                    {/**/}
                    <View style={containerStyle2}>
                
                        <View style="flex-direction: 'row';">
                            <View style={"flex-grow: 1 0 0; background: 'white';"}>

                                <View style="margin: 0px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Placeholder text 1</Text>
                                    <ComboBox style={"flex: 2;"} items={treatmentList()} currentText={this.state.procedure[this.state.currentlySelectedChart]} 
                                    on={textHandlerProcedure} />
                                </View>

                                <View style="margin: 0px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Placeholder text 1</Text>
                                    <ComboBox style={"flex: 2;"} items={treatmentList()} currentText={this.state.procedure[this.state.currentlySelectedChart]} 
                                    on={textHandlerProcedure} />
                                </View>

                                <View style="margin: 10px;"></View>

                                <View style="margin: 0px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Placeholder text 2</Text>
                                    <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentlySelectedChart]} />
                                </View>

                                <Button text={"Placeholder"} style={"flex-grow: 0 0 0;"}></Button>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
} 

export default BookingPageDentalChart;
