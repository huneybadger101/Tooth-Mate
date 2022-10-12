import { View, Button, useEventHandler} from "@nodegui/react-nodegui";
import { WidgetEventTypes, QResizeEvent } from "@nodegui/nodegui";
import React, { useState } from "react";
import TimeStamp from "./timestamp";
import Homepage from "./homepage";

function TabContainer(props: any) {

    const resizeChecker = useEventHandler<any>(
        {
            [WidgetEventTypes.Resize]: (event: any) => {
                const resizeEvent = new QResizeEvent(event)
                props.updateResolution(resizeEvent.size().width(), resizeEvent.size().height())
          }
        },
        []
      );

    let lastDraggedView: any;

    const buttonHandler = (newView: any) => {
        if (newView != lastDraggedView) {
            setValues(
                {
                    children: state.children,
                    view: newView,
                    names: state.names
                }
            )
        } else {
            console.log("Bug averted! The app decided to try set the current view to the one that you just dragged out into it's own window! Aren't you glad I spent 2 hours figuring out this bug?")
            lastDraggedView = undefined
        }
    }

    const AddExtraProps = (Component: JSX.Element, extraProps: any) =>  {
        return <Component.type {...Component.props} {...extraProps} />;
    }

    const createHomepageAfterLogin = () => {
        let homepageView = <Homepage newTab={createNewtab} accountHelper={props.accountHelper}/>;
        setValues({
            children: [homepageView],
            view: homepageView,
            names: ["Homepage"]
        })
    }

    const createNewtab = (component: JSX.Element, name: string) => {
        let tempChildren = state.children;
        let tempNames = state.names;
        component = AddExtraProps(component, {newTab: createNewtab, postLogin: createHomepageAfterLogin, accountHelper: props.accountHelper});
        tempChildren.push(component)
        tempNames.push(name)
        setValues({
            children: tempChildren,
            view: component,
            names: tempNames
        })
    }

    const closeButtonHandler = (index: number) => {
        let tempChildren = state.children;
        tempChildren.splice(index, 1);
        let tempNames = state.names;
        tempNames.splice(index, 1);
        setValues({
            children: tempChildren,
            view: tempChildren[0],
            names: tempNames
        })
    }

    function dragHandler(value: any, index: number) {

        let currentTime = new Date().getTime();

        if (TimeStamp.timeStamp == undefined) {
            TimeStamp.timeStamp = new Date().getTime();
        } else {
            if (currentTime - TimeStamp.timeStamp < 1000) {
                return;
            }
            TimeStamp.timeStamp = new Date().getTime();
        }

        // Remove view from current tabContainer so it doesn't get displayed multiple times by the main App component
        let tempChildren = state.children;
        let tempNames = state.names;
        tempChildren.splice(index, 1);
        tempNames.splice(index, 1)
        setValues({
            children: tempChildren,
            view: tempChildren[0],
            names: tempNames
        })

        // Call App.tsx's createNewWindow function to create a new window with the provided view
        props.createNewWindow(value.view, value.tabName)
        lastDraggedView = value.view;
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
            names: props.names
        }
    );

    let tabs: { tabName: string; view: any; }[] = [];
    let tabIndex = 0;
    // Go from state array to local array to access .map
    state.children.forEach(function (value: any) {
        tabs.push(
            {
                tabName: state.names[tabIndex++],
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
                                let dragCount = 0;
                                return <View style="flex: auto;">
                                    <Button style={tabWidth} text={value.tabName} on={
                                        {
                                            // Only trigger when left click is released
                                            [WidgetEventTypes.MouseButtonRelease]: () => buttonHandler(value.view),
                                            // Only trigger when left click is clicked, held and moved for a given time
                                            [WidgetEventTypes.MouseMove]: () => {
                                                if (dragCount == 25 && tabs.length > 1) {
                                                    dragHandler(value, index);
                                                }
                                                dragCount++;
                                            }
                                        }
                                    }/>
                                    {tabs.length > 1 && value.tabName != "Homepage" ? <Button style={closeTab} text="X" on={
                                        {
                                            // Only trigger when left click is released
                                            [WidgetEventTypes.MouseButtonRelease]: () => closeButtonHandler(index), 
                                        }
                                    }/> : null}
                                </View>
                            }
                        )
                    }
                </View>;
    // Display the view
    return (
        <View on={resizeChecker} style="flex: auto; flex-direction: 'column';">
            {header}
            <View style="flex: auto; width: '100%'; height: '100%';">
                {AddExtraProps(state.view, {newTab: createNewtab, postLogin: createHomepageAfterLogin})}
            </View>
        </View>
    );
}
// Export the function so it can be accessed elsewhere
export default TabContainer;
