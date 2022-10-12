import React from "react";
import Alert from "../alert";
import axios from 'axios';

export const createBooking = async (PatientID:Number, Date:string, Time:string,
    DentistID:Number, Procedure:string, AreasAffected:string, PatientNotes:string,
    chartOne: any, chartTwo: any, chartThree: any, chartFour: any, chartFive: any, chartSix: any, chartSeven: any, chartEight: any, chartNine: any, 
    callProcedure: any, callProcedureTime: any, callProcedureCost: any, callNotes: any, totalCharts: any, toothSelected: any) => {

        totalCharts++;

        let charts = [];

        for (var i = 0; i < totalCharts; i++) {
            charts.push({
                data1: chartOne[i],
                data2: chartTwo[i],
                data3: chartThree[i],
                data4: chartFour[i],
                data5: chartFive[i],
                data6: chartSix[i],
                data7: chartSeven[i],
                data8: chartEight[i],
                data9: chartNine[i],
                procedure: callProcedure[i],
                procedureLength: callProcedureTime[i],
                procedureCost: callProcedureCost[i],
                notes: callNotes[i],
                tooth: toothSelected[i]
            })
        }

        if (DentistID == null || DentistID <= 0) {
            DentistID = 1;
        }

        let bookingData = {
            patientID: PatientID,
            date: Date,
            time: Time,
            dentistID: DentistID,
            procedure: Procedure,
            affectedAreas: AreasAffected,
            notes: PatientNotes,
            dentalCharts: charts
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