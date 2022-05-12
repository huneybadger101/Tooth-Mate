import { Text, Window, hot, View } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import path from "path";
import Homepage from "./components/homepage";
import Calendar from "./components/calendar";
import Bookings from "./components/bookings";

const minSize = { width: 1000, height: 520 };
class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentScreen: <Calendar/>,
    }
  }
  // Reference to this function needs to be passed to each component in order for
  // this App component to display sub-components
  updateCurrentScreenComponent(newView: React.Component) {
    this.setState({
      currentScreen: newView,
    })
  }

  // Function that returns a component to be drawn, can have children components if the parent component supports it
  render() {

    // Must wrap main App component in a React.Fragment component
    // in order to allow for sub-windows to be created later on
    return (
      <React.Fragment> 
        <Window
          windowTitle="ToothMate Dental Software"
          minSize={minSize}
        >
          <View style={containerStyle}>
            {this.state.currentScreen}
          </View>
          
        </Window>
      </React.Fragment>
    );
  }
}

const containerStyle = `
  flex: 1; 
`;

export default hot(App);
