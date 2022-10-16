import axios from "axios";
import React from "react";
import Alert from "../alert";


export const editFromDB = async (bookingID:any, newPatientID:any, NewDentistID:any, dateDay:any, dateMonth:any, dateYear:any, timeHour:any, timeMinute:any,
    timeAM_PM:any, newProcedure: any, newProcedureTime: any, newProcedureCost: any, newPatientNotes: any, newTotalCharts: any, newToothSelected: any) => {

        for (var num = 0; num < newTotalCharts; num++)
        {

        }

        console.log("HERE ARE THE STANDARDS");
        console.log("<<------------------>>");
        
        console.log("Booking ID:     " + bookingID);
        console.log("Patient ID:     " + newPatientID);
        console.log("Dentist ID:     " + NewDentistID);
        console.log("Date day:       " + dateDay);
        console.log("Date month:     " + dateMonth);
        console.log("Date year:      " + dateYear);
        console.log("Time hour:      " + timeHour);
        console.log("Time minute:    " + timeMinute);
        console.log("Time AM or PM:  " + timeAM_PM);
        console.log("Procedure:      " + newProcedure);
        console.log("Procedure time: " + newProcedureTime);
        console.log("Procedure cost: " + newProcedureCost);
        console.log("Notes:          " + newPatientNotes);
        console.log("Total bookings: " + newTotalCharts);
        console.log("Tooth selected: " + newToothSelected);

        console.log("");



        let result: any = null;
        let view: any = null;

        result = 0;
        view = (<Alert title={"Success"} message={"Updated booking in database!"} style={"background-color: 'green';"}></Alert>);
                
        return ({res: result, view: view});

        //Have this be changed
        //newDate = newDate.split("/")[2] + "/" + newDate.split("/")[1] + "/" + String(Number(newDate.split("/")[0]) + 1);

        let bookingData = {
            bookingid: String(Number(bookingID) + 1),
            cols: [
                "Time",
                "Date",
                "Notes",
                "ProcedureName",
                "AffectedAreas",
            ],
            vals: [
                //newTime.slice(0, 7), <---- Passed time variables for hour, minute, and AM/ PM so this is not needed
                //newDate,
                newPatientNotes,
                newProcedure,
                //newAreasAffected <---- This will be redundtant with the new dental chart system, use chartOne, chartTwo, cha....
            ]
        }

        // let result: any = null;
        // let view: any = null;
        return(await 
            axios.post('http://localhost:3000/bookings/updateBooking', null, {
                headers: {
                    'bookingid': bookingData['bookingid'],
                    'cols': JSON.stringify(bookingData['cols']),
                    'vals': JSON.stringify(bookingData['vals'])
                }
            })
            .then((res) => {
                console.log(res.data)
                if (res.data.error) {
                    console.log(res.data.error)
                    result = 1
                    view = <Alert title={"Error"} message={res.data.error} style={"background-color: 'red';"}></Alert>
                } else {
                    result = 0
                    view = <Alert title={"Success"} message={"Updated booking in database!"} style={"background-color: 'green';"}></Alert>
                }
                return (
                    {res: result, view: view}
                );
            })
            .catch((err) => {
                console.log(err)
                result = 1
                view = <Alert title={"Error"} message={err} style={"background-color: 'red';"}></Alert>
                return (
                    {res: result, view: view}
                );
            })
        )
    }