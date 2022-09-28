import { Text, View, Button, LineEdit, ComboBox, SpinBox } from "@nodegui/react-nodegui";
import React from "react";
import { treatmentList, timeAMorPM, timeHourRange, timeMinuteRange } from "./Calendarhelpers/comboBoxVariables";
import { deleteFromDataBase } from "./Calendarhelpers/calendarPullFromDB";
import { createBooking } from "./Calendarhelpers/createBooking";
import { editFromDB } from "./Calendarhelpers/editBooking";
import { addLeadingZeros, replaceStringAtLength, NHIcorrectFormatCheck } from "./Calendarhelpers/textFormatFunctions";
import { viewBooking } from "./Calendarhelpers/viewBookingSelected";
import Alert from "./alert";
import axios from 'axios';
import { BookingPageDentalChart } from "./Calendarhelpers/bookingDentalChart";

declare type ComboBoxItem = {
    text: string;
};

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
            patients: null,
            patientsViewed: null,
            dentists: null,
            patientsData: null,
            dentistsData: null,

            bookings: null,

            oldValuesBookingID: [],
            oldValuesNHInumber: [],
            oldValuesDate: [],
            oldValuesPatientName: [],
            oldValuesTime: [],
            oldValuesDentistName: [],
            oldValuesProcedure: [],
            oldValuesAreasAffected: [],
            oldValuesPatientNotes: [],

            patientContactNumberSearch: "",
            patientNHINumberSearch: ""
        }

        axios.post('http://localhost:3000/patients/getAllPatientData')
        .then((res) => {
            axios.post('http://localhost:3000/accounts/getAllAccounts')
            .then((resAccount) => {
                let patients: ComboBoxItem[] = [];

                for (let i = 0; i < res.data.result.length; i++) {
                    patients.push({text: res.data.result[i]['FirstName'] + " " + res.data.result[i]['LastName']})
                }

                this.setState({
                    patientsViewed: patients
                });

                let dentists: ComboBoxItem[] = [];

                for (let i = 0; i < resAccount.data.result.length; i++) {
                    dentists.push({text: resAccount.data.result[i]['AccountName']})
                }

                axios.post('http://localhost:3000/bookings/getAllBookings')
                .then((resBooking) => {
                    var bookingDisplayed: any = [];
                    for (let i = 0; i < resBooking.data.result.length; i++) {
                        let patient = null;
                        for (let k = 0; k < res.data.result.length; k++) {
                            if (resBooking.data.result[i]['Patient'] == res.data.result[k]['ID']) {
                                patient = res.data.result[k];
                                break;
                            }
                        }

                        bookingDisplayed[i] = (
                            {
                                index: i,
                                nhi: patient['NHI'],
                                patientName: patient["FirstName"] + " " + patient["LastName"],
                                date: resBooking.data.result[i]['Date'],
                                time: resBooking.data.result[i]['Time'],
                                location: resBooking.data.result[i]['Location'],
                                Procedure: resBooking.data.result[i]['ProcedureName'],
                                AffectedAreas: resBooking.data.result[i]['AffectedAreas'],
                                notes: patient['Notes']
                            }
                        );
                        this.setState({
                            patients: patients,
                            patientsData: res.data.result,
                            dentistsData: resAccount.data.result,
                            dentists: dentists,
                            bookings: bookingDisplayed
                        })
                    }

                })
                .catch((err) => {
                    console.log(err)
                });
            })
            .catch((err) => {
                console.log(err)
            });
        })
        .catch((err) => {
            console.log(err)
        });
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
        var bookingDateRev = splitBookingString[2] + "/" + splitBookingString[1] + "/" + splitBookingString[0];

        if (bookingDate == "0/1/0")
        {
            bookingDate = "---";
        }

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

        const textHandlerPatientSelected = {
            currentTextChanged: (currentText:any) =>{
                let patientID = null;
                for (let i = 0; i < this.state.patientsData.length; i++) {
                    let tempName = this.state.patientsData[i]['FirstName'] + " " + this.state.patientsData[i]['LastName'];
                    if (currentText == tempName) {
                        patientID = this.state.patientsData[i]['ID'];
                        break;
                    }
                }
                this.state.patientName[this.state.currentBookingSelected] = patientID;
            }
        }

        //Handles the patient search function
        const textHandlerPatientContactNumberSearch = {
            textChanged: (textValue:any) =>{

                this.setState({
                    patientContactNumberSearch: textValue
                })

                let patientsViewedTemp: ComboBoxItem[] = [];

                //Will loop through the patient table and check if the text provided matches several patient records
                //If it does, it will be saved into a combobox item to display as an avalaible patient to select
                for (let i = 0; i < this.state.patientsData.length; i++)
                {
                    if (this.state.patientsData[i]['FirstName'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                    else if ((this.state.patientsData[i]['FirstName'].toLowerCase() + " " + 
                    this.state.patientsData[i]["LastName"].toLowerCase()).includes(textValue.toLowerCase()) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                    else if ((this.state.patientsData[i]['FirstName'].toLowerCase() + " " + 
                    this.state.patientsData[i]['MiddleName'].toLowerCase() + " " + 
                    this.state.patientsData[i]["LastName"].toLowerCase()).includes(textValue.toLowerCase()) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                    else if (this.state.patientsData[i]['LastName'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                    else if (this.state.patientsData[i]['NHI'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                    else if (this.state.patientsData[i]['ContactNumber'].includes(textValue) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                    else if (this.state.patientsData[i]['Email'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        patientsViewedTemp.push({text: this.state.patientsData[i]["FirstName"] + " " + this.state.patientsData[i]["LastName"]})
                    }
                }

                this.setState({
                    patientsViewed: patientsViewedTemp
                })
            }
        }

        const textHandlerDentistSelected = {
            currentTextChanged: (currentText:any) => {
                let dentistID = null;
                for (let i = 0; i < this.state.dentistsData.length; i++) {
                    let tempName = this.state.dentistsData[i]['AccountName'];
                    if (currentText == tempName) {
                        dentistID = this.state.dentistsData[i]['ID'];
                        break;
                    }
                }
                this.state.dentistName[this.state.currentBookingSelected] = dentistID;
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

        //TODO: Handles the areas affected for the procedure type
        const textHandlerAreasAffected = {
            textChanged: (textValue:any) =>{

                this.state.areasAffected[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: true
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

        //Handles deleting bookings from the database
        const deleteBookingFromDatabase = (id:any) => {
            axios.post('http://localhost:3000/deleteBooking', null, {
                headers: {
                    'bookingid': Number(id),
                }
            })
            .then((res) => {
                console.log(res)
                this.props.callback(<Alert title={"Success"} message={"Deleted booking from database!"} style={"background-color: 'green'; width: 300px; height: 100px;"}></Alert>)
            })
            .catch((err) => {
                console.log(err)
                this.props.callback(<Alert title={"Error"} message={err} style={"background-color: 'red'; width: 600px; height: 400px;"}></Alert>)
            });

        }

        var bookingList:any = [];
        var bookingListEditButton:any = [];
        var bookingListDeleteButton:any = [];

        //Will set the date to --- if it has not been selected
        var dateFull = (day + "/" + month + "/" + year);
        if (dateFull == "0/1/0")
        {
            dateFull = "---";
        }

        //Will go through and assign the variables from 'bookingVariables' to be displayed when editing a booking
        if (day != 0 && this.state.bookings.length > 0)
        {
            for (var num = 0; num < this.state.bookings.length; num++)
            {

                let bookingYear = this.state.bookings[num]['date'].split("T")[0].split("-")[0]
                let bookingMonth = Number(this.state.bookings[num]['date'].split("T")[0].split("-")[1]).toString()
                let bookingDay = (Number(this.state.bookings[num]['date'].split("T")[0].split("-")[2]) + 1).toString()

                let bookingDateString = bookingYear + "/" + bookingMonth + "/" + bookingDay;
                if (bookingDateRev == bookingDateString) {
                    
                    //Sets a reference point for the button that is clicked
                    let bookingSelected = num.toString();

                    if (this.state.editButtonClicked == false)
                    {
                        //Sets all the variables to allow for editing the booking
                        this.state.bookingID[num] = num;
                        this.state.NHInum[num] = this.state.bookings[num]['nhi'];
                        this.state.patientName[num] = this.state.bookings[num]['patientName'];
                            //NOTE: Date is not required as it will be changed via the calendar
                        this.state.timeHour[num] = this.state.bookings[num]['time'].split(":")[0];
                        this.state.timeMinute[num] = this.state.bookings[num]['time'].split(":")[1];
                        this.state.timeAM_PM[num] = (Number(this.state.timeHour[num]) > 12 ? "PM" : "AM");
                        this.state.dentistName[num] = "NEED TO ADD";
                        this.state.procedure[num] = this.state.bookings[num]['Procedure'];
                        this.state.areasAffected[num] = this.state.bookings[num]['AffectedAreas'];
                        this.state.patientNotes[num] = this.state.bookings[num]['notes'];

                        //Sets the old variables to be used when the edit is complete for comparison
                        this.state.oldValuesBookingID[num] = this.state.bookingID[num];
                        this.state.oldValuesNHInumber[num] = this.state.NHInum[num];
                        this.state.oldValuesDate[num] = this.state.bookings[num]['date'];
                        this.state.oldValuesPatientName[num] = this.state.patientName[num];
                        //Mixes time together for easier handling when being sent to other functions
                        this.state.oldValuesTime[num] = (
                            this.state.timeHour[num] + ":" +
                            this.state.timeMinute[num] + "" +
                            this.state.timeAM_PM[num]);
                        this.state.oldValuesDentistName[num] = this.state.dentistName[num];
                        this.state.oldValuesProcedure[num] = this.state.procedure[num];
                        this.state.oldValuesAreasAffected[num] = this.state.areasAffected[num];
                        this.state.oldValuesPatientNotes[num] = this.state.patientNotes[num];

                    }

                    if (this.props.accountHelper.accountAdmin)
                    {
                        bookingListEditButton[num] = 
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

                        bookingListDeleteButton[num] =
                            <Button style={"flex: 1;"} text={"Delete"} id={bookingSelected} on={{clicked: ()=>{deleteBookingFromDatabase(bookingSelected)}}}/>
                    }

                    //Creates the bookings to view
                    //will also create an edit button for each booking, an info button to get more details, and a delete button to remove the selected booking
                    //NOTE: Will only add the edit and delete buttons if the user type has said abilities
                    bookingList[num] =
                        <View style="margin: 3px; flex-direction: 'row';">

                            <Text style={"flex: 4; border: 1px solid black;"}>{"Booking ID: " + this.state.bookingID[num] + ", Booking date: " + dateFull}</Text>

                            <Button style={"flex: 1;"} text={"Info"} id={bookingSelected} on={{clicked: ()=>{
                                
                                this.setState({
                                    currentBookingSelected: bookingSelected
                                }),

//TODO: THIS ENTIRE SECTION MAY NOT BE NEEDED. CHECK THIS OUT AFTER THE BRANCHES HAVE BEEN MERGED--------------------------------------------------------------------------------------
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
                }
            }
        }
    
        //Sends data to be "idiot proofed" and confirmed
        const buttonHandlerCompleteEditOrCreation = {
            clicked: async () => {

                //Activates when the complete button was clicked while editing an existing booking
                if (this.state.completeClickedEdit == true)
                {
                    let bookingDay = this.state.bookings[this.state.currentBookingSelected]['date'].split("T")[0].split("-")[0]
                    let bookingMonth = Number(this.state.bookings[this.state.currentBookingSelected]['date'].split("T")[0].split("-")[1]).toString()
                    let bookingYear = (Number(this.state.bookings[this.state.currentBookingSelected]['date'].split("T")[0].split("-")[2])).toString()

                    let bookingDateString = bookingYear + "/" + bookingMonth + "/" + bookingDay;
                    this.setState({
                        bookingCreateOrEditDisplay: await editFromDB(
                            //Sending the updated variables to compare with at the end of the edit
                            this.state.bookingID[this.state.currentBookingSelected],
                            bookingDateString,
                            //Time is sent together so it is easier to handle on the other end
                            addLeadingZeros(this.state.timeHour[this.state.currentBookingSelected], 2) + ":" +
                            addLeadingZeros(this.state.timeMinute[this.state.currentBookingSelected], 2) + "" +
                            this.state.timeAM_PM[this.state.currentBookingSelected],
                            this.state.procedure[this.state.currentBookingSelected],
                            this.state.areasAffected[this.state.currentBookingSelected],
                            this.state.patientNotes[this.state.currentBookingSelected])
                    });

                    this.props.callback(this.state.bookingCreateOrEditDisplay['view'])

                    //Checks that 'bookingCreateOrEditDisplay' is set back to zero before allowing booking list loading
                    if (this.state.bookingCreateOrEditDisplay['res'] == 0)
                    {
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            editButtonClicked: false,
                            bookingOrCancelButtonText: "Create Booking",
                            bookingCreateOrEditDisplay: 0
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
                        bookingCreateOrEditDisplay: await createBooking(
                        Number(this.state.patientName[this.state.currentBookingSelected]),
                        bookingDateRev,
                        //Time is sent together so it is easier to handle on the other end
                        addLeadingZeros(this.state.timeHour[this.state.currentBookingSelected], 2) + ":" +
                        addLeadingZeros(this.state.timeMinute[this.state.currentBookingSelected], 2) + "" +
                        this.state.timeAM_PM[this.state.currentBookingSelected],
                        Number(this.state.dentistName[this.state.currentBookingSelected]),
                        this.state.procedure[this.state.currentBookingSelected],
                        this.state.areasAffected[this.state.currentBookingSelected],
                        this.state.patientNotes[this.state.currentBookingSelected])
                    });
                    
                    this.props.callback(this.state.bookingCreateOrEditDisplay['view'])

                    //Checks that 'bookingCreateOrEditDisplay' is set back to zero before allowing booking list loading
                    if (this.state.bookingCreateOrEditDisplay['res'] == 0)
                    {
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            editButtonClicked: false,
                            bookingOrCancelButtonText: "Create Booking",
                            bookingCreateOrEditDisplay: 0
                        });
                    }
                    else if (this.state.bookingCreateOrEditDisplay['res'] == 1)
                    {
                        console.log("The booking creation was not done correctly...");
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            //editButtonClicked: true,
                            bookingOrCancelButtonText: "Cancel",
                            bookingCreateOrEditDisplay: 1
                        });
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
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Search patient via contact number</Text>
                        <LineEdit style={"flex: 2;"} text={this.state.patientContactNumberSearch} on={textHandlerPatientContactNumberSearch} />
                    </View>

            

                    <View style="margin: 0px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient</Text>
                        <ComboBox style={"flex: 2;"} items={this.state.patientsViewed} currentText={"Please select a patient"} on={textHandlerPatientSelected} />

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
                        <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Dentist</Text>
                        <ComboBox style={"flex: 2;"} items={this.state.dentists} currentText={"Please select a dentist"} on={textHandlerDentistSelected} />
                    </View>

                    <View style="margin: 10px;"></View>

                    <View style="margin: 0px; flex-direction: 'row';">
                        {/*textHandlerAreasAffected*/}
                        <BookingPageDentalChart></BookingPageDentalChart>
                    </View>

                    

                    <View style="margin: 10px;"></View>

                    <Button text={"Complete"} on={buttonHandlerCompleteEditOrCreation}></Button>

                </View>
                </View>
        );











        

        // axios.post('http://localhost:3000/tickets/getAllTickets')
        // .then((res) => {
        //     if (res.data.error) {
        //         console.log(res.data.error)
        //     } else {
                
        //         console.log("Ticket list length: " + res.data.result.length);

        //         //Will print the ticket info. Add this to the below code later
        //         console.log(res.data.result[0]["ID"]);
        //         console.log(res.data.result[0]["Patient"]);
        //         console.log(res.data.result[0]["NumberOfVisits"]);

        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // });






        axios.post('http://localhost:3000/tickets/getTicketByID')
        .then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                
                console.log("Ticket list length: " + res.data.result.length);

                //Will print the ticket info. Add this to the below code later
                console.log(res.data.result[0]["ticket/ID"]);
                console.log(res.data.result[0]["ticket/Patient"]);
                console.log(res.data.result[0]["ticket/NumberOfVisits"]);

            }
        })
        .catch((err) => {
            console.log(err)
        });
        


            const createBookingFromTicket = {
            clicked: (id:any) =>{

                //Sets all the variables to allow for editing the booking
                    this.state.bookingID[this.state.currentBookingSelected] = 0;
                    this.state.NHInum[this.state.currentBookingSelected] = this.state.bookings[0]['nhi'];
                    this.state.patientName[this.state.currentBookingSelected] = this.state.bookings[0]['patientName'];
                        //NOTE: Date is not required as it will be changed via the calendar
                    this.state.timeHour[this.state.currentBookingSelected] = this.state.bookings[0]['time'].split(":")[0];
                    this.state.timeMinute[this.state.currentBookingSelected] = this.state.bookings[0]['time'].split(":")[1];
                    this.state.timeAM_PM[this.state.currentBookingSelected] = (Number(this.state.timeHour[id]) > 12 ? "PM" : "AM");
                    this.state.dentistName[this.state.currentBookingSelected] = "NEED TO ADD";
                    this.state.procedure[this.state.currentBookingSelected] = this.state.bookings[0]['Procedure'];
                    this.state.areasAffected[this.state.currentBookingSelected] = this.state.bookings[0]['AffectedAreas'];
                    this.state.patientNotes[this.state.currentBookingSelected] = this.state.bookings[0]['notes'];







                    // console.log("Info: " + this.state.bookingID[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.NHInum[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.patientName[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.timeHour[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.timeMinute[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.timeAM_PM[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.dentistName[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.procedure[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.areasAffected[this.state.currentBookingSelected]);
                    // console.log("Info: " + this.state.patientNotes[this.state.currentBookingSelected]);

            }
        }








        const toggleBookingsAndTickets = {
            clicked: () =>{

                if (this.state.bookingCreateOrEditDisplay == 0)
                {
                    this.setState({
                        bookingCreateOrEditDisplay: 2
                    });
                }
                else if (this.state.bookingCreateOrEditDisplay == 2)
                {
                    this.setState({
                        bookingCreateOrEditDisplay: 0
                    });
                }
            }
        }




        var ticketList:any = [];
        var ticketListAddButton:any = [];
        var ticketListDeleteButton:any = [];

        for (var i = 0; i < 5; i++)
        {
            let ticketSelected = i.toString();

            ticketList[i] = 
            <View style="margin: 3px; flex-direction: 'row';">

                <Text style={"flex: 4; border: 1px solid black;"}>{"Some text for the tickets"}</Text>

                <Button style={"flex: 1;"} text={"Add"} id={ticketSelected} on={createBookingFromTicket} />

                <Button style={"flex: 1;"} text={"Delete"} id={ticketSelected} on={{clicked: ()=>{
                
                    console.log("Ticket ID selected delete: " + ticketSelected);
                
                }}} />

            </View> 
        }
















        pageDiplay[0] = (
            <View style="flex-direction: 'row';">
                <View style={containerStyle2}>

                    <View style="flex-direction: 'row';">
                        <Button text="<<" style="flex: 1;"></Button>
                        <Button text="View tickets" style="flex: 4;" on={toggleBookingsAndTickets}></Button>
                        <Button text=">>" style="flex: 1;"></Button>
                    </View>

                    <Text style="border: 1px solid black; padding: 10px;">{"Date selected: " + dateFull}</Text>

                    {bookingList}

                    <Text style={"margin: 10px;"}>{this.state.confirmMessage}</Text>

                </View> 
            </View>
        );




        pageDiplay[2] = (
            <View style="flex-direction: 'row';">

                <View style={containerStyle2}>

                    <View style="flex-direction: 'row';">
                        <Button text="<<" style="flex: 1;"></Button>
                        <Button text="View bookings" style="flex: 4;" on={toggleBookingsAndTickets}></Button>
                        <Button text=">>" style="flex: 1;"></Button>
                    </View>

                    {ticketList}
                </View>
                
            </View>
        );




        





        //TODO: Impliment this feature properly
        var bookingCreateButton:any = [];

        if (this.props.accountHelper.accountAdmin) {
            bookingCreateButton.push(
                <View>
                    <Button text = {this.state.bookingOrCancelButtonText} style={""} on={buttonHandlerBookingOrCancel} visible={true}/>
                </View>
            );
        }

        //Returs the booking page section to be displayed in the calendar
        //Note that the majority of the section is created above
        return (
            <View style={containerStyle2}>
                

                {bookingCreateButton}

                {pageDiplay[this.state.bookingCreateOrEditDisplay]}

            </View>
        );  
    }
} 

export default Bookings;
