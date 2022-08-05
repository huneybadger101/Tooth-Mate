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

    for (var num = 0; num < bookingAmount; num++)
    {
        bookingDisplayed[num] = (
             num + "." +
            "NHInumberPlaceholder" + "." +
            "Patient name placeholder" + "." +
            dateSelected + "." +
            "Time placeholder" + "." +
            "Dentist placeholder" + "." + 
            "Procedure placeholder" + "." +
            "Areas affected placeholder" + "." +
            "Notes placeholder"
            );
    }
    
    return bookingDisplayed;
}

export const editFromDB = () =>{
    //TODO: Have the database edited based on what was done in the bookings component
}

export const deleteFromDataBase = (ID:any) =>{

    //TODO: Deletes the data from the database based on the ID given
    
    return 0;
}