//This file will pull information from the database to use in the Calendar component

export const pullFromDataBase = (num:any) =>{

    //TODO: Pulls from database

    //Temporary until the databse is ready to go
    var test: any = [4];
    test[0] = "Name placeholder";
    test[1] = "NHI placeholder";
    test[2] = "Dentist placeholder";
    test[3] = "Notes";

    return test[num];
}

export const deleteFromDataBase = (ID:any) =>{

    //TODO: Deletes the data from the database based on the ID given
    
    return 0;
}