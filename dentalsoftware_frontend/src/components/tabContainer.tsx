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

    const dragHandler = (value: any, index: number) => {
        // Call App.tsx's createNewWindow function to create a new window with the provided view
        props.createNewWindow(value.view, value.tabName)
        // Remove view from current tabContainer so it doesn't get displayed multiple times by the main App component
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
                                let dragCount  = 0;
                                return <View style="flex: auto;">
                                    <Button style={tabWidth} text={value.tabName} on={
                                        {
                                            // Only trigger when left click is released
                                            [WidgetEventTypes.MouseButtonRelease]: () => buttonHandler(value.view),
                                            // Only trigger when left click is clicked, held and moved for a given time
                                            [WidgetEventTypes.MouseMove]: () => {
                                                console.log("Drag called by: " + value.tabName + "/ " + dragCount)
                                                if (dragCount == 25 && tabs.length > 1) {
                                                    dragHandler(value, index);
                                                }
                                                dragCount++;
                                            }
                                        }
                                    }/>
                                    {tabs.length > 1 ? <Button style={closeTab} text="X" on={
                                        {
                                            [WidgetEventTypes.MouseButtonRelease]: /*Only trigger when left click is released*/ () => closeButtonHandler(index), 
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
