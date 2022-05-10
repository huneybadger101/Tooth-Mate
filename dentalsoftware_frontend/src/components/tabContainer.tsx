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
        childrenArray = [props.children];
    } else {
        childrenArray = props.children;
    }
    const [state, setValues] = useState({
        children: childrenArray,
        view: childrenArray[0],
    });

    var tabs: { tabName: string; view: any; }[] = [];
    var tabIndex = 0;
    state.children.forEach(function (value: any) {
        tabs.push({
            tabName: "TAB" + tabIndex++,
            view: value,
        })
    });

    var header = <View id="header" style="flex: 1; flex-direction: 'row'; justify-content: 'center'; align-items: 'center'; background-color: 'pink'; position: 'absolute'; top: 0px; height: 60px; right: 0px; left: 0px;">
                    {tabs.map((value: any) => {
                        // Eventually style these to be proper tabs, buttons are fine for now
                        return <Button text={value.tabName} on={{[WidgetEventTypes.MouseButtonRelease]: /*Only trigger when left click is released*/ () => buttonHandler(value.view)}}/>
                    })}
                </View>;
    
    return (
        <View style="flex: 1; flex-direction: 'column'; justify-content: 'center'; align-items: 'center'; background-color: 'clear';">
            {header}
            <View style="width: '100%'; margin-top: 120px; height: '100%';">
                {state.view}
            </View>
        </View>
    );
}

export default TabContainer;
