import axios from 'axios';
//This file will pull information from the database to use in the Calendar component

//TODO: Have this file integrated with the DB

export const pullFromDataBase = (dateSelected:any, userType:any) =>{

    return(axios.post('http://localhost:3000/getAllBookings')
        .then((res) => {
            if (res.data.error) {
                return res.data.error
            } else {
                var bookingDisplayed: any = [];
                axios.post('http://localhost:3000/getAllPatientData')
                .then((resPatient) => {
                    for (let i = 0; i < res.data.result.length; i++) {
                        let patient = null;
                        for (let k = 0; k < resPatient.data.result.length; k++) {
                            if (res.data.result[i]['Patient'] == resPatient.data.result[k]['ID']) {
                                patient = resPatient.data.result[k];
                                break;
                            }
                        }
                        bookingDisplayed[i] = (
                            {
                                index: i,
                                nhi: patient['NHI'],
                                patientName: patient["FirstName"] + " " + patient["LastName"],
                                date: res.data.result[i]['Date'],
                                time: res.data.result[i]['Time'],
                                location: res.data.result[i]['Location'],
                                Procedure: res.data.result[i]['ProcedureName'],
                                AffectedAreas: res.data.result[i]['AffectedAreas']
                            }
                        );
                    }
                    return bookingDisplayed;
                })
                .catch((err) => {
                    return err
                })
            }
        })
        .catch((err) => {
            return err
        })
    )
}

export const deleteFromDataBase = (ID:any) =>{

    //TODO: Deletes the data from the database based on the ID given
    console.log("BOOKING WITH ID " + ID + " WAS DELETED...");
    return 0;
}