import axios from "axios";
import React from "react";
import Alert from "../alert";


export const editFromDB = async (bookingID:any, newPatientID:any, newDate:any, newTimeHour:any, newTimeMinute:any, newTimeAM_PM:any, NewDentistID:any,
    chartOne: any, chartTwo: any, chartThree: any, chartFour: any, chartFive: any, chartSix: any, chartSeven: any, chartEight: any, chartNine: any, 
    newProcedure: any, newProcedureTime: any, newProcedureCost: any, newPatientNotes: any, newTotalCharts: any, newToothSelected: any) => {

        console.log("HERE ARE THE STANDARDS");
        console.log("<<------------------>>");
        console.log("BOOKING ID:     " + bookingID);
        console.log("Patient ID:     " + newPatientID);
        console.log("New date:       " + newDate);
        console.log("New hour:       " + newTimeHour);
        console.log("New minute:     " + newTimeMinute);
        console.log("New AM/ PM:     " + newTimeAM_PM);
        console.log("New dentist ID: " + NewDentistID);
        console.log("Total charts:   " + newTotalCharts);
        console.log("");

        for (var num = 0; num < newTotalCharts + 1; num++)
        {
            console.log("HERE ARE THE REPEATS " + num);
            console.log("<<---------------->>");

            console.log(chartOne[num]);
            console.log(chartTwo[num]);
            console.log(chartThree[num]);
            console.log(chartFour[num]);
            console.log(chartFive[num]);
            console.log(chartSix[num]);
            console.log(chartSeven[num]);
            console.log(chartEight[num]);
            console.log(chartNine[num]);

            console.log(newProcedure[num]);
            console.log(newProcedureTime[num]);
            console.log(newProcedureCost[num]);
            console.log(newPatientNotes[num]);
            console.log(newToothSelected[num]);
        }


        newDate = newDate.split("/")[2] + "/" + newDate.split("/")[1] + "/" + String(Number(newDate.split("/")[0]) + 1);

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
                newDate,
                newPatientNotes,
                newProcedure,
                //newAreasAffected <---- This will be redundtant with the new dental chart system, use chartOne, chartTwo, cha....
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