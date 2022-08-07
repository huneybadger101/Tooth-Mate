//This file will pull information from the database to use in the Calendar component

//TODO: Have this file integrated with the DB

export const pullFromDataBase = (dateSelected:any) =>{
    
    //TODO: Pulls from database
    //Get the count for the booking for 'dateSelected'
    //Loop through the bookings and save all relevant info to an array (note below)
    //Send the array through 'return'
    //The other side should automatically display everything
    //Make sure to change the array order etc in this component


    //Temporary until the databse is ready to go
    var bookingDisplayed: any = [];
    var bookingAmount: any = 6;

    if (dateSelected == "21/8/2022")
    {
        for (var num = 0; num < bookingAmount; num++)
        {
            bookingDisplayed[num] = (
                num + "." +
                "ABC123" + "." +
                "Hayley" + "." +
                "21/08/2022" + "." +
                "11" + "." +
                "00" + "." +
                "AM" + "." +
                "Someone scary..." + "." + 
                "Crown" + "." +
                "" + "." +
                ""
                );
        }
    }
    else if (dateSelected == "26/8/2022")
    {
        for (var num = 0; num < bookingAmount; num++)
        {
            bookingDisplayed[num] = (
                num + "." +
                "ABC123" + "." +
                "Liam" + "." +
                "26/08/2022" + "." +
                "6" + "." +
                "00" + "." +
                "PM" + "." +
                "Someone scary..." + "." + 
                "Crown" + "." +
                "" + "." +
                ""
                );
        }
    }
    
    return bookingDisplayed;
}






















export const editFromDB = (newBookingID:any, newNHInum:any, newPatientName:any, newDate:any, newTime:any, 
    newDentistName:any, newProcedure:any, newAreasAffected:any, newPatientNotes:any,
    oldBookingID:any, oldNHInum:any, oldPatientName:any, oldDate:any, oldTime:any, 
    oldDentistName:any, oldProcedure:any, oldAreasAffected:any, oldPatientNotes:any) =>{
    //TODO: Have the database edited based on what was done in the bookings component

        

    
    console.log("--OLD BOOKING--");
    console.log("Booking number:  " + oldBookingID);
    console.log("NHI Number:      " + oldNHInum);
    console.log("Patient name:    " + oldPatientName);
    console.log("Date:            " + oldDate);
    console.log("Time:            " + oldTime);
    console.log("Dentist name:    " + oldDentistName);
    console.log("Procedure:       " + oldProcedure);
    console.log("Ares affected:   " + oldAreasAffected);
    console.log("Patient notes:   " + oldPatientNotes);





    console.log("--NEW BOOKING--");
    console.log("Booking number:  " + newBookingID);
    console.log("NHI Number:      " + newNHInum);
    console.log("Patient name:    " + newPatientName);
    console.log("Date:            " + newDate);
    console.log("Time:            " + newTime);
    console.log("Dentist name:    " + newDentistName);
    console.log("Procedure:       " + newProcedure);
    console.log("Ares affected:   " + newAreasAffected);
    console.log("Patient notes:   " + newPatientNotes);

        return 0;

}



















export const deleteFromDataBase = (ID:any) =>{

    //TODO: Deletes the data from the database based on the ID given
    
    return 0;
}