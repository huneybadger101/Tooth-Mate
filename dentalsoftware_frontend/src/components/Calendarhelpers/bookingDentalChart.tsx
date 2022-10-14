import { Text, View, Button, ComboBox, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import { disableDentalChartButton } from "../Calendarhelpers/calendarDayButtonDisable";
import { treatmentList, treatmentListPrices, treatmentListTimes, treatmentListTreatments, toothComboBox } from "./comboBoxVariables";
import DentalChartIniniteLoopFix from "../Calendarhelpers/loopPreventer";
import { bookingDentalChartTrueOrFalseInverted } from "../Calendarhelpers/textFormatFunctions";

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
            procedureCopy: [],
            procedurePrice: [],
            procedureTime: [],
            patientNotes: [],
            preventTotalReload: false,

            procedurePrinted: "Initial examination",
            procedureTimePrinted: treatmentListTimes(0),
            procedurePricePrinted: treatmentListPrices(0),
            procedureTimeStored: [],
            procedureCostStored: [],
            
            currentlySelectedProcedureIndex: [],
            currentlySelectedToothIndex: []
        }

        if (DentalChartIniniteLoopFix.alreadyRun == undefined) {
            DentalChartIniniteLoopFix.alreadyRun = 4;
        }
    }

    render() {

        this.props.callback(

            this.state.dentalChartDataHolderOne,
            this.state.dentalChartDataHolderTwo,
            this.state.dentalChartDataHolderThree,
            this.state.dentalChartDataHolderFour,
            this.state.dentalChartDataHolderFive,
            this.state.dentalChartDataHolderSix,
            this.state.dentalChartDataHolderSeven,
            this.state.dentalChartDataHolderEight,
            this.state.dentalChartDataHolderNine,
            this.state.procedure,
            this.state.procedureTimeStored,
            this.state.procedureCostStored,
            this.state.patientNotes,
            this.state.totalCharts,
            this.state.currentlySelectedToothIndex
        );
        
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
            this.setState({
                preventTotalReload: true
            });

            //Will happen if the create booking button is clicked
            if (this.props.data[0] == true || this.props.data[0] == false)
            {
                //Will prep multiple variables for a new booking...
                this.setState({
                    totalCharts: 0,
                    buttonOne: "height: 100px; width: 100px;",
                    buttonTwo: "height: 100px; width: 100px;",
                    buttonThree: "height: 100px; width: 100px;",
                    buttonFour: "height: 100px; width: 100px;",
                    buttonFive: "height: 100px; width: 100px;",
                    buttonSix: "height: 100px; width: 100px;",
                    buttonSeven: "height: 100px; width: 100px;",
                    buttonEight: "height: 100px; width: 100px;",
                    buttonNine: "height: 100px; width: 100px;",
                    procedurePrinted: "Initial Examination",
                    procedureTimePrinted: "Placeholder time...",
                    procedurePricePrinted: "Placeholder cost..."
                });

                //Will prep multiple variables for a new booking...
                this.state.dentalChartDataHolderOne[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderTwo[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderThree[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderFour[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderFive[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderSix[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderSeven[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderEight[0] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderNine[0] = "height: 100px; width: 100px;";
                this.state.currentlySelectedProcedureIndex[0] = 0;
                this.state.currentlySelectedToothIndex[0] = 0;
                this.state.procedureCostStored[0] = treatmentListPrices(0);
                this.state.procedureTimeStored[0] = treatmentListTimes(0);

                //Will prep multiple variables for a new booking...
                this.state.procedure[0] = "Initial Procedure";
                this.state.procedurePrice[0] = "Price Placeholder test...";
                this.state.procedureTime[0] = "Time Placeholder test...";
                this.state.patientNotes[0] = "Notes Placeholder test...";
            }
            //Will happen if edit booking is selected
            else if (this.props.data[0] == false)
            {
                console.log("EDIT BOOKING");
            }
            //Will happen when the edit button or add ticket button is clicked...
            else
            {
                //Will take the data sent from bookings file and set the buttons
                this.setState({
                    totalCharts: this.props.data.length - 1,
                    buttonOne: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[0]),
                    buttonTwo: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[1]),
                    buttonThree: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[2]),
                    buttonFour: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[3]),
                    buttonFive: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[4]),
                    buttonSix: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[5]),
                    buttonSeven: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[6]),
                    buttonEight: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[7]),
                    buttonNine: bookingDentalChartTrueOrFalseInverted(this.props.data[0].split("-")[8]),
                });

                //Will iterate through the booking file variables and create specified amount of dental charts
                for (var num = 0; num < this.props.data.length; num++)
                {
                    //Creates an array of the strings sent from bookings file as to access each one
                    var splitBookingString = this.props.data[num].split("-");

                    console.log(splitBookingString[0]);//Chart 1
                    console.log(splitBookingString[1]);//Chart 2
                    console.log(splitBookingString[2]);//Chart 3
                    console.log(splitBookingString[3]);//Chart 4
                    console.log(splitBookingString[4]);//Chart 5
                    console.log(splitBookingString[5]);//Chart 6
                    console.log(splitBookingString[6]);//Chart 7
                    console.log(splitBookingString[7]);//Chart 8
                    console.log(splitBookingString[8]);//Chart 9
                    console.log(splitBookingString[9]);//Procedure
                    console.log(splitBookingString[10]);//Procedure cost
                    console.log(splitBookingString[11]);//Procedure time
                    console.log(splitBookingString[12]);//Notes
                    console.log(splitBookingString[13]);//Tooth selected
                    console.log("--------------------------------");

                    //Sets the state of the dental chart buttons displayed based on stored db variables
                    this.state.dentalChartDataHolderOne[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[0]);
                    this.state.dentalChartDataHolderTwo[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[1]);
                    this.state.dentalChartDataHolderThree[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[2]);
                    this.state.dentalChartDataHolderFour[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[3]);
                    this.state.dentalChartDataHolderFive[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[4]);
                    this.state.dentalChartDataHolderSix[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[5]);
                    this.state.dentalChartDataHolderSeven[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[6]);
                    this.state.dentalChartDataHolderEight[num] = bookingDentalChartTrueOrFalseInverted(splitBookingString[7]);
                    this.state.dentalChartDataHolderNine[num] =bookingDentalChartTrueOrFalseInverted(splitBookingString[8]);
                    this.state.currentlySelectedProcedureIndex[num] = splitBookingString[9];
                    this.state.currentlySelectedToothIndex[num] = splitBookingString[13];
                    this.state.procedureCostStored[num] = splitBookingString[10];
                    this.state.procedureTimeStored[num] = splitBookingString[11];
                }
            }
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

                this.state.currentlySelectedProcedureIndex[this.state.totalCharts] = 0;
                this.state.currentlySelectedToothIndex[this.state.totalCharts] = 0;

                //Updates which chart is currently selected to newly made chart
                this.setState({
                    currentlySelectedChart: this.state.totalCharts,
                });

                this.state.procedureCostStored[this.state.totalCharts] = treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.totalCharts]);
                this.state.procedureTimeStored[this.state.totalCharts] = treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.totalCharts]);

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
                    buttonNine: this.state.dentalChartDataHolderNine[this.state.totalCharts],

                    procedurePricePrinted: this.state.procedureCostStored[this.state.totalCharts],
                    procedureTimePrinted: this.state.procedureTimeStored[this.state.totalCharts]
                });

                
            }
        }

        //Handles removing a dental chart`
        const dentalChartRemoveHandler = {
            clicked: () =>{

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

                        this.state.currentlySelectedProcedureIndex[num] = this.state.currentlySelectedProcedureIndex[num + 1];
                        this.state.currentlySelectedToothIndex[num] = this.state.currentlySelectedToothIndex[num + 1];
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
                        currentlySelectedChart: 0,

                        procedurePricePrinted: this.state.procedureCostStored[0],
                        procedureTimePrinted: this.state.procedureTimeStored[0]
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
                        buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart],

                        procedurePricePrinted: this.state.procedureCostStored[this.state.currentlySelectedChart],
                        procedureTimePrinted: this.state.procedureTimeStored[this.state.currentlySelectedChart]
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
                        buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart],

                        procedurePricePrinted: this.state.procedureCostStored[this.state.currentlySelectedChart],
                        procedureTimePrinted: this.state.procedureTimeStored[this.state.currentlySelectedChart]
                    });
                }
            }
        }

        //Handles and changes the text for the procedure type during booking edit and creation
        const indexHanlderProcedure = {
            currentIndexChanged: (currentText:any) =>{
               
                this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart] = currentText
                this.state.procedure[this.state.currentlySelectedChart] = treatmentListTreatments(currentText);
            }
        }

        const indexHanlderTooth = {
            currentIndexChanged: (currentText:any) =>{
               
                this.state.currentlySelectedToothIndex[this.state.currentlySelectedChart] = currentText
                //this.state.procedure[this.state.currentlySelectedChart] = treatmentListTreatments(currentText);
            }
        }

        const setProcedurePriceAndTime = {
            clicked: () =>{

                //I DO NOT KNOW WHY, BUT YOU NEED TO HAVE BOTH OF THESE HERE TO FIX AN ISSUE WHERE THE MIDDLE LINES DO NOT UPDATE
                this.setState({
                    procedurePricePrinted: treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    procedureTimePrinted: treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    preventTotalReload: true
                });

                this.state.procedureCostStored[this.state.currentlySelectedChart] = this.state.procedurePricePrinted;
                this.state.procedureTimeStored[this.state.currentlySelectedChart] = this.state.procedureTimePrinted;

                //I DO NOT KNOW WHY, BUT YOU NEED TO HAVE BOTH OF THESE HERE TO FIX AN ISSUE WHERE THE MIDDLE LINES DO NOT UPDATE
                this.setState({
                    procedurePricePrinted: treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    procedureTimePrinted: treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    preventTotalReload: true
                });
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

        //TODO--------------------------------------------------------------------------------------------------------------------
        const textHandlerCost = {
            textChanged: (textValue:any) =>{

                this.state.procedureCostStored[this.state.currentlySelectedChart] = textValue;

                this.setState({
                    procedurePricePrinted: textValue
                })
            }
        }

        //TODO--------------------------------------------------------------------------------------------------------------------
        const textHandlerTime = {
            textChanged: (textValue:any) =>{

                this.state.procedureTimeStored[this.state.currentlySelectedChart] = textValue;
                
                this.setState({
                    procedureTimePrinted: textValue
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
                            <Button text="<" style="width: 100px;" on={dentalChartDisplayedLeftHanlder}></Button>

                            <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey'; width: 100px;"}>
                                {"Chart: " + (this.state.currentlySelectedChart + 1) + "/ " + (this.state.totalCharts + 1)}
                            </Text>
                            
                            <Button text=">" style="width: 100px;" on={dentalChartDisplayedRightHanlder}></Button>
                        </View>

                    </View>
  
  
                    {/**/}
                    <View style={containerStyle2}>
                
                        <View style="flex-direction: 'row';">
                            <View style={"flex-grow: 1 0 0; background: 'white';"}>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Tooth</Text>
                                    <ComboBox style={"flex: 2;"} items={toothComboBox()} currentIndex={this.state.currentlySelectedToothIndex[this.state.currentlySelectedChart]}
                                    on={indexHanlderTooth} />
                                </View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure</Text>
                                    <ComboBox style={"flex: 2;"} items={treatmentList()} currentIndex={this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]}
                                    on={indexHanlderProcedure} />
                                </View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <LineEdit style={"flex: 2;"} on={textHandlerCost} text={this.state.procedureCostStored[this.state.currentlySelectedChart]} />
                                    <LineEdit style={"flex: 2;"} on={textHandlerTime} text={this.state.procedureTimeStored[this.state.currentlySelectedChart]} />
                                    <Button on={setProcedurePriceAndTime} text={"Default"}></Button>
                                </View>
                                
                                <View style="margin: 10px;"></View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Notes</Text>
                                </View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentlySelectedChart]} />
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
} 

export default BookingPageDentalChart;
