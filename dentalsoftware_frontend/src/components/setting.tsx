import { Text, View, Button } from "@nodegui/react-nodegui";
import React from "react";

export class Calendar extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      color1:0,
      color2:0,
      color3:0,
      color4:0,
      color5:0,
      color6:0,
      color7:0,
      color8:0,
      color9:0,
      status1:false,
      status2:false,
      status3:false,
      status4:false,
      status5:false,
      status6:false,
      status7:false,
      status8:false,
      status9:false
    }
  }

    render() {

        var calendar1:any = [];
        var calendar2:any = [];
        var calendar3:any = [];

        // var newList = this.state.newstatus.slice();

        for (var i = 1; i <= 3; i++) {

          let buttonName_0 = (i).toString();
            calendar1.push( 
              <View style="border: 1px solid black; height: 100px; width: 100px;">
                <Button text={ buttonName_0 } style={((this.state.color1==parseInt(buttonName_0)&&this.state.status1)
                ||(this.state.color2==parseInt(buttonName_0)&&this.state.status2)
                ||(this.state.color3==parseInt(buttonName_0)&&this.state.status3))
                ?"height: 100px; width: 100px;background: 'grey';":"height: 100px; width: 100px;"}  on={{clicked: () => {
              if (parseInt(buttonName_0) == 1)
              {
                  this.setState({status1: !this.state.status1,
                    color1:1
                  })
              }
              else if(parseInt(buttonName_0) == 2)
              {
                  this.setState({status2: !this.state.status2,
                    color2:2
                  })
              }
              else if(parseInt(buttonName_0) == 3)
              {
                  this.setState({status3: !this.state.status3,
                    color3:3
                  })
              }
          }}} />
              </View>
              )
          
          let buttonName_1 = (i + 3).toString();
          calendar2.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Button text={ buttonName_1 } style={((this.state.color4==parseInt(buttonName_1)&&this.state.status4)
              ||(this.state.color5==parseInt(buttonName_1)&&this.state.status5)
              ||(this.state.color6==parseInt(buttonName_1))&&this.state.status6)
              ?"height: 100px; width: 100px;background: 'grey';":"height: 100px; width: 100px;"} on={{clicked: () => {
              if (parseInt(buttonName_1) == 4)
              {
                  this.setState({status4: !this.state.status4,
                    color4:4
                  })
              }
              else if(parseInt(buttonName_1) == 5)
              {
                  this.setState({status5: !this.state.status5,
                    color5:5
                  })
              }
              else if(parseInt(buttonName_1) == 6)
              {
                  this.setState({status6: !this.state.status6,
                    color6:6
                  })
              }
          }}} />
            </View>
          )

          let buttonName_2 = (i + 6).toString();
          calendar3.push( 
            <View style="border: 1px solid black; height: 100px; width: 100px;">
              <Button text={ buttonName_2 } style={((this.state.color7==parseInt(buttonName_2)&&this.state.status7)
              ||(this.state.color8==parseInt(buttonName_2)&&this.state.status8)
              ||(this.state.color9==parseInt(buttonName_2))&&this.state.status9)
              ?"height: 100px; width: 100px;background: 'grey';":"height: 100px; width: 100px;"} on={{clicked: () => {
              if (parseInt(buttonName_2) == 7)
              {
                  this.setState({status7: !this.state.status7,
                    color7:7
                  })
              }
              else if(parseInt(buttonName_2) == 8)
              {
                  this.setState({status8: !this.state.status8,
                    color8:8
                  })
              }
              else if(parseInt(buttonName_2) == 9)
              {
                  this.setState({status9: !this.state.status9,
                    color9:9
                  })
              }
          }}} />
            </View>
          )
        }

        const containerStyle = `
            
            background: 'white';
        `;

        const Sendanarray = {
          clicked: () => {
            console.log(this.state.status1+"/"+this.state.status2+"/"+
            this.state.status3+"/"+this.state.status4+"/"+this.state.status5+"/"+
            this.state.status6+"/"+this.state.status7+"/"+this.state.status8+"/"+this.state.status9);
          }
        };
        return (

          <View>
              <View style={containerStyle}>

                <View style="flex: 0; flex-direction: 'row';">
                    {calendar1}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar2}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar3}
                </View>
              </View>
              <View>
                {/* <Text style="border: 1px solid black; width: 300px;">{this.state.color}</Text> */}
                <Text style="border: 1px solid black; width: 600px;">{this.state.status1+"/"+this.state.status2+"/"+
                this.state.status3+"/"+this.state.status4+"/"+this.state.status5+"/"+
                this.state.status6+"/"+this.state.status7+"/"+this.state.status8+"/"+this.state.status9}</Text>
                <Button text = {"confirm(console)"} on = {Sendanarray} id={"btn"}/>
              </View>
            </View>
        );
    }
} 

export default Calendar;