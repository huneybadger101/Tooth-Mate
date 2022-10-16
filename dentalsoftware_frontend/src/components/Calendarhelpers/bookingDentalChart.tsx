import { Text, View, Button, ComboBox, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import { disableDentalChartButton } from "../Calendarhelpers/calendarDayButtonDisable";
import { treatmentList, treatmentListPrices, treatmentListTimes, treatmentListTreatments, toothComboBox } from "./comboBoxVariables";
import DentalChartIniniteLoopFix from "../Calendarhelpers/loopPreventer";
import { bookingDentalChartTrueOrFalseInverted } from "../Calendarhelpers/textFormatFunctions";
import PlainTextEditWrapper from "../PlainTextEditWrapper";

export class BookingPageDentalChart extends React.Component<any, any> {

    //Sets up several state based variables to use throughout the .tsx file
    constructor(props: any) {
        super(props);
        this.state = {

            totalIndex: 0,
            currentlySelectedIndex: 0,
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
            currentlySelectedToothIndex: [],

            testVar: []
        }
    }

    render() {

        this.props.callback(
            this.state.procedure,
            this.state.procedureTimeStored,
            this.state.procedureCostStored,
            this.state.patientNotes,
            this.state.currentlySelectedToothIndex
        );

        //Will set up scenarios for if the create, edit, or ticket button is clicked
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

                });

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

                });

                //Will iterate through the booking file variables and create specified amount of dental charts
                for (var num = 0 + 2; num < this.props.data.length + 2; num++)
                {
                    //Creates an array of the strings sent from bookings file as to access each one
                    var splitBookingString = this.props.data[num].split("-");

                    //Sets the state of the dental chart buttons displayed based on stored db variables
                    this.state.currentlySelectedProcedureIndex[num] = splitBookingString[9];
                    this.state.currentlySelectedToothIndex[num] = splitBookingString[13];
                    this.state.procedureCostStored[num] = splitBookingString[10];
                    this.state.procedureTimeStored[num] = splitBookingString[11];
                }
            }
        }

        if (this.state.totalIndex != this.props.data[1].split(".")[1])
        {
            this.setState({
                totalIndex: this.props.data[1].split(".")[1]//Total index count
            });
        }

        if (this.state.currentlySelectedIndex != this.props.data[1].split(".")[0])
        {
            this.setState({
                currentlySelectedIndex: this.props.data[1].split(".")[0]//Currently selected index
            });
        }





        //Handles and changes the text for the procedure type during booking edit and creation
        const indexHanlderProcedure = {
            currentIndexChanged: (currentText:any) =>{
               
                this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex] = currentText
                this.state.procedure[this.state.currentlySelectedIndex] = treatmentListTreatments(currentText);
            }
        }

        const indexHanlderTooth = {
            currentIndexChanged: (currentText:any) =>{

                
                this.state.currentlySelectedToothIndex[this.state.currentlySelectedIndex] = currentText;
                

                //this.state.procedure[this.state.currentlySelectedIndex] = treatmentListTreatments(currentText);
            }
        }

        const setProcedurePriceAndTime = {
            clicked: () =>{

                //I DO NOT KNOW WHY, BUT YOU NEED TO HAVE BOTH OF THESE HERE TO FIX AN ISSUE WHERE THE MIDDLE LINES DO NOT UPDATE
                this.setState({
                    procedurePricePrinted: treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex]),
                    procedureTimePrinted: treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex]),
                    preventTotalReload: true
                });

                this.state.procedureCostStored[this.state.currentlySelectedIndex] = this.state.procedurePricePrinted;
                this.state.procedureTimeStored[this.state.currentlySelectedIndex] = this.state.procedureTimePrinted;

                //I DO NOT KNOW WHY, BUT YOU NEED TO HAVE BOTH OF THESE HERE TO FIX AN ISSUE WHERE THE MIDDLE LINES DO NOT UPDATE
                this.setState({
                    procedurePricePrinted: treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex]),
                    procedureTimePrinted: treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex]),
                    preventTotalReload: true
                });
            }
        }
         
        const textHandlerNotes = {
            textChanged: (textValue:any) =>{

                this.state.patientNotes[this.state.currentlySelectedIndex] = textValue.replace(/[^a-zA-Z0-9,! ]+/g, '');
                

                this.setState({
                    //TODO: replace past a specific length
                })
            }
        }

        //TODO--------------------------------------------------------------------------------------------------------------------
        const textHandlerCost = {
            textChanged: (textValue:any) =>{

                this.state.procedureCostStored[this.state.currentlySelectedIndex] = textValue;

                this.setState({
                    procedurePricePrinted: textValue
                })
            }
        }

        //TODO--------------------------------------------------------------------------------------------------------------------
        const textHandlerTime = {
            textChanged: (textValue:any) =>{

                this.state.procedureTimeStored[this.state.currentlySelectedIndex] = textValue;
                
                this.setState({
                    procedureTimePrinted: textValue
                })
            }
        }

        const temp = {
            clicked: () =>{
                console.log(this.state.patientNotes[this.state.currentlySelectedIndex]);
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

        return (

            <View style={"flex-grow: 1; flex-direction: 'column';"}>
  
                <View style="flex-direction: 'row';">
                    <View style={containerStyle}> 

                    </View>
  
  
                    {/**/}
                    <View style={containerStyle2}>
                
                        <View style="flex-direction: 'row';">
                            <View style={"flex-grow: 1 0 0; background: 'white';"}>

                                <View style="flex-direction: 'row';">
                                    <Text id={"bookingTextToothAndProcedure"}>Tooth</Text>
                                    <ComboBox id={"bookingToothAndProcedureSelectDropdown"} 
                                        items={toothComboBox()}
                                        currentIndex={this.state.currentlySelectedToothIndex[this.state.currentlySelectedIndex]}
                                        on={indexHanlderTooth} />

                                    <Text id={"bookingTextToothAndProcedure"}>Procedure</Text>
                                    <ComboBox id={"bookingToothAndProcedureSelectDropdown"} 
                                        items={treatmentList()} 
                                        currentIndex={this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex]}
                                        on={indexHanlderProcedure} />
                                </View>

                                {/* <View style="flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure</Text>
                                    <ComboBox style={"flex: 2;"} items={treatmentList()} currentIndex={this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedIndex]}
                                    on={indexHanlderProcedure} />
                                </View> */}

                                <View style="flex-direction: 'row';">
                                    <Text id={"bookingTextToothAndProcedure"}>Procedure cost</Text>
                                    <LineEdit id={"bookingPriceAndTimeTextFields"} on={textHandlerCost} text={this.state.procedureCostStored[this.state.currentlySelectedIndex]} />
                                    <Text id={"bookingTextToothAndProcedure"}>Procedure time</Text>
                                    <LineEdit id={"bookingPriceAndTimeTextFields"} on={textHandlerTime} text={this.state.procedureTimeStored[this.state.currentlySelectedIndex]} />
                                    
                                </View>
                                
                                <View style="flex-direction: 'row';">
                                    <Button id={"bookingDefaultCostAndTimeButton"} on={setProcedurePriceAndTime} text={"Default procedure cost & time"}></Button>
                                    
                                </View>

                                <View style="margin: 10px;"></View>

                                <View style="flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Notes</Text>
                                    
                                </View>

                                
                                {/* <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentlySelectedIndex]} /> */}
                                <PlainTextEditWrapper callback={console.log} style={"flex: 1;"}></PlainTextEditWrapper>
                                <Button on={temp}></Button>
                                
                                
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
} 

export default BookingPageDentalChart;
