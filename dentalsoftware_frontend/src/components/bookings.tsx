import { Text, View, Button, LineEdit, PlainTextEdit } from "@nodegui/react-nodegui";
import React from "react";

export class Bookings extends React.Component<any, any> {

    constructor(props: any) {
    super(props);
        this.state = {
            NHINumber: "",
            date: "",
            name: "",
            dentist: "",
            notes: "",
            confirmMessage: ""
        }
    }
    
    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

         var editExistingBooking = true;
         var buttonText = "Create booking";
        
        // //NOTE: THIS IS FOR IF THE EDIT BUTTON IS SELECTED ON THE CALENDAR PAGE.
        // //IT WILL SAVE THE SELECTED BOOKING INFO AND SEND IT TO THIS PAGE.
        // if (editExistingBooking == true)
        // {
        //     this.setState({
        //         name: "Place holder name",
        //         date: "Place holder date",
        //         NHINumber: "Placeholder NHI number",
        //         dentist: "Placeholder dentist",
        //         notes: "Placeholder notes"
        //     });

        //     buttonText = "Edit booking";
        // }

        const buttonHandler = {
            clicked: () => {
        
                var confirm = 0;
        
                //Input validation for the name field
                if (this.state.name == "")
                {
                    console.log("ERROR: Name invalid. Please make sure field is filled");
                    confirm = confirm + 1;
                }
        
                //Input validation for the NHI Number field
                if (this.state.NHINumber == "")
                {
                    console.log("ERROR: NHI Number must be filled");
                    confirm = confirm + 1;
                }
        
                //Input validation for the date field
                if (this.state.date)
                {
                    //TODO: Add validation for the date.
                }
        
                //Input validation for the dentist name field
                if (this.state.dentist == "")
                {
                    console.log("ERROR: Dentist must be filled");
                    confirm = confirm + 1;
                }
        
                if (confirm == 0)
                {
                    this.setState({
                        confirmMessage: "Booking complete"
                    });

                    console.log("Booking complete! Below are the details input...");
                    console.log("Name: " + this.state.name);
                    console.log("NHI: " + this.state.NHINumber);
                    console.log("Date: " + this.state.date);
                    console.log("Dentist: " + this.state.dentist);
                }
                else if (confirm == 1)
                {
                    this.setState({
                        confirmMessage: "There are one or more issues, please fix them before submitting"
                    });

                    console.log("Please fix the issue above");
                }
                else
                {
                    this.setState({
                        confirmMessage: "There are one or more issues, please fix them before submitting"
                    });

                    console.log("Please fix the " + confirm + " issues above");
                }
            }
        };













        

        const textHandlerNHI = {
            textChanged: (textValue:any) =>{
                this.setState({
                    NHINumber: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }
        
        const textHandlerName = {
            textChanged: (textValue:any) =>{
                this.setState({
                    name: textValue.replace(/[^a-zA-Z! ]+/g, '')
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerDentist = {
            textChanged: (textValue:any) =>{
                this.setState({
                    dentist: textValue.replace(/[^a-zA-Z! ]+/g, '')
                    
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }









        
        

        





        







        const containerStyle = `
            
            background: 'white';
            border: 1px solid black;
            margin: 10px;
            height: '100%';
            width: '30%';
        `;

        const containerStyle2 = `
            flex-grow: auto 0 0;
            background: 'white';
            border: 1px solid black;
            margin: 10px;
            height: '100%';
        `;

        return (
            <View style="flex-direction: 'row';">
                <View style={containerStyle}>

                    <View style="margin: 10px; border: 1px solid black;">
                        <LineEdit  on={textHandlerNHI} text={this.state.NHINumber} placeholderText={"NHI Number"}/>
                    </View>

                    <View style="margin: 10px; border: 1px solid black;">
                        <LineEdit text={this.state.date} placeholderText={"Date & Time"} />
                    </View>

                    <View style="margin: 10px; border: 1px solid black;">
                        <LineEdit on={textHandlerName} text={this.state.name} placeholderText={"Name"} />
                    </View>

                    <View style="margin: 10px; border: 1px solid black;">
                        
                        <LineEdit on={textHandlerDentist} text={this.state.dentist} placeholderText={"Dentist"}/>
                    </View>

                    <View style="margin: 10px; border: 1px solid black;">
                        <PlainTextEdit text={this.state.notes} placeholderText={"Additional notes"}></PlainTextEdit>
                    </View>
                    

                    

                </View>

                <View style={containerStyle2}>

                    <Text style={"margin: 10px;"}>{this.state.confirmMessage}</Text>
                        
                    <Button text = {buttonText} style={"margin: 10px;"} on = {buttonHandler} id={"btn"}/>

                </View>

            </View>
        );
    }
} 

export default Bookings;