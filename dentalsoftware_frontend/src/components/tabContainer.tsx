import { View, Button} from "@nodegui/react-nodegui";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import React, { useState } from "react";

function TabContainer(props: any) {

    const buttonHandler = (newView: any) => {
        setValues(
            {
                children: state.children,
                view: newView
            }
        )
    }

    const closeButtonHandler = (index: number) => {
        let tempChildren = state.children;
        tempChildren.splice(index, 1);
        props.names.splice(index, 1)
        setValues({
            children: tempChildren,
            view: tempChildren[0]
        })
    }
    let childrenArray = [];
    if (Object.prototype.toString.call(props.children) != '[object Array]') {
        // If only one child is provided, create an array using that child
        childrenArray = [props.children];
    } else {
        // More then one child provided, already is an array
        childrenArray = props.children;
    }
    // Set state variables
    const [state, setValues] = useState(
        {
            children: childrenArray,
            view: childrenArray[0],
        }
    );

    let tabs: { tabName: string; view: any; }[] = [];
    let tabIndex = 0;
    // Go from state array to local array to access .map
    state.children.forEach(function (value: any) {
        tabs.push(
            {
                tabName: props.names[tabIndex++],
                view: value,
            }
        )
    });
    // Create header with provided tabs
    let header = <View id="header" style="flex: 'flex-shrink'; flex-direction: 'row'; background-color: 'pink'; top: 0px; height: 40px; right: 0px; left: 0px;">
                    {   
                        tabs.map(
                            (value: any, index: number) => {
                                let tabWidth = "flex: auto; flex-grow: 4; height: 40px;";
                                let closeTab = "position: 'absolute'; height: 20px; width: 20px; top: 10px; right: 0px;";
                                return <View style="flex: auto;">
                                    <Button style={tabWidth} text={value.tabName} on={
                                        {
                                            [WidgetEventTypes.MouseButtonRelease]: /*Only trigger when left click is released*/ () => buttonHandler(value.view), 
                                            [WidgetEventTypes.MouseButtonPress]: /*Only trigger when left click is pressed*/ () => console.log("Pressed " + value.tabName)
                                        }
                                    }/>
                                    {tabs.length > 1 ? <Button style={closeTab} text="X" on={
                                        {
                                            [WidgetEventTypes.MouseButtonRelease]: /*Only trigger when left click is released*/ () => closeButtonHandler(index), 
                                            [WidgetEventTypes.MouseButtonPress]: /*Only trigger when left click is pressed*/ () => console.log("Closing " + value.tabName)
                                        }
                                    }/> : null}
                                </View>
                            }
                        )
                    }
                </View>;
    // Display the view
    return (
        <View style="flex: auto; flex-direction: 'column';">
            {header}
            <View style="flex: auto; width: '100%'; height: '100%';">
                {state.view}
            </View>
        </View>
    );
}
// Export the function so it can be accessed elsewhere
export default TabContainer;
