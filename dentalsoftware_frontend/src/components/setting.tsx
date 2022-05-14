import { Text, View, Button } from "@nodegui/react-nodegui";
import React from "react";
import Homepage from "./homepage";

export class Setting extends React.Component {

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {
        
        return (
            <View style="flex: 1; background-color: 'white';">
                <View style="justify-content: 'top'; align-items: 'center'; background-color: 'grey'; width:'fixed'">
                    <Text wordWrap={true} style="color: 'black'; font-size: 35px;">
                        Setting
                    </Text>
                </View>
                {/* <Button style="align-items: 'left'; color: 'blue'; background: 'green';">
                    setting1
                </Button> */}
                <View id="sidebar" style="width:100px">
                    <Text/>
                    <Button
                    id="1"
                    text="setting1"
                    style="height:100px"
                    />
                    <Button
                    id="2"
                    text="setting2"
                    style="height:100px"
                    />
                    <Button
                    id="3"
                    text="setting3"
                    style="height:100px"
                    />
                    <Button
                    id="4"
                    text="setting4"
                    style="height:100px"
                    />
                </View>
            </View>
        );
    }
} 

export default Setting;

