import { Text, View } from "@nodegui/react-nodegui";
import React from "react";

export class Homepage extends React.Component {

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {
        
        return (
            <View style="flex: 1; justify-content: 'center'; align-items: 'center'; background-color: 'grey';">
                <Text wordWrap={true} style="color: 'black'; font-size: 35px;">
                    Setting
                </Text>
            </View>
        );
    }
} 

export default Homepage;