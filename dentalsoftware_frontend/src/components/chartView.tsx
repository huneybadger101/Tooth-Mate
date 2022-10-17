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

        let childTopLeft = [];
        let childTopRight = [];
        let childBottomLeft = [];
        let childBottomRight = [];

        for (let i = 0; i < 8; i++) {
            let name = "" + (18 - i);
            topLeft.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i)
                }
            }}/>)
            name = "" + (21 + i);
            topRight.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 8)
                }
            }}/>)
            name = "" + (48 - i);
            bottomLeft.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 16)
                }
            }}/>)
            name = "" + (31 + i);
            bottomRight.push(<Button style="height: 100px; width: 100px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 24)
                }
            }}/>)
        }

        for (let i = 0; i < 5; i++) {
            let name = "" + (55 - i);
            childTopLeft.push(<Button style="height: 80px; width: 80px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 32)
                }
            }}/>)
            name = "" + (61 + i);
            childTopRight.push(<Button style="height: 80px; width: 80px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 37)
                }
            }}/>)
            name = "" + (85 - i);
            childBottomLeft.push(<Button style="height: 80px; width: 80px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 42)
                }
            }}/>)
            name = "" + (71 + i);
            childBottomRight.push(<Button style="height: 80px; width: 80px;" text={name} on={{
                clicked: () => {
                    this.props.callback(i + 47)
                }
            }}/>)
        }

        return (
            <View id="mainView" style="flex: 1; justify-content: 'center'; align-items: 'center';">
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
                <View style="flex: 'auto'; margin: 10px;">
                    <View style="flex: 'auto'; flex-direction: 'row';">
                        <View style="margin: 5px; flex-direction: 'row'">
                            {childTopLeft}
                        </View>
                        <View style="border: 4px solid black;"/>
                        <View style="margin: 5px; flex-direction: 'row'">
                            {childTopRight}
                        </View>
                    </View>
                    <View style="border: 4px solid black;"/>
                    <View style="flex: 'auto'; flex-direction: 'row';">
                        <View style="margin: 5px; flex-direction: 'row'">
                            {childBottomLeft}
                        </View>
                        <View style="border: 4px solid black;"/>
                        <View style="margin: 5px; flex-direction: 'row'">
                            {childBottomRight}
                        </View>
                    </View>
                </View>
                {alert}
            </View>
        );
    }
} 

export default ChartView;