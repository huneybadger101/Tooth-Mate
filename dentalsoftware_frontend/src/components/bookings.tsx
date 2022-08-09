import { Text, View, Button, LineEdit, ComboBox, SpinBox } from "@nodegui/react-nodegui";
import React from "react";
import { treatmentList, timeAMorPM, timeHourRange, timeMinuteRange } from "./Calendarhelpers/comboBoxVariables";
import { pullFromDataBase, deleteFromDataBase } from "./Calendarhelpers/calendarPullFromDB";
import { createBooking } from "./Calendarhelpers/createBooking";
import { editFromDB } from "./Calendarhelpers/editBooking";
import { addLeadingZeros, replaceStringAtLength, NHIcorrectFormatCheck } from "./Calendarhelpers/textFormatFunctions";
import { viewBooking } from "./Calendarhelpers/viewBookingSelected";

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

            oldValuesBookingID: [],
            oldValuesNHInumber: [],
            oldValuesDate: [],
            oldValuesPatientName: [],
            oldValuesTime: [],
            oldValuesDentistName: [],
            oldValuesProcedure: [],
            oldValuesAreasAffected: [],
            oldValuesPatientNotes: [],
        }
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {
        
        //Pulls data from the calendar component
        var splitBookingString = this.props.data.split(".");
        var day = splitBookingString[0];
        var month = splitBookingString[1];
        var year = splitBookingString[2];
        var weekday = splitBookingString[3];
        var bookingDate = splitBookingString[0] + "/" + splitBookingString[1] + "/" + splitBookingString[2];

        if (bookingDate == "0/1/0")
        {
            bookingDate = "---";
        }

        //Required to toggle the edit, create booking, and delete button being displayed. Will also be used to determinen what bookings are displayed
        var userType:any = "admin";

        //Handles and changes the text for the NHI number during booking edit and creation
        const textHandlerNHI = {
            textChanged: (textValue:any) =>{

                this.state.NHInum[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z0-9! ]+/g, '');
                this.state.NHInum[this.state.currentBookingSelected] = replaceStringAtLength(this.state.NHInum[this.state.currentBookingSelected], 7);
                this.state.NHInum[this.state.currentBookingSelected] = NHIcorrectFormatCheck(this.state.NHInum[this.state.currentBookingSelected]);

                this.setState({
                    editButtonClicked: true
                })
            }
        }
        
        //Handles and changes the text for the patient name during booking edit and creation
        const textHandlerName = {
            textChanged: (textValue:any) =>{

                this.state.patientName[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.state.patientName[this.state.currentBookingSelected] = replaceStringAtLength(textValue, 30);

                this.setState({
                    editButtonClicked: true
                })
            }
        }

        //Handles and changes the value for the times hour variable during booking edit and creation
        const textHandlerTimeHour = {
            valueChanged: (newValue:any) =>{
                this.state.timeHour[this.state.currentBookingSelected] = newValue;
            }
        }

        //Handles and changes the value for the times minute variable during booking edit and creation
        const textHandlerTimeMinute = {
            valueChanged: (newValue:any) =>{    
                this.state.timeMinute[this.state.currentBookingSelected] = newValue;
            }
        }

        //Handles and changes the value for the times AM/ PM variable during booking edit and creation
        const textHandlerTimeA_P = {
            currentTextChanged: (currentText:any) =>{
                this.state.timeAM_PM[this.state.currentBookingSelected] = currentText;
            }
        }

        //Handles and changes the text for the dentist name during booking edit and creation
        const textHandlerDentist = {
            textChanged: (textValue:any) =>{

                this.state.dentistName[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.state.dentistName[this.state.currentBookingSelected] = replaceStringAtLength(textValue, 30);

                this.setState({
                    editButtonClicked: true
                })
            }
        }

        //Handles and changes the text for the procedure type during booking edit and creation
        const textHandlerProcedure = {
            currentTextChanged: (currentText:any) =>{
                this.state.procedure[this.state.currentBookingSelected] = currentText;
            }
        }

        //TODO
        const textHandlerAreasAffected = {
            textChanged: (textValue:any) =>{

                this.state.areasAffected[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: true
                })
            }
        }

        //TODO
        const textHandlerNotes = {
            textChanged: (textValue:any) =>{

                this.state.patientNotes[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: true
                })

                this.setState({
                    //TODO: replace past a specific length
                })
            }
        }

        //Handles what happens with the top button (it will switch between booking and cancel) and will reset variables if canceled
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
        var bookingListEditButton:any = [];
        var bookingListDeleteButton:any = [];
        var bookingVariables:any = [];

        var dateFull = (day + "/" + month + "/" + year);

        if (dateFull == "0/1/0")
        {
            dateFull = "---";
        }

        //Assigns the variables from the database into the bookingVariables array for later use.
    
        if (this.state.editButtonClicked == false)
        {
            bookingVariables = pullFromDataBase(dateFull, userType);
        }

        //Will go through and assign the variables from 'bookingVariables' to be displayed when editing a booking
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

                    //Sets the old variables to be used when the edit is complete for comparison
                    this.state.oldValuesBookingID[num] = bookingVariables[num].split(".")[0];
                    this.state.oldValuesNHInumber[num] = bookingVariables[num].split(".")[1];
                    this.state.oldValuesDate[num] = bookingVariables[num].split(".")[2];
                    this.state.oldValuesPatientName[num] = bookingVariables[num].split(".")[3];
                    //Mixes time together for easier handling when being sent to other functions
                    this.state.oldValuesTime[num] = (
                        bookingVariables[num].split(".")[4] + ":" +
                        bookingVariables[num].split(".")[5] + "" +
                        bookingVariables[num].split(".")[6]);
                    this.state.oldValuesDentistName[num] = bookingVariables[num].split(".")[7];
                    this.state.oldValuesProcedure[num] = bookingVariables[num].split(".")[8];
                    this.state.oldValuesAreasAffected[num] = bookingVariables[num].split(".")[9];
                    this.state.oldValuesPatientNotes[num] = bookingVariables[num].split(".")[10];
                }

                if (userType == "admin")
                {
                    bookingListEditButton.push(
                        <Button 
                            style={"flex: 1;"}
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
                            }}}/>
                    );

                    bookingListDeleteButton.push(
                        <Button style={"flex: 1;"} text={"Delete"} id={bookingSelected} on={{clicked: ()=>{deleteFromDataBase(bookingSelected)}}}/>
                    );
                }

                //Creates the bookings to view
                //will also create an edit button for each booking, an info button to get more details, and a delete button to remove the selected booking
                //NOTE: Will only add the edit and delete buttons if the user type has said abilities
                bookingList.push(
                    <View style="margin: 3px; flex-direction: 'row';">

                        <Text style={"flex: 8; border: 1px solid black;"}>{"Booking ID: " + bookingVariables[num].split(".")[0] + ", Booking date" + dateFull}</Text>

                        <Button style={"flex: 1;"} text={"Info"} id={bookingSelected} on={{clicked: ()=>{
                            
                            this.setState({
                                currentBookingSelected: bookingSelected
                            }),

                            viewBooking(
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
                            this.state.patientNotes[this.state.currentBookingSelected])
                        
                        
                        }}} />
                        
                        {/*TODO: Have the info button bring up a window (or change the screen) to view detailed version of selected booking*/}
                        {bookingListEditButton[num]}
                        {bookingListDeleteButton[num]}

                    </View>
                );
            }
        }
    
        //Sends data to be "idiot proofed" and confirmed
        const buttonHandlerCompleteEditOrCreation = {
            clicked: () => {

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
                            this.state.oldValuesBookingID[this.state.currentBookingSelected],
                            this.state.oldValuesNHInumber[this.state.currentBookingSelected],
                            this.state.oldValuesDate[this.state.currentBookingSelected],
                            this.state.oldValuesPatientName[this.state.currentBookingSelected],
                            this.state.oldValuesTime[this.state.currentBookingSelected],
                            this.state.oldValuesDentistName[this.state.currentBookingSelected],
                            this.state.oldValuesProcedure[this.state.currentBookingSelected],
                            this.state.oldValuesAreasAffected[this.state.currentBookingSelected],
                            this.state.oldValuesPatientNotes[this.state.currentBookingSelected])
                    });

                    //Checks that 'bookingCreateOrEditDisplay' is set back to zero before allowing booking list loading
                    if (this.state.bookingCreateOrEditDisplay == 0)
                    {
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            editButtonClicked: false,
                        });
                    }
                    else
                    {
                        console.log("The edit was not done correctly...");
                    }

                }
                //Activates when the complete button was clicked during a booking creation
                else if (this.state.completeClickedCreate == true)
                {
                    this.setState({
                        bookingCreateOrEditDisplay: createBooking(
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
                        this.state.patientNotes[this.state.currentBookingSelected]),
                        bookingOrCancelButtonText: "Create Booking"
                    });

                    //Checks that 'bookingCreateOrEditDisplay' is set back to zero before allowing booking list loading
                    if (this.state.bookingCreateOrEditDisplay == 0)
                    {
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            editButtonClicked: false
                        });
                    }
                    else
                    {
                        console.log("The booking creation was not done correctly...");
                    }
                }
            }
        }

        const containerStyle = `
            
            background: 'white';
            border: 0px solid black;
            margin: 20px;
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

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>NHI Number</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerNHI} text={this.state.NHInum[this.state.currentBookingSelected]}/>
                    </View>

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient Name</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerName} text={this.state.patientName[this.state.currentBookingSelected]} />
                    </View>




                    <View style="margin: 10px;"></View>




                    

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Date</Text>
                        <LineEdit style={"flex: 2;"} text={bookingDate} enabled={false} />
                    </View>

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 3; border: 1px solid black; background: 'LightGrey';"}>Time</Text>
                        <SpinBox style={"flex: 2;"} value={this.state.timeHour[this.state.currentBookingSelected]} on={textHandlerTimeHour} range={timeHourRange()}/>
                        <SpinBox style={"flex: 2;"} value={this.state.timeMinute[this.state.currentBookingSelected]} on={textHandlerTimeMinute} range={timeMinuteRange()}/>
                        <ComboBox style={"flex: 2;"} items={timeAMorPM()} currentText={this.state.timeAM_PM[this.state.currentBookingSelected]} on={textHandlerTimeA_P} />
                    </View>

                    






                    <View style="margin: 10px;"></View>










                    

                    {/* this.state.timeHour[this.state.currentBookingSelected]
                    this.state.timeMinute[this.state.currentBookingSelected]
                    this.state.timeAM_PM[this.state.currentBookingSelected] */}

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Dentist name</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerDentist} text={this.state.dentistName[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure</Text>
                        <ComboBox style={"flex: 2;"} items={treatmentList()} currentText={this.state.procedure[this.state.currentBookingSelected]} on={textHandlerProcedure} />
                    </View>

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Areas affected</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerAreasAffected} text={this.state.areasAffected[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient notes</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px;"></View>

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

        //TODO: Impliment this feature properly
        var bookingCreateButton:any = [];

        if (userType == "admin")
        bookingCreateButton.push(
            <View>
                <Button text = {this.state.bookingOrCancelButtonText} style={""} on={buttonHandlerBookingOrCancel} visible={true}/>
            </View>
        );

        //Returs the booking page section to be displayed in the calendar
        //Note that the majority of the section is created above
        return (
            <View>

                {bookingCreateButton}

                {pageDiplay[this.state.bookingCreateOrEditDisplay]}

            </View>
        );  
    }
} 

export default Bookings;
