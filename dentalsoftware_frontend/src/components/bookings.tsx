import { Text, View, Button, CheckBox, LineEdit, BoxView } from "@nodegui/react-nodegui";
import React from "react";



export class Bookings extends React.Component {

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {
        return (
            <View style="flex: 1; background-color: 'grey';">

                
                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChanged }} />
                    
                    <Text wordWrap={true} style="color: 'black'; font-size: 15px;">
                        NHI Number
                    </Text>
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChanged }} />
                    
                    <Text wordWrap={true} style="color: 'black'; font-size: 15px;">
                        Date and Time
                    </Text>
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChanged }} />
                    
                    <Text wordWrap={true} style="color: 'black'; font-size: 15px;">
                        Name
                    </Text>
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: handleTextChanged }} />

                    <Text wordWrap={true} style="color: 'black'; font-size: 15px;">
                        Dentist
                    </Text>
                </View>

                <Button text = {"Complete Booking"} on = {buttonHandler} />
                
                


            </View>
        );

            

    }
} 
const textStyle = 'color: black;';



// This will be what happens when the button is clicked.
const buttonHandler = {
    clicked: () => {
      console.log("Booking complete");
    }
};


const handleTextChanged = (textValue: string) => {
    console.log("Testing: " + textValue);
    return textValue;
   };


export default Bookings;
