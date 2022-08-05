import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import { pullFromDataBase } from "./Calendarhelpers/calendarPullFromDB";

export class Bookings extends React.Component<any, any> {

    constructor(props: any) {
    super(props);
        this.state = {
            NHINumber: "",
            date: "",
            name: "",
            dentist: "",
            notes: "",
            confirmMessage: "",
            bookingDateVars: this.props.data.split("."),
            currentBookingSelected: "",
            editBookingButton: false,
            
            //If 0 then show the bookings list, if 1 then showe the create/ edit booking
            bookingCreateOrEditDisplay: 0,
            bookingOrCancelButtonText: "New Booking",
            editButtonClicked: false,

            bookingID: [],
            NHInum: [],
            patientName: [],
            time: [],
            dentistName: [],
            procedure: [],
            areasAffected: [],
            patientNotes: []
        }
    }
    
    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        var splitBookingString = this.props.data.split(".");
        var day = splitBookingString[0];
        var month = splitBookingString[1];
        var year = splitBookingString[2];
        var weekday = splitBookingString[3];
        var bookingDate = splitBookingString[0] + "/" + splitBookingString[1] + "/" + splitBookingString[2];

        if (bookingDate == "0/1/0")
        {
            bookingDate = "";
        }

         var editExistingBooking = true;

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

                this.state.NHInum[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z0-9! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                    NHINumber: textValue.replace(/[^a-zA-Z0-9! ]+/g, '')
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }
        
