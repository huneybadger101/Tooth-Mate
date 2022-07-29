import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import React from "react";

export class Bookings extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            NHINumber: "",
            Date: "",
            Name: "",
            Dentist: "",
            confirmMessage: "",
        }
      }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {
        const buttonHandler = {
            clicked: () => {
        
                var confirm = 0;
        
                //Input validation for the name field
                if (this.state.Name == "")
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
                if (this.state.Date)
                {
                    //TODO: Add validation for the date.
                }
        
                //Input validation for the dentist name field
                if (this.state.Dentist == "")
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
                    console.log("Name: " + this.state.Name);
                    console.log("NHI: " + this.state.NHINumber);
                    console.log("Date: " + this.state.Date);
                    console.log("Dentist: " + this.state.Dentist);
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

        return (
            
            <View style="flex: 1; background-color: 'grey';">

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({


                            NHINumber: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                        })
                    } }} text={this.state.NHINumber} placeholderText={"NHI Number"} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                            Date: textValue
                        })
                    } }} text={this.state.Date} placeholderText={"Date & Time"} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                            Name: textValue.replace(/[^a-zA-Z! ]+/g, '')
                        })
                    } }} text={this.state.Name} placeholderText={"Name"} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                            Dentist: textValue.replace(/[^a-zA-Z! ]+/g, '')
                        })
                    } }} text={this.state.Dentist} placeholderText={"Dentist"} />
                </View>

                <Button text = {"Complete Booking"} on = {buttonHandler} id={"btn"}/>

                <Text>{this.state.confirmMessage}</Text>

            </View>
        );
    }
} 

export default Bookings;