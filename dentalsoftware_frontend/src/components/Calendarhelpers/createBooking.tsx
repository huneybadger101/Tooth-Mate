import { Button, View } from "@nodegui/react-nodegui";
import React from "react";
import Alert from "../alert";
import axios from 'axios';

export const createBooking = async (PatientID:Number, Date:string, Time:string,
    DentistID:Number, Procedure:string, AreasAffected:string, PatientNotes:string,
    chartOne: any, chartTwo: any, chartThree: any, chartFour: any, chartFive: any, chartSix: any, chartSeven: any, chartEight: any, chartNine: any, 
    callProcedure: any, callProcedurePrice: any, callProcedureCost: any, callNotes: any, totalCharts: any, toothSelected: any) => {

        for (var i = 0; i <= totalCharts; i++)
        {
            console.log("-----------------TOTAL CHARTS: " + totalCharts + " --------------");
            console.log("CURRENT VIEWED: " + i + " OUT OF " + totalCharts);
            console.log("Length: " + totalCharts);
            console.log(chartOne[i]);
            console.log(chartTwo[i]);
            console.log(chartThree[i]);
            console.log(chartFour[i]);
            console.log(chartFive[i]);
            console.log(chartSix[i]);
            console.log(chartSeven[i]);
            console.log(chartEight[i]);
            console.log(chartNine[i]);
            console.log(callProcedure[i]);
            console.log(callProcedurePrice[i]);
            console.log(callProcedureCost[i]);
            console.log(callNotes[i]);
            console.log(toothSelected[i]);
            console.log("------------------------------------------");
        }


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
                view = <Alert title={"Error"} message={err} style={"background-color: 'red'; width: 600px; height: 400px; position: 'absolute';"}></Alert>
                return (
                    {res: result, view: view}
                );
            })
        )
    }