import axios from "axios";
import React from "react";
import Alert from "../alert";


export const editFromDB = async (bookingID:any, newPatientID:any, NewDentistID:any, dateDay:any, dateMonth:any, dateYear:any, timeHour:any, timeMinute:any,
    timeAM_PM:any, newProcedure: any, newProcedureTime: any, newProcedureCost: any, newPatientNotes: any, newTotalCharts: any, newToothSelected: any) => {

    let date = dateYear + '-' + dateMonth + '-' + dateDay;
    let time = timeHour + ":" + timeMinute + timeAM_PM;

    let dollars = Number(String(newProcedureCost).split("$")[1].split(".")[0]);
    let cents = Number(String(newProcedureCost).split("$")[1].split(".")[1]);

    let bookingData = {
        bookingid: String(Number(bookingID) + 1),
        cols: [
            "Time",
            "Date",
            "Notes",
            "Tooth",
            "ProcedureName",
            "FeeDollars",
            "FeeCents",
            "ProcedureTime",
        ],
        vals: [
            time,
            date,
            newPatientNotes,
            newToothSelected,
            newProcedure,
            dollars,
            cents,
            newProcedureTime
        ]
    }

    let result: any = null;
    let view: any = null;
            
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