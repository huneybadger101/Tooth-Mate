import { Window, View } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon, QScreen } from "@nodegui/nodegui";
import path from "path";
import TabContainer from "./components/tabContainer";
import Login from "./components/login";
import Calendar from "./components/calendar";
import Homepage from "./components/homepage";
import AccountHelper from "./components/accountHelper";

var resolution = require("screen-resolution");
var accountHelper = AccountHelper;

const minSize = { width: 1000, height: 760 };
class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      windows: null
    }
    
    accountHelper.accountName = "";
    accountHelper.accountAccessLevel = 0;
    accountHelper.accountAdmin = false;

    resolution.get(false)
    .then((result: any) => {

      let screens = [];
      let names = [];
      let windows = [];

      screens.push(<Login accountHelper={accountHelper}/>)
      names.push("Login")

      const maxSize = {width: result.width, height: result.height}
      windows.push(<Window
        windowTitle="ToothMate Dental Software"
        minSize={minSize}
        size={maxSize}
        >
          <View style={containerStyle}>
              <TabContainer names={names} createNewWindow={this.createNewWindow} createNewBlankWindow={this.createNewBlankWindow} accountHelper={accountHelper}>
                {screens}
              </TabContainer>
            </View>
          </Window>
      )

      this.setState({
        windows: windows
      })
    })

  }

  // Reference to this function needs to be passed to each component in order for
  // this App component to allow for new Window components to be created and displayed
  createNewWindow = (view: any, name: string) => {
    let tempWindows = this.state.windows;
    let viewArray = [view]
    let nameArray = [name]
    tempWindows.push(
      <Window
        windowTitle="ToothMate Dental Software"
        minSize={minSize}
      >
        <View style={containerStyle}>
          <TabContainer names={nameArray} createNewWindow={this.createNewWindow} createNewBlankWindow={this.createNewBlankWindow} accountHelper={accountHelper}>
            {viewArray}
          </TabContainer>
        </View>
      </Window>
    )

    this.setState({
      windows: tempWindows
    })
    
  }

  createNewBlankWindow = (view: any) => {
    let tempWindows = this.state.windows;
    tempWindows.push(
      <Window
        windowTitle="ToothMate Dental Software"
        minSize={minSize}
      >
        <View style={containerStyle}>
            {view}
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
