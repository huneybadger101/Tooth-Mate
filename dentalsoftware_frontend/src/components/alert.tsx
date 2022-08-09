import { Text, View, Button } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";

export class Alert extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {

            visible: true,
            title: props.title,
            message: props.message

        }
    }

    dismissButtonHandler = () => {
        this.setState({
            visible: false
        })
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const dismissButton = <Button text="Dismiss" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.dismissButtonHandler(),
            }
        }/>

        let mainView = <View style="position: 'absolute'; top: 20; right: 20; width: 50px; height: 100px; border: 1px solid black;">
                            <Text>{this.state.title}</Text>
                            <Text>{this.state.message}</Text>
                            {dismissButton}
                        </View>
        if (!this.state.visible) {
            mainView = null
        }

        return (
            mainView
        );
    }
} 

export default Alert;
