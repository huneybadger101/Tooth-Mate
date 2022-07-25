import { Text, View, Button } from "@nodegui/react-nodegui";
import React from "react";

export class Calendar extends React.Component {

    render() {

      //NOTE: This is for testing purposes and should be removed eventually.
      const WEEK_DAYS = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4,
        Saturday: 5,
        Sunday: 6
      }
        //monthEnd is the amount of days in the month
        var monthEnd:number = 28;
        //StartPoint is the day (Mon, Tue, Wed etc) that the month starting node will begin on
        var startPoint:number = 0;

        var calendar1:any = [];
        var calendar2:any = [];
        var calendar3:any = [];
        var calendar4:any = [];
        var calendar5:any = [];

        var calendar6:any = [];

        


        for (var i = 0; i < 7; i++) {


          if (i >= startPoint)
          {
            calendar1.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Text>{i + (1 - startPoint)}</Text>
              </View>
              )
          }
          else
          {
            calendar1.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px; background-color: 'grey';">
                <Text></Text>
              </View>
              )
          }


          





          calendar2.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Text>{i + (8 - startPoint)}</Text>
            </View>
          )

          calendar3.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Text>{i + (15 - startPoint)}</Text>
            </View>
          )

          if (i + (22 - startPoint) <= monthEnd){
            calendar4.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Text>{i + (22 - startPoint)}</Text>
              </View>
            )
          }

          if (i + (29 - startPoint) <= monthEnd){
            calendar5.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Text>{i + (29 - startPoint)}</Text>
              </View>
            )
          }
          else
          {
            calendar5.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px; background-color: 'grey';">
                <Text></Text>
              </View>
              )
          }

          if (i + (36 - startPoint) <= monthEnd){
            calendar6.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Text>{i + (36 - startPoint)}</Text>
              </View>
            )
          }
          else
          {
            calendar6.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px; background-color: 'grey';">
                <Text></Text>
              </View>
              )
          }
          
        }
        const containerStyle = `
            flex: 1; 
            background: 'white';
        `;
        // Must wrap main App component in a React.Fragment component
        // in order to allow for sub-windows to be created later on
        return (
          










          

          





          <View style={containerStyle}>
              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center'; ">
                  <Button style="width: 200px;"/>
                      <Text style="flex: 0; justify-content: 'left'; align-items: 'left'; border: 1px solid black; width: 300px;">Month</Text>
                  <Button style="width: 200px;"/>
              </View>

              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Monday</Text>
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Tuesday</Text>
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Wednesday</Text>
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Thursday</Text>
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Friday</Text>
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Saturday</Text>
                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Sunday</Text>
              </View>

              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  {calendar1}
              </View>
              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  {calendar2}
              </View>
              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  {calendar3}
              </View>
              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  {calendar4}
              </View>
              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  {calendar5}
              </View>
              <View style="flex: 0; flex-direction: 'row'; justify-content: 'left'; align-items: 'center';">
                  {calendar6}
              </View>


              <View style="flex: 0; flex-direction: 'row'; justify-content: 'right'; align-items: 'right';">

                  <Text style="flex: 0; justify-content: 'center'; align-items: 'center'; border: 1px solid black; width: 100px;">Date sent</Text>

              </View>



          </View>







          
          
          
        );
    }
} 

export default Calendar;