import { Text, View } from "@nodegui/react-nodegui";
import React from "react";

export class Calendar extends React.Component {

    render() {

        var monthEnd:number = 28;
        var calendar1:any = [];
        var calendar2:any = [];
        var calendar3:any = [];
        var calendar4:any = [];
        var calendar5:any = [];

        for (var i = 0; i < 7; i++) {
          calendar1.push( 
          <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Text>{i + 1}</Text>
          </View>
          )
          calendar2.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Text>{i + 8}</Text>
            </View>
          )
          calendar3.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Text>{i + 15}</Text>
            </View>
          )

          if (i + 22 <= monthEnd){
          calendar4.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Text>{i + 22}</Text>
            </View>
            )
          }

          if (i + 29 <= monthEnd){
          calendar5.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Text>{i + 29}</Text>
              </View>
            )
          }
        }
        const containerStyle = `
            flex: 1; 
            background-color: "white";
        `;
        // Must wrap main App component in a React.Fragment component
        // in order to allow for sub-windows to be created later on
        return (

          <View style={containerStyle}>

            <View style="flex: 1; flex-direction: 'row'; height: 100px;">
                <Text style="justify-content: 'center'; align-items: 'center';">Month name</Text>
            </View>

            <View style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center';">
              {calendar1}
            </View>
            <View style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center';">
              {calendar2}
            </View>
            <View style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center';">
              {calendar3}
            </View>
            <View style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center';">
              {calendar4}
            </View>
            <View style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center';">
              {calendar5}
            </View>
            
          </View>
        );
    }
} 

export default Calendar;