//This file will pull information from the database to use in the Calendar component

//TODO: Have this file integrated with the DB

export const pullFromDataBase = (dateSelected:any, userType:any) =>{
    
    //TODO: Pulls from database
    //Get the count for the booking for 'dateSelected'
    //Get the bookings based on userType
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
                "Jane Doe" + "." +
                "21/08/2022" + "." +
                "11" + "." +
                "00" + "." +
                "AM" + "." +
                "Hades" + "." + 
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
                "John Doe" + "." +
                "26/08/2022" + "." +
                "6" + "." +
                "00" + "." +
                "PM" + "." +
                "Kratos" + "." + 
                "Crown" + "." +
                "" + "." +
                ""
                );
        }
    }
    
    return bookingDisplayed;
}

export const deleteFromDataBase = (ID:any) =>{

    //TODO: Deletes the data from the database based on the ID given
    console.log("BOOKING WITH ID " + ID + " WAS DELETED...");
    return 0;
}