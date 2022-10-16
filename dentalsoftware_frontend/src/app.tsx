import { Window, View } from "@nodegui/react-nodegui";
import React from "react";
import TabContainer from "./components/tabContainer";
import Login from "./components/login";
import AccountHelper from "./components/accountHelper";
import { style } from "./styles/style";

var resolution = require("screen-resolution");
var accountHelper = AccountHelper;

const minSize = { width: 1000, height: 760 };
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      windows: null,
      screenWidth: 0,
      screenHeight: 0,
      screenWidthFixed: 0,
      screenHeightFixed: 0,
      style: null
    }
    
    accountHelper.accountName = "";
    accountHelper.accountAccessLevel = 0;
    accountHelper.accountAdmin = false;

    resolution.get(false)
    .then((result: any) => {

      if (this.state.screenWidth == 0)
      {
          this.setState({
            screenWidth: result.width,
            screenHeight: result.height,
            screenWidthFixed: result.width,
            screenHeightFixed: result.height,
            //style: style(result.width, result.height, result.width, result.height)
          });

          this.setState({
            style: style(
              this.state.screenWidth, 
              this.state.screenHeight, 
              this.state.screenWidthFixed, 
              this.state.screenHeightFixed
              )
          });
          
      }

      let screens = [];
      let names = [];
      let windows = [];

      screens.push(<Login accountHelper={accountHelper}/>)
      names.push("Login")

      const maxSize = {width: result.width - 50, height: result.height - 50}
      windows.push(<Window
        windowTitle="ToothMate Dental Software"
        minSize={minSize}
        size={maxSize}
        styleSheet={this.state.style}
        >
          <View style={containerStyle}>
              <TabContainer names={names} updateResolution={this.updateCurrentResolution} createNewWindow={this.createNewWindow} createNewBlankWindow={this.createNewBlankWindow} accountHelper={accountHelper}>
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

  updateCurrentResolution = (width:number, height:number) => {
    this.setState({
      screenWidth: width,
      screenHeight: height,
      style: style(width, height, this.state.screenWidthFixed, this.state.screenHeightFixed)
    })

    for (let i = 0; i < this.state.windows.length; i++) {
      let tempWindow = <Window
      windowTitle="ToothMate Dental Software"
      minSize={minSize}
      styleSheet={style(width, height, this.state.screenWidthFixed, this.state.screenHeightFixed)}
      >
        {this.state.windows[i].props.children}
      </Window>
      this.state.windows[i] = tempWindow;
    }
    this.setState(this.state)
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
        styleSheet={this.state.style}
      >
        <View style={containerStyle}>
          <TabContainer names={nameArray} updateResolution={this.updateCurrentResolution} createNewWindow={this.createNewWindow} createNewBlankWindow={this.createNewBlankWindow} accountHelper={accountHelper}>
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
        styleSheet={this.state.style}
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
