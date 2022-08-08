export const editFromDB = (newBookingID:any, newNHInum:any, newPatientName:any, newDate:any, newTime:any, 
    newDentistName:any, newProcedure:any, newAreasAffected:any, newPatientNotes:any,
    oldBookingID:any, oldNHInum:any, oldPatientName:any, oldDate:any, oldTime:any, 
    oldDentistName:any, oldProcedure:any, oldAreasAffected:any, oldPatientNotes:any) =>{
    //TODO: Have the database edited based on what was done in the bookings component

        

    //NOTE:The old booking info will still use the newe booking ID otherwise it will be updated to use another one
    console.log("--OLD BOOKING--");
    console.log("Booking number:  " + newBookingID);
    console.log("NHI Number:      " + oldNHInum);
    console.log("Patient name:    " + oldPatientName);
    console.log("Date:            " + oldDate);
    console.log("Time:            " + oldTime);
    console.log("Dentist name:    " + oldDentistName);
    console.log("Procedure:       " + oldProcedure);
    console.log("Ares affected:   " + oldAreasAffected);
    console.log("Patient notes:   " + oldPatientNotes);



    //TODO:
    //Make sure the variables are all valid
    //Make sure a change did occur
    //Have a confirmation message pop up saying so displaying what changes were made
    //Have the main screen return to the booking page

    console.log("--NEW BOOKING--");
    console.log("Booking number:  " + oldBookingID);
    console.log("NHI Number:      " + newNHInum);
    console.log("Patient name:    " + newPatientName);
    console.log("Date:            " + newDate);
    console.log("Time:            " + newTime);
    console.log("Dentist name:    " + newDentistName);
    console.log("Procedure:       " + newProcedure);
    console.log("Ares affected:   " + newAreasAffected);
    console.log("Patient notes:   " + newPatientNotes);

    //TODO: Send 0 if the edit was successful and 1 if it was not
    return 0;
}