import { Text, View, Button } from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React from "react";

export class Alert extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        let subView = null

        if (props.subView) {
            subView = props.subView;
        }

        this.state = {

            visible: true,
            title: props.title,
            message: props.message,
            subView: subView,
            style: props.style

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

        let mainView: any = <View style={"position: 'absolute'; justify-content: 'space-evenly'; align-items: 'center'; top: 20; right: 20; " + this.state.style}>
                                <Text style="font-size: 20px;">{this.state.title}</Text>
                                <Text>{this.state.message}</Text>
                                {(this.state.subView != null ? this.state.subView : null)}
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