        const textHandlerName = {
            textChanged: (textValue:any) =>{

                this.state.patientName[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerTime = {
            textChanged: (textValue:any) =>{

                this.state.time[this.state.currentBookingSelected] = textValue.replace(/[^0-9! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerDentist = {
            textChanged: (textValue:any) =>{

                this.state.dentistName[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerProcedure = {
            textChanged: (textValue:any) =>{

                this.state.procedure[this.state.currentBookingSelected] = textValue.replace(/[^a-zA-Z! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerAreasAffected = {
            textChanged: (textValue:any) =>{

                this.state.areasAffected[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        const textHandlerNotes = {
            textChanged: (textValue:any) =>{

                this.state.patientNotes[this.state.currentBookingSelected] = textValue.replace(/[^0-9,! ]+/g, '');
                this.setState({
                    editButtonClicked: false,
                })

                this.setState({
                    //replace past a specific length
                })
            }
        }

        





        const buttonHandlerBookingOrCancel = {
            clicked: () => {

                if (this.state.bookingCreateOrEditDisplay == 1)
                {
                    this.setState({
                        bookingCreateOrEditDisplay: 0,
                        bookingOrCancelButtonText: "Create Booking",
                        editButtonClicked: false
                    });

                    this.state.bookingID[this.state.currentBookingSelected] = "";
                    this.state.NHInum[this.state.currentBookingSelected] = "";
                    this.state.patientName[this.state.currentBookingSelected] = "";
                    this.state.time[this.state.currentBookingSelected] = "";
                    this.state.dentistName[this.state.currentBookingSelected] = "";
                    this.state.procedure[this.state.currentBookingSelected] = "";
                    this.state.areasAffected[this.state.currentBookingSelected] = "";
                    this.state.patientNotes[this.state.currentBookingSelected] = "";
                }
                else
                {
                    this.setState({
                        bookingCreateOrEditDisplay: 1,
                        bookingOrCancelButtonText: "Cancel"
                    });
                } 
            }
        }

        

        var bookingList:any = [];
        var bookingVariables:any = [];
        var dateFull = (day + "/" + month + "/" + year);
        var valuesBeforeEdit: any = [];
        //Assigns the variables from the database into the bookingVariables array for later use.
        
        bookingVariables = pullFromDataBase(dateFull);

        if (day != 0)
        {
            for (var num = 0; num < bookingVariables.length; num++)
            {
                //Sets a reference point for the button that is clicked
                let bookingSelected = bookingVariables[num].split(".")[0].toString();

                if (this.state.editButtonClicked == true)
                {
                    //Sets all the variables to allow for editing the booking
                    this.state.bookingID[num] = bookingVariables[num].split(".")[0];
                    this.state.NHInum[num] = bookingVariables[num].split(".")[1];
                    this.state.patientName[num] = bookingVariables[num].split(".")[2];
                        //NOTE: Date is already given via this class
                    this.state.time[num] = bookingVariables[num].split(".")[4];
                    this.state.dentistName[num] = bookingVariables[num].split(".")[5];
                    this.state.procedure[num] = bookingVariables[num].split(".")[6];
                    this.state.areasAffected[num] = bookingVariables[num].split(".")[7];
                    this.state.patientNotes[num] = bookingVariables[num].split(".")[8];

                    //Stores currently saved values into variables to display changes at the end of edit
                    valuesBeforeEdit[0] = bookingVariables[num].split(".")[0];
                    valuesBeforeEdit[1] = bookingVariables[num].split(".")[1];
                    valuesBeforeEdit[2] = bookingVariables[num].split(".")[2];
                    valuesBeforeEdit[3] = dateFull;
                    valuesBeforeEdit[4] = bookingVariables[num].split(".")[4];
                    valuesBeforeEdit[5] = bookingVariables[num].split(".")[5];
                    valuesBeforeEdit[6] = bookingVariables[num].split(".")[6];
                    valuesBeforeEdit[7] = bookingVariables[num].split(".")[7];
                    valuesBeforeEdit[8] = bookingVariables[num].split(".")[8];
                }
                

                //Creates the bookings to view, will also create an edit button for each booking
                bookingList.push(
                    <View style={"flex-direction: 'row';"}>

                        <Text>{"Booking ID: " + bookingVariables[num].split(".")[0] + ", Booking date" + dateFull}</Text>

                        <Button 
                            text={"Edit"}
                            id={bookingSelected}
                            on={{clicked: () => {
                                this.setState({
                                    currentBookingSelected: bookingSelected, 
                                    editBookingButton: true, 
                                    bookingCreateOrEditDisplay: 1, 
                                    editButtonClicked: true,
                                    bookingOrCancelButtonText: "Cancel"
                                })
                            }}}
                        />

                    </View>
                );
            }
        }
        



        const buttonHandlerCompleteEditOrCreation = {
            clicked: () => {
                //TODO: Have a confirm screen showing what will be changed
                //Do this by using the value printed via console.log's below

                console.log("---BEFORE EDIT---");
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[0]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[1]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[2]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[3]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[4]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[5]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[6]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[7]);
                console.log(bookingVariables[this.state.currentBookingSelected].split(".")[8]);

                console.log("---AFTER EDIT---");
                console.log(this.state.bookingID[this.state.currentBookingSelected]);
                console.log(this.state.NHInum[this.state.currentBookingSelected]);
                console.log(this.state.patientName[this.state.currentBookingSelected]);
                console.log(dateFull);
                console.log(this.state.time[this.state.currentBookingSelected]);
                console.log(this.state.dentistName[this.state.currentBookingSelected]);
                console.log(this.state.procedure[this.state.currentBookingSelected]);
                console.log(this.state.areasAffected[this.state.currentBookingSelected]);
                console.log(this.state.patientNotes[this.state.currentBookingSelected]);
            }
        }



        const containerStyle = `
            
            background: 'white';
            border: 1px solid black;
            margin: 10px;
            
        `;

        const containerStyle2 = `
            flex-grow: auto 0 0;
            background: 'white';
            border: 0px solid black;
            margin: 10px;
            height: '100%';
        `;
        

        var pageDiplay: any = [];

        pageDiplay[1] = (
            <View style="flex-direction: 'row';">
            <View style={containerStyle}>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Booking ID</Text>
                        <LineEdit style={"flex: 2;"} text={this.state.bookingID[this.state.currentBookingSelected]} enabled={false}/>
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>NHI Number</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerNHI} text={this.state.NHInum[this.state.currentBookingSelected]}/>
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Date</Text>
                        <LineEdit style={"flex: 2;"} text={bookingDate} enabled={false} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Patient Name</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerName} text={this.state.patientName[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Time</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerTime} text={this.state.time[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Dentist name</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerDentist} text={this.state.dentistName[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Procedure</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerProcedure} text={this.state.procedure[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Areas affected</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerAreasAffected} text={this.state.areasAffected[this.state.currentBookingSelected]} />
                    </View>

                    <View style="margin: 10px; flex-direction: 'row';">
                        <Text style={"flex: 1; border: 1px solid black;"}>Patient notes</Text>
                        <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentBookingSelected]} />
                    </View>

                    <Button text={"Complete"} on={buttonHandlerCompleteEditOrCreation}></Button>
                </View>
                </View>
        );



        pageDiplay[0] = (
            <View style="flex-direction: 'row';">

                
                <View style={containerStyle2}>
                <Text style="border: 1px solid black; padding: 10px">
                    {"Date selected: " + dateFull}
                </Text>

                    {bookingList}
                    <Text style={"margin: 10px;"}>{this.state.confirmMessage}</Text>

                </View>
            </View>
        );

        return (

            <View>
                
                <View>
                    <Button text = {this.state.bookingOrCancelButtonText} style={"margin: 10px;"} on = {buttonHandlerBookingOrCancel} />
                </View>

                {pageDiplay[this.state.bookingCreateOrEditDisplay]}

            </View>

        );
        
        
    }
} 

export default Bookings;
