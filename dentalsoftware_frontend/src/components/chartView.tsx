import { Button, View, Text } from "@nodegui/react-nodegui";
import React from "react";


export class ChartView extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        let alert = this.props.alert;

        let topLeft = [];
        let topRight = [];
        let bottomLeft = [];
        let bottomRight = [];

        for (let i = 0; i < 8; i++) {
            let name = "" + (i + 1);
            topLeft.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i)
                }
            }}/>)
            name = "" + (i + 9);
            topRight.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 8)
                }
            }}/>)
            name = "" + (i + 17);
            bottomLeft.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 16)
                }
            }}/>)
            name = "" + (i + 25);
            bottomRight.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 24)
                }
            }}/>)
        }

        return (
            <View style="flex: 1; justify-content: 'center'; align-items: 'center';">
                <Text>{this.props.name}</Text>
                <View style="flex: 'auto'; margin: 10px;">
                    <View style="flex: 'auto'; flex-direction: 'row';">
                        <View style="margin: 5px; flex-direction: 'row'">
                            {topLeft}
                        </View>
                        <View style="border: 4px solid black;"/>
                        <View style="margin: 5px; flex-direction: 'row'">
                            {topRight}
                        </View>
                    </View>
                    <View style="border: 4px solid black;"/>
                    <View style="flex: 'auto'; flex-direction: 'row';">
                        <View style="margin: 5px; flex-direction: 'row'">
                            {bottomLeft}
                        </View>
                        <View style="border: 4px solid black;"/>
                        <View style="margin: 5px; flex-direction: 'row'">
                            {bottomRight}
                        </View>
                    </View>
                </View>
                {alert}
            </View>
        );
    }
} 

export default ChartView;