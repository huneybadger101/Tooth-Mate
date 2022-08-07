import { Text, View, Button, LineEdit, ComboBox, SpinBox } from "@nodegui/react-nodegui";
import React from "react";
import { treatmentList, timeAMorPM, timeHourRange, timeMinuteRange } from "./Calendarhelpers/comboBoxVariables";
import { pullFromDataBase, editFromDB } from "./Calendarhelpers/calendarPullFromDB";
import { addLeadingZeros } from "./Calendarhelpers/leadingZeros";

export class Bookings extends React.Component<any, any> {

    constructor(props: any) {
    super(props);
        this.state = {
            NHINumber: "",
            date: "",
            name: "",
            dentist: "",
            notes: "",
            confirmMessage: "",
            currentBookingSelected: "",
            editBookingButton: false,
            
            //If 0 then show the bookings list, if 1 then showe the create/ edit booking
            bookingCreateOrEditDisplay: 0,
            bookingOrCancelButtonText: "New Booking",
            editButtonClicked: false,
            completeClickedEdit: false,
            completeClickedCreate: false,
            

            bookingID: [],
            NHInum: [],
            patientName: [],
            timeHour: [],
            timeMinute: [],
            timeAM_PM: [],
            dentistName: [],
            procedure: [],
            areasAffected: [],
            patientNotes: [],
            oldValues: []
        }
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {
        
        var splitBookingString = this.props.data.split(".");
        var day = splitBookingString[0];
        var month = splitBookingString[1];
        var year = splitBookingString[2];
        var weekday = splitBookingString[3];
        var bookingDate = splitBookingString[0] + "/" + splitBookingString[1] + "/" + splitBookingString[2];
        
        if (bookingDate == "0/1/0")
        {
            bookingDate = "";
        }

        const textHandlerNHI = {
            textChanged: (textValue:any) =>{

                this.state.NHInum[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z0-9! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                    NHINumber: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }
        
        const textHandlerName = {
            textChanged: (textValue:any) =>{

                this.state.patientName[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerTimeHour = {
            valueChanged: (newValue:any) =>{
                //TODO: LIMIT THE TIME TO 12

                this.state.timeHour[this.state.currentBookingSelected] = newValue;
            }
        }

        const textHandlerTimeMinute = {
            valueChanged: (newValue:any) =>{    
                this.state.timeMinute[this.state.currentBookingSelected] = newValue;
            }
        }

        const textHandlerTimeA_P = {
            currentTextChanged: (currentText:any) =>{
                this.state.timeAM_PM[this.state.currentBookingSelected] = currentText;
            }
        }

        const textHandlerDentist = {
            textChanged: (textValue:any) =>{

                this.state.dentistName[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerProcedure = {
            currentTextChanged: (currentText:any) =>{
                this.state.procedure[this.state.currentBookingSelected] = currentText;
            }
        }

        const textHandlerAreasAffected = {
            textChanged: (textValue:any) =>{

                this.state.areasAffected[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerNotes = {
            textChanged: (textValue:any) =>{

                this.state.patientNotes[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const buttonHandlerBookingOrCancel = {
            clicked: () => {

                if (this.state.bookingCreateOrEditDisplay == 1)
                {
                    this.state.bookingID[this.state.currentBookingSelected] = "";
                    this.state.NHInum[this.state.currentBookingSelected] = "";
                    this.state.patientName[this.state.currentBookingSelected] = "";

                    this.state.timeHour[this.state.currentBookingSelected] = "10";
                    this.state.timeMinute[this.state.currentBookingSelected] = "00";
                    this.state.timeAM_PM[this.state.currentBookingSelected] = "AM";

                    this.state.dentistName[this.state.currentBookingSelected] = "";
                    this.state.procedure[this.state.currentBookingSelected] = "";
                    this.state.areasAffected[this.state.currentBookingSelected] = "";
                    this.state.patientNotes[this.state.currentBookingSelected] = "";

                    this.setState({
                        bookingCreateOrEditDisplay: 0,
                        bookingOrCancelButtonText: "Create Booking",
                        editButtonClicked: false,
                        completeClickedCreate: false
                    });
                }
                else
                {
                    this.state.timeHour[this.state.currentBookingSelected] = "10";
                    this.state.timeMinute[this.state.currentBookingSelected] = "00";
                    this.state.timeAM_PM[this.state.currentBookingSelected] = "AM";

                    this.setState({
                        bookingCreateOrEditDisplay: 1,
                        bookingOrCancelButtonText: "Cancel",
                        completeClickedCreate: true
                    });
                } 
            }
        }

        var bookingList:any = [];
        var bookingVariables:any = [];
        var dateFull = (day + "/" + month + "/" + year);
        //Assigns the variables from the database into the bookingVariables array for later use.
        

    
        if (this.state.editButtonClicked == false)
        {
            bookingVariables = pullFromDataBase(dateFull);
        }
        // bookingVariables = pullFromDataBase(dateFull);

        if (day != 0)
        {
            for (var num = 0; num < bookingVariables.length; num++)
            {
                //Sets a reference point for the button that is clicked
                let bookingSelected = bookingVariables[num].split(".")[0].toString();

                if (this.state.editButtonClicked == false)
                {
                    //Sets all the variables to allow for editing the booking
                    this.state.bookingID[num] = bookingVariables[num].split(".")[0];
                    this.state.NHInum[num] = bookingVariables[num].split(".")[1];
                    this.state.patientName[num] = bookingVariables[num].split(".")[2];
                        //NOTE: Date is not required as it will be changed via the calendar
                    this.state.timeHour[num] = bookingVariables[num].split(".")[4];
                    this.state.timeMinute[num] = bookingVariables[num].split(".")[5];
                    this.state.timeAM_PM[num] = bookingVariables[num].split(".")[6];

                    this.state.dentistName[num] = bookingVariables[num].split(".")[7];
                    this.state.procedure[num] = bookingVariables[num].split(".")[8];
                    this.state.areasAffected[num] = bookingVariables[num].split(".")[9];
                    this.state.patientNotes[num] = bookingVariables[num].split(".")[10];

                    this.state.oldValues[0] = bookingVariables[num].split(".")[0];
                    this.state.oldValues[1] = bookingVariables[num].split(".")[1];
                    this.state.oldValues[2] = bookingVariables[num].split(".")[2];
                    this.state.oldValues[3] = bookingVariables[num].split(".")[3];

                    this.state.oldValues[4] = (
                        bookingVariables[num].split(".")[4] + ":" +
                        bookingVariables[num].split(".")[5] + "" +
                        bookingVariables[num].split(".")[6]);

                    this.state.oldValues[5] = bookingVariables[num].split(".")[7];
                    this.state.oldValues[6] = bookingVariables[num].split(".")[8];
                    this.state.oldValues[7] = bookingVariables[num].split(".")[9];
                    this.state.oldValues[8] = bookingVariables[num].split(".")[10];
                }
                

                //Creates the bookings to view, will also create an edit button for each booking
                bookingList.push(
                    <View style="margin: 3px; flex-direction: 'row';">

                        <Text style={"flex: 8; border: 1px solid black;"}>{"Booking ID: " + bookingVariables[num].split(".")[0] + ", Booking date" + dateFull}</Text>

                        <Button 
                            style={"flex: 2;"}
                            text={"Edit"}
                            id={bookingSelected}
                            on={{clicked: () => {
                                this.setState({
                                    currentBookingSelected: bookingSelected, 
                                    editBookingButton: true, 
                                    bookingCreateOrEditDisplay: 1, 
                                    editButtonClicked: true,
                                    completeClickedEdit: true,
                                    bookingOrCancelButtonText: "Cancel"
                                })
                            }}}
                        />

                        <Button style={"flex: 2;"} text={"Info"}></Button>

                    </View>
                );
            }
        }
    
        const buttonHandlerCompleteEditOrCreation = {
            clicked: () => {
                //TODO: Have a confirm screen showing what will be changed

                
                
                
                //Activates when the complete button was clicked while editing an existing booking
                if (this.state.completeClickedEdit == true)
                {
                    this.setState({
                        bookingCreateOrEditDisplay: editFromDB(
                                //Sending the updated variables to compare with at the end of the edit
                                this.state.bookingID[this.state.currentBookingSelected],
                                this.state.NHInum[this.state.currentBookingSelected],
                                this.state.patientName[this.state.currentBookingSelected],
                                dateFull,
                                //Time is sent together so it is easier to handle on the other end
                                addLeadingZeros(this.state.timeHour[this.state.currentBookingSelected], 2) + ":" +
                                addLeadingZeros(this.state.timeMinute[this.state.currentBookingSelected], 2) + "" +
                                this.state.timeAM_PM[this.state.currentBookingSelected],
                                this.state.dentistName[this.state.currentBookingSelected],
                                this.state.procedure[this.state.currentBookingSelected],
                                this.state.areasAffected[this.state.currentBookingSelected],
                                this.state.patientNotes[this.state.currentBookingSelected],

                                //Sending the old variables to compare with at the end of the edit
                                this.state.oldValues[0],
                                this.state.oldValues[1],
                                this.state.oldValues[2],
                                this.state.oldValues[3],
                                this.state.oldValues[4],
                                this.state.oldValues[5],
                                this.state.oldValues[6],
                                this.state.oldValues[7],
                                this.state.oldValues[8]
                            ),

                            editButtonClicked: false
                    });










                }
                else if (this.state.completeClickedCreate == true)
                {
                    console.log("---BOOKING CREATED---");
                    console.log(this.state.bookingID[this.state.currentBookingSelected]);
                    console.log(this.state.NHInum[this.state.currentBookingSelected]);
                    console.log(this.state.patientName[this.state.currentBookingSelected]);
                    console.log(dateFull);

                    console.log(
                        addLeadingZeros(this.state.timeHour[this.state.currentBookingSelected], 2) + ":" +
                        addLeadingZeros(this.state.timeMinute[this.state.currentBookingSelected], 2) + "" +
                        this.state.timeAM_PM[this.state.currentBookingSelected]
                        );

                    console.log(this.state.dentistName[this.state.currentBookingSelected]);
                    console.log(this.state.procedure[this.state.currentBookingSelected]);
                    console.log(this.state.areasAffected[this.state.currentBookingSelected]);
                    console.log(this.state.patientNotes[this.state.currentBookingSelected]);
                }
            }
        }

        const containerStyle = `
            
            background: 'white';
            border: 1px solid black;
            margin: 10px;
            
        `;

        const containerStyle2 = `
            flex-grow: auto 0 0;
            background: 'white';
            border: 0px solid black;
            margin: 0px;
            height: '100%';
        `;

        var pageDiplay: any = [];

        pageDiplay[1] = (
            <View style="flex-direction: 'row';">
            <View style={containerStyle}>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Booking ID</Text>
                        <LineEdit style={"flex: 2;"} text={this.state.bookingID[this.state.currentBookingSelected]} enabled={false}/>
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>NHI Number</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerNHI} text={this.state.NHInum[this.state.currentBookingSelected]}/>
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Date</Text>
                        <LineEdit style={"flex: 2;"} text={bookingDate} enabled={false} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Patient Name</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerName} text={this.state.patientName[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 2; border: 1px solid black;"}>Time</Text>
                        <SpinBox style={"flex: 1;"} value={this.state.timeHour[this.state.currentBookingSelected]} on={textHandlerTimeHour} range={timeHourRange()}/>
                        <SpinBox style={"flex: 1;"} value={this.state.timeMinute[this.state.currentBookingSelected]} on={textHandlerTimeMinute} range={timeMinuteRange()}/>
                        <ComboBox style={"flex: 1;"} items={timeAMorPM()} currentText={this.state.timeAM_PM[this.state.currentBookingSelected]} on={textHandlerTimeA_P} />
                    </View>

                    {/* this.state.timeHour[this.state.currentBookingSelected]
                    this.state.timeMinute[this.state.currentBookingSelected]
                    this.state.timeAM_PM[this.state.currentBookingSelected] */}

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Dentist name</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerDentist} text={this.state.dentistName[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Procedure</Text>
                        <ComboBox style={"flex: 2;"} items={treatmentList()} currentText={this.state.procedure[this.state.currentBookingSelected]} on={textHandlerProcedure} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Areas affected</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerAreasAffected} text={this.state.areasAffected[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Patient notes</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentBookingSelected]} />
                    </View>

                    <Button text={"Complete"} on={buttonHandlerCompleteEditOrCreation}></Button>
                    
                </View>
                </View>
        );

        pageDiplay[0] = (
            <View style="flex-direction: 'row';">

                
                <View style={containerStyle2}>
                <Text style="border: 1px solid black; padding: 10px;">
                    {"Date selected: " + dateFull}
                </Text>

                    {bookingList}
                    <Text style={"margin: 10px;"}>{this.state.confirmMessage}</Text>

                </View>
            </View>
        );

        return (
            <View>

                <View>
                    <Button text = {this.state.bookingOrCancelButtonText} style={""} on = {buttonHandlerBookingOrCancel} />
                </View>

                {pageDiplay[this.state.bookingCreateOrEditDisplay]}

            </View>
        );  
    }
} 

export default Bookings;
