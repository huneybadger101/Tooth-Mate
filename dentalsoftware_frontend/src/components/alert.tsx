import { Text, View, Button } from "@nodegui/react-nodegui";
import { WidgetEventTypes } from "@nodegui/nodegui";
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
        this.props.dismissAlert()
    }

    // Function that returns a component to be drawn, can have children components if the parent component supports it
    render() {

        const dismissButton = <Button id="button" style="border: 1px black;" text="Dismiss" on={
            {
                // Only trigger when left click is released
                [WidgetEventTypes.MouseButtonRelease]: () => this.dismissButtonHandler(),
            }
        }/>

        let mainView: any = <View id="alert" style={this.state.style}>
                                <Text style={"font-weight: 'bold'; font-size: 24px;" + (this.props.titleStyle != undefined ? this.props.titleStyle : "")}>{this.state.title}</Text>
                                <Text style={"font-weight: 'bold'; font-size: 12px;" +(this.props.textStyle != undefined ? this.props.textStyle : "")}>{this.state.message}</Text>
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
