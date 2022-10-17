import React from "react";
import Alert from "../alert";
import axios from 'axios';

export const createBooking = async (bookingID:any, newPatientID:any, NewDentistID:any, dateDay:any, dateMonth:any, dateYear:any, timeHour:any, timeMinute:any,
    timeAM_PM:any, newProcedure: any, newProcedureTime: any, newProcedureCost: any, newPatientNotes: any, newTotalCharts: any, newToothSelected: any) => {

        let bookingArray = [];

        for (let i = 0; i < newTotalCharts + 1; i++) {
            let date = dateYear[i] + '\\' + dateMonth[i] + '\\' + dateDay[i];
            bookingArray.push({
                patientID: newPatientID,
                date: new Date(date),
                time: timeHour[i] + ":" + timeMinute[i] + timeAM_PM[i],
                dentistID: NewDentistID,
                procedure: newProcedure[i],
                procedureTime: newProcedureTime[i],
                procedureCost: newProcedureCost[i],
                notes: newPatientNotes[i],
                tooth: newToothSelected[i]
            })
        }

        let bookingData = {data: bookingArray};

        let result: any = null;
        let view: any = null;
        
        return(await 
            axios.post('http://localhost:3000/bookings/createNewBooking', null, {
                headers: {
                    'data': JSON.stringify(bookingData)
                }
            })
            .then((res) => {
                if (res.data.error) {
                    result = 1
                    view = <Alert title={"Error"} message={res.data.error} style={"background-color: 'red';"}></Alert>
                } else {
                    result = 0
                    view = <Alert title={"Success"} message={"Added booking to database!"} style={"background-color: 'green'; "}></Alert>
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