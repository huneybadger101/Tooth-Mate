import { Text, Window, View } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import path from "path";
import Homepage from "./components/homepage";
import Setting from "./components/setting";
import Calendar from "./components/calendar";
import Bookings from "./components/bookings";
import TabContainer from "./components/tabContainer";

const minSize = { width: 1000, height: 520 };
class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    
    let screens = [];
    let names = [];
    let windows = []

    screens.push(<Homepage/>)
    names.push("Homepage")
    screens.push(<Text>Test Screen 1</Text>)
    names.push("Test Screen 1")
    screens.push(<Text>Test Screen 2</Text>)
    names.push("Test Screen 2")
    screens.push(<Text>Test Screen 3</Text>)
    names.push("Test Screen 3")

    windows.push(<Window
        windowTitle="ToothMate Dental Software"
        minSize={minSize}
      >
        <View style={containerStyle}>
          <TabContainer names={names} createNewWindow={this.createNewWindow}>
            {screens}
          </TabContainer>
        </View>
      </Window>
    )

    this.state = {
      windows: windows
    }

  }

  // Reference to this function needs to be passed to each component in order for
  // this App component to allow for new Window components to be created and displayed
  createNewWindow = (view: any, name: string) => {
    let tempWindows = this.state.windows;
    let viewArray = [view]
    let nameArray = [name]
    tempWindows.push(
      <Window
        windowTitle="ToothMate Dental Software TAB 2"
        minSize={minSize}
      >
        <View style={containerStyle}>
          <TabContainer names={nameArray} createNewWindow={this.createNewWindow}>
            {viewArray}
          </TabContainer>
        </View>
      </Window>
    )

    this.setState({
      windows: tempWindows
    })
    
  }


  // Function that returns a component to be drawn, can have children components if the parent component supports it
  render() {

    // Must wrap main App component in a React.Fragment component
    // in order to allow for sub-windows to be created when needed
    return (
      <React.Fragment> 
        {this.state.windows}
      </React.Fragment>
    );
  }
}

const containerStyle = `
  flex: 1; 
`;

export default App;
