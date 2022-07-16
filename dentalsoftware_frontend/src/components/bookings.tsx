import { Text, View, Button, LineEdit, SpinBox } from "@nodegui/react-nodegui";
import React, { useState } from "react";










export class Bookings extends React.Component {
    


    
    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        

        return (
            
            <View style="flex: 1; background-color: 'grey';">

                






    





                

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChangedNHI }} id={"NHI"} placeholderText={"NHI Number"} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChangedDate }} placeholderText={"Date & Time"} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChangedName }} placeholderText={"Name"} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChangedDentist }} placeholderText={"Dentist"} />
                </View>

                <Button text = {"Complete Booking"} on = {buttonHandler} id={"btn"}/>

            </View>
        );
    }
} 
const textStyle = 'color: black;';

var NHInumber:string = "";
var date:string = "";
var name:string = "";
var dentist:string = "";

// This will be what happens when the button is clicked.
const buttonHandler = {
    clicked: () => {
        
        

        var confirm = 0;

        //Input validation for the name field
        if (name == "")
        {
            console.log("ERROR: Name invalid. Please make sure field is filled");
            confirm = confirm + 1;
        }

        //Input validation for the NHI Number field
        if (NHInumber == "")
        {
            console.log("ERROR: NHI Number must be filled");
            confirm = confirm + 1;
        }

        //Input validation for the date field
        if (date)
        {
            //TODO: Add validation for the date.
        }

        //Input validation for the dentist name field
        if (dentist == "")
        {
            console.log("ERROR: Dentist must be filled");
            confirm = confirm + 1;
        }

        if (confirm == 0)
        {
            console.log("Booking complete! Below are the details input...");
            console.log("Name: " + name);
            console.log("NHI: " + NHInumber);
            console.log("Date: " + date);
            console.log("Dentist: " + dentist);
        }
        else if (confirm == 1)
        {
            console.log("Please fix the issue above");
        }
        else
        {
            console.log("Please fix the " + confirm + " issues above");
        }
    }
};















    const handleTextChangedNHI = (textValue: string) => {
        NHInumber = textValue;
        
   };

   const handleTextChangedDate = (textValue: string) => {
    date = textValue;
   };

   const handleTextChangedName = (textValue: string) => {
    name = textValue;
   };

   const handleTextChangedDentist = (textValue: string) => {
    dentist = textValue;
   };


export default Bookings;