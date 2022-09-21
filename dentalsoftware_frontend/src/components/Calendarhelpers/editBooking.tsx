import axios from "axios";
import React from "react";
import Alert from "../alert";

export const editFromDB = async (newBookingID:any, newDate:any, newTime:any, 
    newProcedure:any, newAreasAffected:any, newPatientNotes:any) =>{

        newDate = newDate.split("/")[2] + "/" + newDate.split("/")[1] + "/" + String(Number(newDate.split("/")[0]) + 1);

        let bookingData = {
            bookingid: String(Number(newBookingID) + 1),
            cols: [
                "Time",
                "Date",
                "Notes",
                "ProcedureName",
                "AffectedAreas",
            ],
            vals: [
                newTime.slice(0, 7),
                newDate,
                newPatientNotes,
                newProcedure,
                newAreasAffected
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
                    view = <Alert title={"Error"} message={res.data.error} style={"background-color: 'red'; width: 600px; height: 400px;"}></Alert>
                } else {
                    result = 0
                    view = <Alert title={"Success"} message={"Updated booking in database!"} style={"background-color: 'green'; width: 300px; height: 100px;"}></Alert>
                }
                return (
                    {res: result, view: view}
                );
            })
            .catch((err) => {
                console.log(err)
                result = 1
                view = <Alert title={"Error"} message={err} style={"background-color: 'red'; width: 600px; height: 400px;"}></Alert>
                return (
                    {res: result, view: view}
                );
            })
        )
    }