import { Button, View } from "@nodegui/react-nodegui";
import React from "react";
import Alert from "../alert";
import axios from 'axios';

export const createBooking = async (PatientID:Number, Date:string, Time:string, 
    DentistID:Number, Procedure:string, AreasAffected:string, PatientNotes:string) => {

        let bookingData = {
            patientID: PatientID,
            date: Date,
            time: Time,
            dentistID: DentistID,
            procedure: Procedure,
            affectedAreas: AreasAffected,
            notes: PatientNotes
        }

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
                    view = <Alert title={"Error"} message={res.data.error} style={"background-color: 'red'; width: 600px; height: 400px;"}></Alert>
                } else {
                    result = 0
                    view = <Alert title={"Success"} message={"Added booking to database!"} style={"background-color: 'green'; width: 300px; height: 100px;"}></Alert>
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