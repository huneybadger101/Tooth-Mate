import React from "react";
import Alert from "../alert";
import axios from 'axios';

export const createBooking = async (bookingID:any, newPatientID:any, NewDentistID:any, dateDay:any, dateMonth:any, dateYear:any, timeHour:any, timeMinute:any,
    timeAM_PM:any, newProcedure: any, newProcedureTime: any, newProcedureCost: any, newPatientNotes: any, newTotalCharts: any, newToothSelected: any) => {

        
        console.log("HERE ARE THE STANDARDS");
        console.log("<<------------------>>");
        
        console.log("Booking ID:     " + bookingID);//ignore
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
        console.log("Total bookings: " + newTotalCharts);//total bookings
        console.log("Tooth selected: " + newToothSelected);

        console.log("");









        let bookingData = 0;


        let result: any = null;
        let view: any = null;
        result = 0;
        view = (<Alert title={"Success"} message={"Added booking to database!"} style={"background-color: 'green'; "}></Alert>);
        
        return ({res: result, view: view});
        // for (var i = 0; i < totalCharts; i++) {
        //     charts.push({
        //         data1: chartOne[i],
        //         data2: chartTwo[i],
        //         data3: chartThree[i],
        //         data4: chartFour[i],
        //         data5: chartFive[i],
        //         data6: chartSix[i],
        //         data7: chartSeven[i],
        //         data8: chartEight[i],
        //         data9: chartNine[i],
        //         procedure: callProcedure[i],
        //         procedureLength: callProcedureTime[i],
        //         procedureCost: callProcedureCost[i],
        //         notes: callNotes[i],
        //         tooth: toothSelected[i]
        //     })
        // }

        // if (DentistID == null || DentistID <= 0) {
        //     DentistID = 1;
        // }
        
        // let bookingData = {
        //     patientID: PatientID,
        //     date: Date,
        //     time: Time,
        //     dentistID: DentistID,
        //     procedure: Procedure,
        //     affectedAreas: AreasAffected,
        //     notes: PatientNotes,
        //     dentalCharts: charts
        // }

        // let result: any = null;
        // let view: any = null;
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