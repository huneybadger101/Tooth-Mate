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
import Loading from "./loading";
import BookingDateSelector from "./Calendarhelpers/bookingDateSelector";
import PlainTextEditWrapper from "./PlainTextEditWrapper";

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
            dentistsViewed: null,
            dentistsViewedPermanent: null,
            dentists: null,
            patientsData: null,
            dentistsData: null,
            bookings: null,

            patientSearchValue: "",
            dentsitSearchValue: "",

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

            bookingMessageSelected: 0,
            bookingMessageSelectedCopy: 0,

            bookingSpare: "",

            bookingDateSelectorString: [],
            bookingDateSelectorState: 0, //0 <- placeholder | 1 <- create booking | 2 <- edit booking | 3 <- ticket to booking
            bookingDateSelectorDateCount: 0,

            totalIndex: 0,
            currentIndex: 0,
            dateDayArray: [],
            dateMonthArray: [],
            dateYearArray: [],

            timeHourArray: [],
            timeMinuteArray: [],
            timeAM_PMArray: [],





            patientInfo: null,
            dentistInfo: null
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
            .then(async (resAccount) => {
                let patients: ComboBoxItem[] = [];

                var patientInfo: any = [];

                for (let i = 0; i < res.data.result.length; i++) {
                    patients.push({text: res.data.result[i]['FirstName'] + " " + res.data.result[i]['LastName']})
                    
                    patientInfo[i] = ({
                        ID: res.data.result[i]['FirstName'],
                        NHI: res.data.result[i]['FirstName'],
                        FirstName: res.data.result[i]['FirstName'],
                        LastName: res.data.result[i]['FirstName'],
                        MiddleName: res.data.result[i]['FirstName'],
                        DOB: res.data.result[i]['FirstName'],
                        ContactNumber: res.data.result[i]['FirstName'],
                        Email: res.data.result[i]['FirstName'],
                        Notes: res.data.result[i]['FirstName'],
                        ExistingConditions: res.data.result[i]['FirstName']
                    });
                }

                this.setState({
                    patientsViewed: patients,
                    patientsViewedPermanent: patients,
                    patientInfo: patientInfo
                });

                let dentists: ComboBoxItem[] = [];

                var dentistInfo: any = [];

                for (let i = 0; i < resAccount.data.result.length; i++) {
                    dentists.push({text: resAccount.data.result[i]['AccountName']})
                    
                    console.log(resAccount.data.result[i]);

                    dentistInfo[i] = ({
                        ID: resAccount.data.result[i]['ID'],
                        AccountName: resAccount.data.result[i]['AccountName'],
                        AccountAccessLevel: resAccount.data.result[i]['AccountAccessLevel'],
                        DentistNumber: resAccount.data.result[i]['DentistNumber'],
                        DOB: resAccount.data.result[i]['DOB'],
                        Email: resAccount.data.result[i]['Email'],
                        PhoneNumber: resAccount.data.result[i]['PhoneNumber'],
                        DentistName: resAccount.data.result[i]['DentistName']
                    });
                }

                this.setState({
                    dentistsViewed: dentists,
                    dentistsViewedPermanent: dentists,
                    dentistInfo: dentistInfo
                });

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
                            id: resBooking.data.result[i]['ID'],
                            date: resBooking.data.result[i]['Date'],
                            time: resBooking.data.result[i]['Time'],
                            patient: resBooking.data.result[i]['Patient'],
                            dentist: resBooking.data.result[i]['Dentist'],
                            feeDollars: resBooking.data.result[i]['FeeDollars'],
                            feeCents: resBooking.data.result[i]['FeeCents'],
                            notes: patient['Notes'],
                            Procedure: resBooking.data.result[i]['ProcedureName'],
                            ProcedureTime: resBooking.data.result[i]['ProcedureTime'],
                            patientAttended: resBooking.data.result[i]['PatientAttended'],
                            tooth: resBooking.data.result[i]['Tooth'],
                        });
                    }
                    
                    this.setState({
                        patients: patients,
                        patientsData: res.data.result,
                        dentistsData: resAccount.data.result,
                        dentists: dentists,
                        bookings: bookingDisplayed,
                        bookingsRaw: resBooking.data.result
                    })
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

        this.state.bookingDentalChartString[1] = this.state.currentIndex + "." + this.state.totalIndex;

        if (this.state.patients == null) {
            console.log(this.state)
            return (<Loading/>)
        }

        //Creates a callback for the booking dental chart .tsx file
        const bookingsDentalChartCallback = (
            //Variables that are being sent back with the callback function:
            
            callProcedure: [],
            callProcedureTime: [],
            callProcedureCost: [],
            callNotes: [],
            tooth: []
        ) => {

            //Wipes the data before recreating it
            //This is so when the user removes a dental chart it does not remain in the following
            for (var i = 0; i < this.state.totalIndex + 1; i++)
            {
                this.state.procedure[i] = [];
                this.state.procedureCostStored[i] = [];
                this.state.procedureTimeStored[i] = [];
                this.state.patientNotes[i] = [];
                this.state.toothSelected[i] = [];
            }

            //Saves all of the booking dental chart settings to variables to use when the create booking/ edit booking buttons are clicked
            for (var i = 0; i < this.state.totalIndex + 1; i++)
            {
                this.state.procedure[i] = callProcedure[i];
                this.state.procedureCostStored[i] = callProcedureCost[i];
                this.state.procedureTimeStored[i] = callProcedureTime[i];
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

        //Sets the variables for the day chosen (will be sent to the date selector)
        this.state.bookingDateSelectorString[0] = day;
        this.state.bookingDateSelectorString[1] = month;
        this.state.bookingDateSelectorString[2] = year;
        this.state.bookingDateSelectorString[3] = weekday;
        this.state.bookingDateSelectorString[4] = this.state.bookingDateSelectorState;

        this.state.dateDayArray[this.state.currentIndex] = day;
        this.state.dateMonthArray[this.state.currentIndex] = month;
        this.state.dateYearArray[this.state.currentIndex] = year;

        this.state.timeHourArray[this.state.currentIndex] = this.state.timeHour[this.state.currentBookingSelected];
        this.state.timeMinuteArray[this.state.currentIndex] = this.state.timeMinute[this.state.currentBookingSelected];
        this.state.timeAM_PMArray[this.state.currentIndex] = this.state.timeAM_PM[this.state.currentBookingSelected];

        const indexIncrease = {
            clicked: () =>{


                this.setState({
                    totalIndex: this.state.totalIndex + 1
                })
            }
        }

        const indexDecrease = {
            clicked: () =>{

                if (this.state.totalIndex > 0)
                {
                    this.setState({
                        totalIndex: this.state.totalIndex - 1
                    })
                }
            }
        }

        const indexSelectedIncrease = {
            clicked: () =>{

                if (this.state.currentIndex < this.state.totalIndex)
                {
                    this.setState({
                        currentIndex: this.state.currentIndex + 1
                    })
                }
            }
        }

        const indexSelectedDecrease = {
            clicked: () =>{

                if (this.state.currentIndex > 0)
                {
                    this.setState({
                        currentIndex: this.state.currentIndex - 1
                    })
                }
            }
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
                    patientSearchValue: textValue
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

        //Handles when a patient is searched for
        const textHandlerDentistSearch = {
            textChanged: (textValue:any) =>{

                this.setState({
                    dentsitSearchValue: textValue
                })

                let dentistViewedTemp: ComboBoxItem[] = [];

                //Will loop through the patient table and check if the text provided matches several patient records
                //If it does, it will be saved into a combobox item to display as an avalaible patient to select
                for (let i = 0; i < this.state.dentistsData.length; i++)
                {
                    if (this.state.dentistsData[i]['AccountName'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        dentistViewedTemp.push({text: this.state.dentistsData[i]["AccountName"]})
                    }
                    else if (this.state.dentistsData[i]['Email'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        dentistViewedTemp.push({text: this.state.dentistsData[i]["AccountName"]})
                    }
                    else if (this.state.dentistsData[i]['PhoneNumber'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        dentistViewedTemp.push({text: this.state.dentistsData[i]["AccountName"]})
                    }
                    else if (this.state.dentistsData[i]['DentistName'].toLowerCase().includes(textValue.toLowerCase()) == true)
                    {
                        dentistViewedTemp.push({text: this.state.dentistsData[i]["AccountName"]})
                    }
                }

                this.setState({
                    dentistsViewed: dentistViewedTemp
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

                //Cancel booking clicked, this will reset many of the variables
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
                        bookingMessageSelected: this.state.bookingMessageSelectedCopy
                    });

                    this.setState({
                        bookingCreateOrEditDisplay: 0,
                        bookingOrCancelButtonText: "Create Booking",
                        editButtonClicked: false,
                        completeClickedCreate: false
                    });
                }
                //Create booking clicked
                else
                {
                    this.setState({bookingMessageSelected: 2});

                    //Sets all the variables to allow for editing the booking
                    this.state.NHInum[this.state.currentBookingSelected] = this.state.patientInfo[0]['nhi'];
                    this.state.patientName[this.state.currentBookingSelected] = this.state.patientInfo[0]['FirstName'];
                        
                    this.state.timeHour[this.state.currentBookingSelected] = "10";
                    this.state.timeMinute[this.state.currentBookingSelected] = "00";
                    this.state.timeAM_PM[this.state.currentBookingSelected] = "AM";

                    this.state.dentistName[this.state.currentBookingSelected] = this.state.dentistInfo[0]['AccountName'];
                    this.state.procedure[this.state.currentBookingSelected] = "Initial Examination";
                    this.state.patientNotes[this.state.currentBookingSelected] = "";

                    //This will be sent to the booking display chart to tell it the new booking button was clicked
                        //This is to ensure that fields are not prefilled with data that should not be there...
                    this.state.bookingDentalChartString[0] = true;

                    //Changes settings so the page is the create booking page and resets the patient name combo box
                    this.setState({
                        bookingCreateOrEditDisplay: 1,
                        bookingOrCancelButtonText: "Cancel",
                        completeClickedCreate: true,
                        patientsViewed: this.state.patientsViewedPermanent,
                        bookingDateSelectorDateCount: 1,
                        dentistsViewed: this.state.dentistsViewedPermanent,
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

        //Will go through and assign the variables from 'bookingVariables' to be displayed when editing a booking
        if (day != 0 && this.state.bookings.length > 0)
        {
            for (var num = 0; num < this.state.bookings.length; num++)
            {

                let bookingYear = this.state.bookings[num]['date'].split("T")[0].split("-")[0];
                let bookingMonth = Number(this.state.bookings[num]['date'].split("T")[0].split("-")[1]).toString();
                let bookingDay = (Number(this.state.bookings[num]['date'].split("T")[0].split("-")[2]) + 1).toString();

                let bookingDateString = bookingYear + "/" + bookingMonth + "/" + bookingDay;
                if (bookingDateRev == bookingDateString) {
                    //Sets a reference point for the button that is clicked
                    let bookingSelected = num.toString();

                    if (this.state.editButtonClicked == false)
                    {
                        //Sets all the variables to allow for editing the booking
                        this.state.bookingID[num] = this.state.bookings[num]['id'];
                        this.state.NHInum[num] = this.state.patientInfo[this.state.bookings[num]['patient']]['nhi'];//Works
                        this.state.patientName[num] = this.state.patientInfo[this.state.bookings[num]['patient']]['FirstName'];//WORKS
                            
                        this.state.timeHour[num] = this.state.bookings[num]['time'].split(":")[0];
                        this.state.timeMinute[num] = this.state.bookings[num]['time'].split(":")[1];
                        this.state.timeAM_PM[num] = (Number(this.state.timeHour[num]) > 12 ? "PM" : "AM");

                        this.state.dentistName[num] = this.state.dentistInfo[this.state.bookings[num]['dentist']]['AccountName'];//WORKS
                        this.state.procedure[num] = this.state.bookings[num]['Procedure'];//WORKS
                        this.state.patientNotes[num] = this.state.bookings[num]['notes'];//WORKS

                        this.state.bookingDentalChartString[0] = false;
                    }

                    if (this.props.accountHelper.accountAdmin)
                    {
                        bookingListEditButton[num] = 
                            <Button id={"ticketAddAndDeleteButton"} style={"flex: 1;"} text={"Edit"} on={{clicked: async () => {
                            
                                console.log("<----------------------------->");
                                console.log(this.state.bookingID[bookingSelected]);

                                this.state.bookingDentalChartString[0] = false;
                                this.state.bookingDentalChartString[1]; //This is already sorted at the top of the file
                                this.state.bookingDentalChartString[2] = this.state.procedure[bookingSelected];
                                this.state.bookingDentalChartString[3] = this.state.bookings[bookingSelected]['feeDollars'] + "." + this.state.bookings[bookingSelected]['feeCents'];
                                this.state.bookingDentalChartString[4] = this.state.bookings[bookingSelected]['ProcedureTime'];
                                this.state.bookingDentalChartString[5] = this.state.patientNotes[bookingSelected];
                                this.state.bookingDentalChartString[6] = this.state.bookings[bookingSelected]['tooth'];

                                    let singlePatientComboBox: ComboBoxItem[] = [];
                                    singlePatientComboBox.push({text: this.state.patientName[bookingSelected].toString()});

                                    let singleDentistComboBox: ComboBoxItem[] = [];
                                    singleDentistComboBox.push({text: this.state.dentistName[bookingSelected].toString()});
                                    
                                    this.setState({
                                        patientsViewed: singlePatientComboBox,
                                        dentistsViewed: singleDentistComboBox,
                                        bookingDentalChartString: this.state.bookingDentalChartString
                                    });

                                    this.setState({
                                        currentBookingSelected: bookingSelected,
                                        bookingCreateOrEditDisplay: 1,
                                        editButtonClicked: true,
                                        completeClickedEdit: true,
                                        bookingOrCancelButtonText: "Cancel"
                                    })
                                }}}
                                
                            />

                            bookingListDeleteButton[num] =
                            <Button id={"ticketAddAndDeleteButton"} style={"flex: 1;"} text={"Delete"} on={{clicked: ()=>{deleteBookingFromDatabase(bookingSelected)}}}/>
                        }
                        //Creates the bookings to view
                        //will also create an edit button for each booking, an info button to get more details, and a delete button to remove the selected booking
                        //NOTE: Will only add the edit and delete buttons if the user type has said abilities
                        bookingList[num] =
                            <View style="flex-direction: 'column';">

                                <View style="flex-direction: 'row';">
                                    <Text id={"ticketText"}>{"Booking ID: " + (this.state.bookingID[num]) + ", Booking date: " + dateFull}</Text>

                                    <Button id={"ticketAddAndDeleteButton"} style={"flex: 1;"} text={"Info"} on={{clicked: ()=>{

                                        this.state.bookingShowInfo[this.state.bookingSelected] = !this.state.bookingShowInfo[this.state.bookingSelected];

                                        this.setState({
                                            currentBookingSelected: bookingSelected
                                        });
                                    }}} />

                                    {/*TODO: Have the info button bring up a window (or change the screen) to view detailed version of selected booking*/}
                                    {bookingListEditButton[num]}
                                    {bookingListDeleteButton[num]}
                                </View>

                            {(this.state.bookingShowInfo[this.state.bookingSelected] == true ? <View style="">
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
                } else {
                    this.state.bookingID[num] = null;
                    this.state.NHInum[num] =  null;
                    this.state.patientName[num] = null;
                    this.state.timeHour[num] = null;
                    this.state.timeMinute[num] = null;
                    this.state.timeAM_PM[num] = null;
                    this.state.dentistName[num] = null;
                    this.state.areasAffected[num] = null;
                    this.state.patientNotes[num] = null;
                }
            }
        }

        //Checks if the date has been changed, if so, it will change the on screen message based on the date selected
        if (bookingDate != this.state.bookingSpare)
        {

            // let hasBookings = false;

            // bookingList = bookingList.filter(function( element:any ) {
            //     return element !== undefined;
            // });

            // if (bookingList.length > 0) {
            //     hasBookings = true
            // }

            //Will set the message selected index to display no booking selected
            if (bookingDate == "0/1/0")
            {
                //console.log("NO BOOKING CHOSEN...");

                this.setState({
                    bookingSpare: bookingDate,
                    bookingMessageSelected: 0,
                    bookingMessageSelectedCopy: 0
                });
            }
            //Will set the message selected index to display a booking selected with no bookings
            else if ((bookingDate != "0/1/0" && bookingList[0] == undefined))
            {
                bookingList = [];

                this.setState({
                    bookingSpare: bookingDate,
                    bookingMessageSelected: 1,
                    bookingMessageSelectedCopy: 1
                });
            }
            //Will set the message selected index to display no message (will be replaced by actual bookings or ticket list)
            else if ((bookingDate != "0/1/0" && bookingList[0] != undefined))
            {
                this.setState({
                    bookingSpare: bookingDate,
                    bookingMessageSelected: 2,
                    bookingMessageSelectedCopy: 2
                });
            }
        }

        //Sends data to be "idiot proofed" and confirmed
        const buttonHandlerCompleteEditOrCreation = {
            clicked: async () => {

                //Activates when the complete button was clicked while editing an existing booking
                if (this.state.completeClickedEdit == true)
                {
                    this.setState({
                        bookingCreateOrEditDisplay: await editFromDB(
                            //Sending the updated variables to compare with at the end of the edit
                            this.state.bookingID[this.state.currentBookingSelected],
                            this.state.patientName[this.state.currentBookingSelected],
                            0, //TODO: Change so actual dentist data is being sent
                            this.state.dateDayArray,
                            this.state.dateMonthArray,
                            this.state.dateYearArray,
                            this.state.timeHourArray,
                            this.state.timeMinuteArray,
                            this.state.timeAM_PMArray,
                            this.state.procedure,
                            this.state.procedureTimeStored,
                            this.state.procedureCostStored,
                            this.state.patientNotes,
                            this.state.totalIndex,
                            this.state.toothSelected
                        )
                    });

                    this.props.callback(this.state.bookingCreateOrEditDisplay['view'])

                    //Checks that 'bookingCreateOrEditDisplay' is set back to zero before allowing booking list loading
                    if (this.state.bookingCreateOrEditDisplay['res'] == 0)
                    {
                        this.setState({
                            //Set back to 'false' to continue update of the date
                            editButtonClicked: false,
                            bookingCreateOrEditDisplay: 0
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
                    this.setState({
                        bookingDentalChartString: this.state.bookingDentalChartString
                    });

                    //Calls a function to determine if the booking was valid or not...
                    this.setState({
                        bookingCreateOrEditDisplay: await createBooking(
                        
                            //Sending the updated variables to compare with at the end of the edit
                            this.state.bookingID[this.state.currentBookingSelected],
                            this.state.patientName[this.state.currentBookingSelected],
                            0, //TODO: Change so actual dentist data is being sent
                            this.state.dateDayArray,
                            this.state.dateMonthArray,
                            this.state.dateYearArray,
                            this.state.timeHourArray,
                            this.state.timeMinuteArray,
                            this.state.timeAM_PMArray,
                            this.state.procedure,
                            this.state.procedureTimeStored,
                            this.state.procedureCostStored,
                            this.state.patientNotes,
                            this.state.totalIndex,
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
        var pageDiplayMessage: any = [];

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
                        bookingMessageSelected: 2,
                    });

                    this.setState({
                        bookingCreateOrEditDisplay: 2,
                    });
                }
                else if (this.state.bookingCreateOrEditDisplay == 2)
                {
                    this.setState({
                        bookingMessageSelected: this.state.bookingMessageSelectedCopy,
                    });

                    this.setState({
                        bookingCreateOrEditDisplay: 0,
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

        //Creates the tickets to be displayed
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
                        for (var num = 0; num < this.state.bookingDentalChartString.length + 2; num++)
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
                            for (var num = 0 + 2; num < resTicketsVisit.data.result['ticketVisitTooth'].length + 2; num++)
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

        pageDiplayMessage[1] = (
            <View id={"bookingPlaceholderMessageContainer"}>
                <View style={"position: 'absolute';"}>
                    <Text id={"messageTextStandard"}>{"Selected Date"}</Text>
                    <Text id={"messageTextColor"}>{dateFull}</Text>
                    <Text id={"messageTextStandard"}>{"Contains no Bookings..."}</Text>
                </View>
            </View>
        );

        pageDiplayMessage[0] = (
            <View id={"bookingPlaceholderMessageContainer"}>
                <View style={"position: 'absolute';"}>
                    <Text id={"messageTextStandard"}>{"Select a date"}</Text>
                    <Text id={"messageTextStandard"}>{"to get started"}</Text>
                </View>
            </View>
        );
        

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

                <View>
                <View style="flex: 1;">

                <View style={"flex-direction: 'column';"}>
                    <View style="flex-direction: 'row';">
                        <Button id={"bookingPageButton_roundedTopLeft"} style={"flex: 1;"} text="-" on={indexDecrease}></Button>
                        <Button id={"bookingPageButton_roundedTopRight"} style={"flex: 1;"} text="+" on={indexIncrease}></Button>
                    </View>

                    <View style="flex-direction: 'row';">
                        <Button id={"bookingPageButton_roundedBottomLeft"} style={"flex: 1;"} text="<" on={indexSelectedDecrease}></Button>
                            <View style={"text-align: 'center';"}>
                                <Text id={"bookingPageText"}>{(this.state.currentIndex + 1) + "/" + (this.state.totalIndex + 1)}</Text>
                            </View>
                        <Button id={"bookingPageButton_roundedBottomRight"} style={"flex: 1;"} text=">" on={indexSelectedIncrease}></Button>
                    </View>
                </View>





                <View style="margin: 10px;"></View>

                <View style="flex-direction: 'row';">
                    <Text id={"bookingPageTextRoundedLeft"} style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>{"Date: " + bookingDate}</Text>
                    <SpinBox id={"bookingTimeSelectors"} style={"flex: 2;"} value={this.state.timeHour[this.state.currentBookingSelected]} on={textHandlerTimeHour} range={timeHourRange()}/>
                    <SpinBox id={"bookingTimeSelectors"} style={"flex: 2;"} value={this.state.timeMinute[this.state.currentBookingSelected]} on={textHandlerTimeMinute} range={timeMinuteRange()}/>
                    <ComboBox id={"bookingAM_PMSelector"} style={"flex: 2;"} items={timeAMorPM()} currentText={this.state.timeAM_PM[this.state.currentBookingSelected]} on={textHandlerTimeA_P} />
                </View>

                <View style="margin: 10px;"></View>









                <View style={"flex-direction: 'row';"}>

                    <View style={"flex-direction: 'column'; flex: 1; margin: 1px"}>
                        <View style="margin: 0px; flex-direction: 'row';">
                            <Text id={"bookingPageTextRoundedLeftTop"}>Search patient</Text>
                            <LineEdit id={"bookingPatientAndDentistSearch"} text={this.state.patientSearchValue} on={textHandlerPatientSearch} />
                        </View>

                        <View style="margin: 0px; flex-direction: 'row';">
                            <Text id={"bookingPageTextRoundedLeftBottom"} >Patient</Text>
                            <ComboBox id={"bookingPatientAndDentistDropdown"} items={this.state.patientsViewed} on={textHandlerPatientSelected} />
                        </View>
                    </View>

                    <View style={"flex-direction: 'column'; flex: 1; margin: 1px"}>
                        <View style="margin: 0px; flex-direction: 'row';">
                            <Text id={"bookingPageTextRoundedLeftTop"} >Search dentist</Text>
                            <LineEdit id={"bookingPatientAndDentistSearch"} text={this.state.dentsitSearchValue} on={textHandlerDentistSearch} />
                        </View>

                        <View style="margin: 0px; flex-direction: 'row';">
                            <Text id={"bookingPageTextRoundedLeftBottom"}>Dentist</Text>
                            <ComboBox id={"bookingPatientAndDentistDropdown"} items={this.state.dentistsViewed} on={textHandlerDentistSelected} />
                        </View>
                    </View>

                </View>  
                </View>               
                </View>

                <View style="margin: 10px;"></View>

                <View style="margin: 0px; flex-direction: 'row';">

                    <BookingPageDentalChart data={this.state.bookingDentalChartString} callback={bookingsDentalChartCallback} />

                </View>

                <View style="margin: 10px;"></View>

                <Button text={"Complete"} on={buttonHandlerCompleteEditOrCreation}></Button>

            </View>
            </View>
        );

        // bookingList = bookingList.filter(function( element:any ) {
        //     return element !== undefined;
        // });

        //Will display the booking list
        pageDiplay[0] = (
            <View style="flex-direction: 'row';">
                <View style={containerStyle2}>

                    <View style="flex-direction: 'row';">
                        <Button id={"bookingChangePageButton"} text={"<<"} on={ticketAndBookingListLeft}></Button>
                        <Button id={"toggleBookingAndTicket"} text="View bookings" style="flex: 4;" on={toggleBookingsAndTickets}></Button>
                        <Button id={"bookingChangePageButton"} text={">>"} on={ticketAndBookingListRight}></Button>
                    </View>

                    {/* Displays the message that tells the user if a booking is selected or if no bookings exist for the date selected */}
                    {pageDiplayMessage[this.state.bookingMessageSelected]}
                    
                    {/* Displays the booking class */}
                    {bookingList[this.state.bookingsBeingDisplayed + 0]}

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
