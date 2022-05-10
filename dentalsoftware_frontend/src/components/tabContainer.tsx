import { View, Button} from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React, { useState } from "react";

function TabContainer(props: any) {

    const buttonHandler = (newView: any) => {
        setValues({
            children: state.children,
            view: newView,
        })
    }
    var childrenArray = [];
    if (Object.prototype.toString.call(props.children) != '[object Array]') {
        // If only one child is provided, create an array using that child
        childrenArray = [props.children];
    } else {
        // More then one child provided, already is an array
        childrenArray = props.children;
    }
    // Set state variables
    const [state, setValues] = useState({
        children: childrenArray,
        view: childrenArray[0],
    });

    var tabs: { tabName: string; view: any; }[] = [];
    var tabIndex = 0;
    // Go from state array to local array to access .map
    state.children.forEach(function (value: any) {
        tabs.push({
            tabName: "TAB" + tabIndex++,
            view: value,
        })
    });
    // Create header with provided tabs
    var header = <View id="header" style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center'; background-color: 'pink'; position: 'absolute'; top: 0px; height: 60px; right: 0px; left: 0px;">
                    {tabs.map((value: any) => {
                        // Eventually style these to be proper tabs, buttons are fine for now
                        return <Button text={value.tabName} on={{[WidgetEventTypes.MouseButtonRelease]: /*Only trigger when left click is released*/ () => buttonHandler(value.view), [WidgetEventTypes.MouseButtonPress]: /*Only trigger when left click is pressed*/ () => console.log("Pressed " + value.tabName)}}/>
                    })}
                </View>;
    // Display the view
    return (
        <View style="flex: 1; flex-direction: 'column'; justify-content: 'center'; align-items: 'center'; background-color: 'clear';">
            {header}
            <View style="width: '100%'; margin-top: 120px; height: '100%';">
                {state.view}
            </View>
        </View>
    );
}
// Export the function so it can be accessed elsewhere
export default TabContainer;
