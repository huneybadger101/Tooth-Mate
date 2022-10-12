import { Text, View, Button, LineEdit, ComboBox, SpinBox, Window } from "@nodegui/react-nodegui";
import React from "react";
import { timeAMorPM, timeHourRange, timeMinuteRange } from "./Calendarhelpers/comboBoxVariables";
import { createBooking } from "./Calendarhelpers/createBooking";
import { editFromDB } from "./Calendarhelpers/editBooking";
import { addLeadingZeros, replaceStringAtLength, NHIcorrectFormatCheck, bookingDentalChartTrueOrFalse } from "./Calendarhelpers/textFormatFunctions";
import { viewBooking } from "./Calendarhelpers/viewBookingSelected";
import Alert from "./alert";
import axios from 'axios';
import { BookingPageDentalChart } from "./Calendarhelpers/bookingDentalChart";
import DentalChart from "./dentalChart";
import PerioChart from "./perioChart";
import { toothNames } from "./Calendarhelpers/comboBoxVariables";
import { style } from "../styles/style";
import Calendar from "./calendar";

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://tmAdmin:tmAdminR&D@toothmatecluster.82nq5.mongodb.net/?retryWrites=true&w=majority";

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
            confirmMessage: "Test text",
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
            areasAffected: [],         
            bookingShowInfo: [],
            patients: null,
            patientsViewed: null,
            patientsViewedPermanent: null,
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
            patientNHINumberSearch: "",
            ticketListTextDisplayedArray: [],
            ticketVisitTableCatagory: [],
            ticketPatientNHIStored: [],
            ticketCount: 0,
            numberOfVisitsCount: [],
            dentalChartDataHolderOne: [],
            dentalChartDataHolderTwo: [],
            dentalChartDataHolderThree: [],
            dentalChartDataHolderFour: [],
            dentalChartDataHolderFive: [],
            dentalChartDataHolderSix: [],
            dentalChartDataHolderSeven: [],
            dentalChartDataHolderEight: [],
            dentalChartDataHolderNine: [],
            procedure: [],
            procedureCopy: [],
            procedureTimeStored: [],
            procedureCostStored: [],
            patientNotes: [],
            toothSelected: [],
            addTicketOrEditClicked: false,
            bookingDentalChartString: [],

            ticketsBeingDisplayed: 0,
            bookingsBeingDisplayed: 0,

            testVar: false
        }

        //Gets all of the tickets currently created
        axios.post('http://localhost:3000/tickets/getAllTickets')
        .then((resTickets) => {

            this.setState({ticketCount: resTickets.data.result.length});


            axios.post('http://localhost:3000/patients/getAllPatientData')
            .then((resPatients) => {

                for (var i = 0; i < resTickets.data.result.length; i++)
                {
                    this.state.ticketListTextDisplayedArray[i] = (
                        resTickets.data.result[i]['ID'] + " | " + 
                        resPatients.data.result[resTickets.data.result[i]['Patient']]['FirstName'] + " " + 
                        resPatients.data.result[resTickets.data.result[i]['Patient']]['LastName']);

                    this.state.ticketPatientNHIStored[i] = (resPatients.data.result[resTickets.data.result[i]['Patient']]);

                    this.state.numberOfVisitsCount[i] = (resTickets.data.result[i]['NumberOfVisits']);
                }
            })   
        })
        .catch((err) => {
            console.log(err)
        });

        axios.post('http://localhost:3000/patients/getAllPatientData')
        .then((res) => {
            axios.post('http://localhost:3000/accounts/getAllAccounts')
            .then((resAccount) => {
                let patients: ComboBoxItem[] = [];

                for (let i = 0; i < res.data.result.length; i++) {
                    patients.push({text: res.data.result[i]['FirstName'] + " " + res.data.result[i]['LastName']})
                }

                this.setState({
                    patientsViewed: patients,
                    patientsViewedPermanent: patients
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
                            bookings: bookingDisplayed,
                            bookingsRaw: resBooking.data.result
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

        

        var dentalChartTotal: any;

        //Creates a callback for the booking dental chart .tsx file
        const bookingsDentalChartCallback = (
            //Variables that are being sent back with the callback function:
            callChartOne: [],
            callChartTwo: [],
            callChartThree: [],
            callChartFour: [],
            callChartFive: [],
            callChartSix: [],
            callChartSeven:[],
            callChartEight: [],
            callChartNine: [],
            callProcedure: [],
            callProcedurePrice: [],
            callProcedureCost: [],
            callNotes: [],
            totalCharts: any,
            tooth: []
        ) => {

            dentalChartTotal = totalCharts;

            //Wipes the data before recreating it
            //This is so when the user removes a dental chart it does not remain in the following
            for (var i = 0; i < this.state.dentalChartDataHolderOne.length; i++)
            {
                this.state.dentalChartDataHolderOne[i] = [];
                this.state.dentalChartDataHolderTwo[i] = [];
                this.state.dentalChartDataHolderThree[i] = [];
                this.state.dentalChartDataHolderFour[i] = [];
                this.state.dentalChartDataHolderFive[i] = [];
                this.state.dentalChartDataHolderSix[i] = [];
                this.state.dentalChartDataHolderSeven[i] = [];
                this.state.dentalChartDataHolderEight[i] = [];
                this.state.dentalChartDataHolderNine[i] = [];
                this.state.procedure[i] = [];
                this.state.procedureCostStored[i] = [];
                this.state.procedureTimeStored[i] = [];
                this.state.patientNotes[i] = [];
                this.state.toothSelected[i] = [];
            }

            //Saves all of the booking dental chart settings to variables to use when the create booking/ edit booking buttons are clicked
            for (var i = 0; i < callChartOne.length; i++)
            {
                this.state.dentalChartDataHolderOne[i] = bookingDentalChartTrueOrFalse(callChartOne[i]);
                this.state.dentalChartDataHolderTwo[i] = bookingDentalChartTrueOrFalse(callChartTwo[i]);
                this.state.dentalChartDataHolderThree[i] = bookingDentalChartTrueOrFalse(callChartThree[i]);
                this.state.dentalChartDataHolderFour[i] = bookingDentalChartTrueOrFalse(callChartFour[i]);
                this.state.dentalChartDataHolderFive[i] = bookingDentalChartTrueOrFalse(callChartFive[i]);
                this.state.dentalChartDataHolderSix[i] = bookingDentalChartTrueOrFalse(callChartSix[i]);
                this.state.dentalChartDataHolderSeven[i] = bookingDentalChartTrueOrFalse(callChartSeven[i]);
                this.state.dentalChartDataHolderEight[i] = bookingDentalChartTrueOrFalse(callChartEight[i]);
                this.state.dentalChartDataHolderNine[i] = bookingDentalChartTrueOrFalse(callChartNine[i]);
                this.state.procedure[i] = callProcedure[i];
                this.state.procedureCostStored[i] = callProcedurePrice[i];
                this.state.procedureTimeStored[i] = callProcedureCost[i];
                this.state.patientNotes[i] = callNotes[i];
                this.state.toothSelected[i] = toothNames(tooth[i]);

                //Checks the procedure is not null
                if (this.state.procedure[i] == undefined || this.state.procedure[i] == "")
                {
                    this.state.procedure[i] = "Initial examination";
                }

                //Checks the price is not null
                if (this.state.procedureCostStored[i] == undefined || this.state.procedureCostStored[i] == "")
                {
                    this.state.procedureCostStored[i] = "$100.00";
                }
                
                //Checks the time is not null
                if (this.state.procedureTimeStored[i] == undefined || this.state.procedureTimeStored[i] == "")
                {
                    this.state.procedureTimeStored[i] = "1 hour";
                }

                //Replaces the patient notes with a generic placeholder...
                if (callNotes[i] == undefined || callNotes[i] == "")
                {
                    this.state.patientNotes[i] = "placeholder";
                }

                //Replaces the tooth selected with the initial tooth
                if (this.state.toothSelected[i] == undefined || this.state.toothSelected[i] == "")
                {
                    this.state.toothSelected[i] = toothNames(0);
                }
            }
        }

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

        //Handles when a patient is selected in the menu
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

        //Handles when a patient is searched for
        const textHandlerPatientSearch = {
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

        //Handles what happens with the top button (it will switch between booking and cancel) and will reset variables if canceled
        const buttonHandlerBookingOrCancel = {
            clicked: () => {

                //Resets many of the variables after clicking cancel
                    //This is to ensure that the settings to not remain after clicking create booking again
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
                    //Resets the time
                    this.state.timeHour[this.state.currentBookingSelected] = "10";
                    this.state.timeMinute[this.state.currentBookingSelected] = "00";
                    this.state.timeAM_PM[this.state.currentBookingSelected] = "AM";

                    //This will be sent to the booking display chart to tell it the new booking button was clicked
                        //This is to ensure that fields are not prefilled with data that should not be there...
                    this.state.bookingDentalChartString[0] = true;

                    //Changes settings so the page is the create booking page and resets the patient name combo box
                    this.setState({
                        bookingCreateOrEditDisplay: 1,
                        bookingOrCancelButtonText: "Cancel",
                        completeClickedCreate: true,
                        patientsViewed: this.state.patientsViewedPermanent
                    });
                } 
            }
        }

        const deleteBookingFromDatabase = (id:any) => {
            axios.post('http://localhost:3000/deleteBooking', null, {
                headers: {
                    'bookingid': Number(id),
                }
            })
            .then((res) => {
                console.log(res)
                this.props.callback(<Alert title={"Success"} message={"Deleted booking from database!"} style={"background-color: 'green';"}></Alert>)
            })
            .catch((err) => {
                console.log(err)
                this.props.callback(<Alert title={"Error"} message={err} style={"background-color: 'red';"}></Alert>)
            });

        }

        const sendBookingDataToMobileAppDatabase = (bookingID:number) => {

            let booking:any;
            let patient:any;
            let dentist:any;

            for (let i = 0; i < this.state.bookingsRaw.length; i++) {
                if (bookingID == this.state.bookingsRaw[i]['ID']) {
                    booking = this.state.bookingsRaw[i];
                    break;
                }
            }

            for (let i = 0; i < this.state.patientsData.length; i++) {
                if (booking['Patient'] == this.state.patientsData[i]['ID']) {
                    patient = this.state.patientsData[i];
                    break;
                }
            }

            for (let i = 0; i < this.state.dentistsData.length; i++) {
                if (booking['Dentist'] == this.state.dentistsData[i]['ID']) {
                    dentist = this.state.dentistsData[i];
                    break;
                }
            }

            let data = {
                id: booking['ID'],
                date: new Date(booking['Date']),
                time: booking['Time'],
                procedure: booking['ProcedureName'],
                location: booking['Location'],
                notes: booking['Notes'],
                patientName: patient['FirstName'] + (patient['MiddleName'] != '' ? (" " + patient['MiddleName'] + " ") : " ") + patient['LastName'],
                patientNHI: patient['NHI'],
                dentistName: dentist['DentistName']
            }

            let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
            client.connect((err:any) => {
                client.db("myFirstDatabase").collection("transferredBookings").find({}).toArray((err:any, result:any) => {
                    if (err) {
                        this.props.callback(<Alert title={"Error"} message={"Failed to get entries from mobile app's database!"} style={"background-color: 'red';"}></Alert>)
                        client.close();
                        return;
                    }
                    let found = false;
                    for (let i in result) {
                        if (result[i]['id'] == booking['ID']) {
                            found = true;
                        }
                    }
                    if (!found) {
                        client.db("myFirstDatabase").collection("transferredBookings").insertOne(data, (err:any, res:any) => {
                            if (err) {
                                this.props.callback(<Alert title={"Error"} message={"Failed to insert entry into mobile app's database!"} style={"background-color: 'red';"}></Alert>)
                                client.close();
                                return;
                            }
                            this.props.callback(<Alert title={"Success"} message={"Entry added into the mobile app's database!"} style={"background-color: 'green';"}></Alert>)
                            client.close();
                        })
                    } else {
                        this.props.callback(<Alert title={"Error"} message={"An entry for this booking already exists in the mobile app's database!"} style={"background-color: 'red';"}></Alert>)
                        client.close();
                    }
                  });
            })
        }

        var bookingList:any = [];
        var bookingListEditButton:any = [];
        var bookingListDeleteButton:any = [];

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

                        this.state.bookingDentalChartString[0] = false;
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
                            <View style="margin: 3px; flex-direction: 'column';">

                                <View style="margin: 3px; flex-direction: 'row';">
                                    <Text style={"flex: 4; border: 1px solid black;"}>{"Booking ID: " + (this.state.bookingID[num] + 1) + ", Booking date: " + dateFull}</Text>

                                    <Button style={"flex: 1;"} text={"Info"} id={bookingSelected} on={{clicked: ()=>{

                                        this.state.bookingShowInfo[this.state.bookingSelected] = !this.state.bookingShowInfo[this.state.bookingSelected];

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

                            {(this.state.bookingShowInfo[this.state.bookingSelected] == true ? <View style="margin: 3px;">
                                        <View style="flex-direction: 'column'; border: 1px solid black;">
                                            <View style="flex-direction: 'row';">
                                                <Text> Patient Name: {this.state.patientName[this.state.currentBookingSelected]}</Text>
                                                <Button text="View Dental Chart" on={{
                                                    clicked: () => {
                                                        this.props.newTab(<DentalChart NHI={this.state.NHInum[this.state.currentBookingSelected]} bookingID={this.state.bookingID[this.state.currentBookingSelected] + 1}/>, "Dental Chart - " + this.state.NHInum[this.state.currentBookingSelected])
                                                    }
                                                }}/>
                                                <Button text="View Perio Chart" on={{
                                                    clicked: () => {
                                                        this.props.newTab(<PerioChart NHI={this.state.NHInum[this.state.currentBookingSelected]} bookingID={this.state.bookingID[this.state.currentBookingSelected] + 1}/>, "Perio Chart - " + this.state.NHInum[this.state.currentBookingSelected])
                                                    }
                                                }}/>
                                                <Button text="Send Booking Data to Mobile App" on={{
                                                    clicked: () => {
                                                        sendBookingDataToMobileAppDatabase(this.state.bookingID[this.state.currentBookingSelected] + 1)
                                                    }
                                                }}/>
                                            </View>
                                            <Text> Patient NHI: {this.state.NHInum[this.state.currentBookingSelected]}</Text>
                                            <Text> Dentist Name: {this.state.dentistName[this.state.currentBookingSelected]}</Text>
                                            <Text> Booking Time: {addLeadingZeros(this.state.timeHour[this.state.currentBookingSelected], 2) + ":" + addLeadingZeros(this.state.timeMinute[this.state.currentBookingSelected], 2) + "" + this.state.timeAM_PM[this.state.currentBookingSelected]}</Text>
                                            <Text> Procedure: {this.state.procedure[this.state.currentBookingSelected]}</Text>
                                            <Text> Areas Affected: {this.state.areasAffected[this.state.currentBookingSelected]}</Text>
                                            <Text> Patient Notes: {this.state.patientNotes[this.state.currentBookingSelected]}</Text>
                                        </View> 
                                    </View>: null)}
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
                        });
                    }
                    else
                    {
                        console.log("The edit was not done correctly...");

                        this.setState({
                            bookingCreateOrEditDisplay: 1,
                            bookingOrCancelButtonText: "Cancel",
                            editButtonClicked: false,
                            completeClickedCreate: false
                        });
                    }

                }
                //Activates when the complete button was clicked during a booking creation
                else if (this.state.completeClickedCreate == true)
                {
                    //Calls a function to determine if the booking was valid or not...
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
                        this.state.patientNotes[this.state.currentBookingSelected],
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
                        this.state.procedureCostStored,
                        this.state.procedureTimeStored,
                        this.state.patientNotes,
                        dentalChartTotal,
                        this.state.toothSelected)
                    });
                    
                    this.props.callback(this.state.bookingCreateOrEditDisplay['view'])

                    //Checks that 'bookingCreateOrEditDisplay' is set back to zero before allowing booking list loading
                    if (this.state.bookingCreateOrEditDisplay['res'] == 0)
                    {
                        //Will allow the page to change due to a succesfull booking
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            editButtonClicked: false,
                            bookingOrCancelButtonText: "Create Booking"
                        });
                    }
                    else if (this.state.bookingCreateOrEditDisplay['res'] == 1)
                    {
                        //Will not allow the page to change until the booking is valid or cancelled...
                        this.setState({
                            bookingCreateOrEditDisplay: 1,
                            bookingOrCancelButtonText: "Cancel",
                            editButtonClicked: false,
                            completeClickedCreate: false
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

        //TDOO: Have the ticket clicked be deleted
        const deleteTicket = {
            clicked: (id:any) =>{

                console.log("ID: " + id);

                // //Sets all the variables to allow for editing the booking
                // this.state.bookingID[this.state.currentBookingSelected] = 0;
                // this.state.NHInum[this.state.currentBookingSelected] = this.state.bookings[1]['nhi'];
                // this.state.patientName[this.state.currentBookingSelected] = "Test name";
                //     //NOTE: Date is not required as it will be changed via the calendar
                // this.state.timeHour[this.state.currentBookingSelected] = 5;
                // this.state.timeMinute[this.state.currentBookingSelected] = 30;
                // this.state.timeAM_PM[this.state.currentBookingSelected] = "AM";
                // this.state.dentistName[this.state.currentBookingSelected] = "NEED TO ADD";
                // this.state.procedure[this.state.currentBookingSelected] = this.state.bookings[0]['Procedure'];
                // this.state.areasAffected[this.state.currentBookingSelected] = this.state.bookings[0]['AffectedAreas'];
                // this.state.patientNotes[this.state.currentBookingSelected] = this.state.bookings[0]['notes'];

                // let testComboBox: ComboBoxItem[] = [];
                // testComboBox.push({text: this.state.patientName[this.state.currentBookingSelected]});

                // this.setState({
                //     bookingCreateOrEditDisplay: 1,
                //     patientsViewed: testComboBox
                // });

                // console.log("TESTING THE INDEX PRINTING OUT: " + testComboBox[0].text);

            }
        }

        //Will toggle between the page to display bookings and tickets
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

        var numberOfTicketsDisplayed: any = 5;

        //Will toggle between the page to display bookings and tickets
        const ticketAndBookingListLeft = {
            clicked: () =>{

                //Will change the page for the booking list
                if (this.state.bookingCreateOrEditDisplay == 0)
                {
                    this.state.bookingsBeingDisplayed;
                }
                //Will change the page for the ticket list
                else if (this.state.bookingCreateOrEditDisplay == 2)
                {
                    if (this.state.ticketsBeingDisplayed >= numberOfTicketsDisplayed)
                    {
                        this.setState({
                            ticketsBeingDisplayed: this.state.ticketsBeingDisplayed - numberOfTicketsDisplayed
                        });
                    }
                }
            }
        }

        //Will display additional tickets by changing the page
        const ticketAndBookingListRight = {
            clicked: () =>{
                
                //Will change the page for the booking list
                if (this.state.bookingCreateOrEditDisplay == 0)
                {
                    this.state.bookingsBeingDisplayed;
                }
                //Will change the page for the ticket list
                else if (this.state.bookingCreateOrEditDisplay == 2)
                {
                    if (this.state.ticketsBeingDisplayed + numberOfTicketsDisplayed < this.state.ticketListTextDisplayedArray.length)
                    {
                        this.setState({
                            ticketsBeingDisplayed: this.state.ticketsBeingDisplayed + numberOfTicketsDisplayed
                        });
                    }
                }



                
            }
        }

        var ticketList:any = [];
        //let ticketListTextDisplayedArray:any = ticketItems();
        var ticketListDeleteButton:any = [];

        for (var i = 0; i < this.state.ticketListTextDisplayedArray.length; i++)
        {
            let ticketSelected = i.toString();

            ticketList[i] = 
            <View style="flex-direction: 'row';">

                <Text id={"ticketText"}>{this.state.ticketListTextDisplayedArray[i]}</Text>

                <Button id={"ticketAddAndDeleteButton"} text={"Add"} on={{

                    clicked: async () => {

                        //Deletes arrays contents in preperation to reset the arrays contents
                        //This will stop the arrays size from remaining the size it was prior to the reset
                            //In other words, if you just used this variable for storing 20 dental charts and
                            //then try to use it for storing 3 dental charts, it will still contain the 17
                            //dental charts that were used before...
                        for (var num = 0; num < this.state.bookingDentalChartString.length; num++)
                        {
                            this.state.bookingDentalChartString[num] = null;
                        }

                        //Gets all of the tickets currently created
                        await axios.post('http://localhost:3000/tickets/getTicketDataByID', null, {
                            headers: {
                                'ID': ticketSelected
                            }
                        })
                        .then((resTicketsVisit) => {

                            //TODO: have the booking dental charts load into the below variables...
                            for (var num = 0; num < resTicketsVisit.data.result['ticketVisitTooth'].length; num++)
                            {
                                this.state.dentalChartDataHolderOne[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData1'];
                                this.state.dentalChartDataHolderTwo[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData2'];
                                this.state.dentalChartDataHolderThree[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData3'];
                                this.state.dentalChartDataHolderFour[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData4'];
                                this.state.dentalChartDataHolderFive[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData5'];
                                this.state.dentalChartDataHolderSix[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData6'];
                                this.state.dentalChartDataHolderSeven[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData7'];
                                this.state.dentalChartDataHolderEight[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData8'];
                                this.state.dentalChartDataHolderNine[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ToothData9'];
                                this.state.procedure[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ProcedureName'];
                                this.state.procedureCostStored[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['ProcedureCostDollars'];
                                //this.state.procedureTimeStored[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['VisitTime']; TODO: CHANGE HOW TIME IS STORED--------------------------------------------------
                                this.state.patientNotes[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['Notes'];
                                this.state.toothSelected[num] = resTicketsVisit.data.result['ticketVisitTooth'][num]['Tooth'];

                                this.state.bookingDentalChartString[num] = (
                                    this.state.dentalChartDataHolderOne[num] + "-" +
                                    this.state.dentalChartDataHolderTwo[num] + "-" +
                                    this.state.dentalChartDataHolderThree[num] + "-" +
                                    this.state.dentalChartDataHolderFour[num] + "-" +
                                    this.state.dentalChartDataHolderFive[num] + "-" +
                                    this.state.dentalChartDataHolderSix[num] + "-" +
                                    this.state.dentalChartDataHolderSeven[num] + "-" +
                                    this.state.dentalChartDataHolderEight[num] + "-" +
                                    this.state.dentalChartDataHolderNine[num] + "-" +
                                    this.state.procedure[num] + "-" +
                                    this.state.procedureCostStored[num] + "-" +
                                    this.state.procedureTimeStored[num] + "-" +
                                    this.state.patientNotes[num] + "-" +
                                    this.state.toothSelected[num] + "-" +
                                    resTicketsVisit.data.result['ticketVisitTooth'].length);

                                console.log("SAVED TEXT... " + this.state.bookingDentalChartString[num]);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        });

                        //Sets all the variables to allow for editing the booking
                        this.state.NHInum[this.state.currentBookingSelected] = this.state.ticketPatientNHIStored[ticketSelected]['NHI'];
                        this.state.patientName[this.state.currentBookingSelected] = this.state.ticketPatientNHIStored[ticketSelected]['FirstName'];
                            //NOTE: Date is not required as it will be changed via the calendar
                        this.state.timeHour[this.state.currentBookingSelected] = 9;
                        this.state.timeMinute[this.state.currentBookingSelected] = 0;
                        this.state.timeAM_PM[this.state.currentBookingSelected] = "AM";
                        this.state.dentistName[this.state.currentBookingSelected] = "NEED TO ADD";
                        this.state.procedure[this.state.currentBookingSelected] = this.state.bookings[0]['Procedure'];
                        this.state.areasAffected[this.state.currentBookingSelected] = this.state.bookings[0]['AffectedAreas'];
                        this.state.patientNotes[this.state.currentBookingSelected] = this.state.bookings[0]['notes'];
                            
                        
                        console.log("NUMBER OF VISIT COUNT: " + this.state.numberOfVisitsCount[ticketSelected]);


                        let singlePatientComboBox: ComboBoxItem[] = [];
                        singlePatientComboBox.push({text: this.state.patientName[this.state.currentBookingSelected]});

                        this.setState({
                            addTicketOrEditClicked: true,
                            bookingCreateOrEditDisplay: 1,
                            patientsViewed: singlePatientComboBox,
                            bookingOrCancelButtonText: "Cancel",
                            completeClickedCreate: true
                        });
                    }
                }} />

                <Button id={"ticketAddAndDeleteButton"} text={"Delete"} on={{

                    clicked: async () => {
                        console.log("Deleting ticket number: " + ticketSelected + 1);
                    }
                }}/>

            </View>
        }

        

        
        

        //Will display the ticket list
        pageDiplay[2] = (
            <View style="flex-direction: 'row';">

                <View style={containerStyle2}>
                    <View style="flex-direction: 'row';">
                        <Button id={"bookingChangePageButton"} text={"<<"} on={ticketAndBookingListLeft}></Button>
                        <Button text="View bookings" style="flex: 4;" on={toggleBookingsAndTickets}></Button>
                        <Button id={"bookingChangePageButton"} text={">>"} on={ticketAndBookingListRight}></Button>
                    </View>

                    
                    {ticketList[this.state.ticketsBeingDisplayed + 0]}
                    {ticketList[this.state.ticketsBeingDisplayed + 1]}
                    {ticketList[this.state.ticketsBeingDisplayed + 2]}
                    {ticketList[this.state.ticketsBeingDisplayed + 3]}
                    {ticketList[this.state.ticketsBeingDisplayed + 4]}

                    {ticketList[20]}
                </View>
                
            </View>
        );

        //Will display the page used to create or edit bookings
        pageDiplay[1] = (
            
            <View style="flex-direction: 'row';">
            <View style={containerStyle}>

                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Search patient via contact number</Text>
                    <LineEdit style={"flex: 2;"} text={this.state.patientContactNumberSearch} on={textHandlerPatientSearch} />
                </View>

                <View style="margin: 0px; flex-direction: 'row';">
                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Patient</Text>
                    <ComboBox style={"flex: 2;"} items={this.state.patientsViewed} on={textHandlerPatientSelected} />

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
                    {/* <BookingPageDentalChart></BookingPageDentalChart> */}

                    <BookingPageDentalChart 
                    data={

                        this.state.bookingDentalChartString 
                    }
                    callback={bookingsDentalChartCallback} />
                </View>

                <View style="margin: 10px;"></View>

                <Button text={"Complete"} on={buttonHandlerCompleteEditOrCreation}></Button>

            </View>
            </View>
        );

        //Will display the booking list
        pageDiplay[0] = (
            <View style="flex-direction: 'row';">
                <View style={containerStyle2}>

                    <View style="flex-direction: 'row';">
                        <Button id={"bookingChangePageButton"} text={"<<"} on={ticketAndBookingListLeft}></Button>
                        <Button id={"toggleBookingAndTicket"} text="View bookings" style="flex: 4;" on={toggleBookingsAndTickets}></Button>
                        <Button id={"bookingChangePageButton"} text={">>"} on={ticketAndBookingListRight}></Button>
                    </View>

                    <Text style="border: 1px solid black; padding: 10px;">{"Date selected: " + dateFull}</Text>

                    {bookingList}

                    <Text style={"margin: 10px;"}>{this.state.confirmMessage}</Text>

                </View>
            </View>
        );

        //TODO: Impliment this feature properly
        var bookingCreateButton:any = [];

        //Checks the account is correct before allowing the creation of bookings
        if (this.props.accountHelper.accountAdmin) {
            bookingCreateButton.push(
                <View>
                    <Button id={"createBookingButton"} text={this.state.bookingOrCancelButtonText} on={buttonHandlerBookingOrCancel} visible={true}/>
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
