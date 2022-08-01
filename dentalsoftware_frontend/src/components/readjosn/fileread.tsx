import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import {  QFileDialog,FileMode,QMainWindow,QWidget } from "@nodegui/nodegui";

export class Reading extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
          text: ''
        }
      }
    render() {
        const buttonHandler = {
            clicked: () => {

              const fileDialog = new QFileDialog();
              fileDialog.setFileMode(FileMode.AnyFile);
              fileDialog.setNameFilter('text (*txt)');
              fileDialog.exec();
              
              const selectedFiles = fileDialog.selectedFiles();
              // const result = fileDialog.accessibleDescription();
              console.log(selectedFiles.map); 
              // console.log(result); 

              this.setState({
                text: selectedFiles
              });
            }
        };

        const MainWindow = {
          clicked: () => {

            const win = new QMainWindow();

            const centralWidget = new QWidget();
            win.setCentralWidget(centralWidget);
            win.setMinimumSize(600,600);
            win.show();

            // global.win = win;
          }
        };

        return (
            
            <View style="flex: 1; background-color: 'grey';">

                <Button text = {"Choose text File"} on = {buttonHandler} id={"btn"}/>
                <Button text = {"open a Window"} on = {MainWindow} id={"btn"}/>
                <Text>{this.state.text}</Text>

            </View>
        );
    }
} 

export default Reading;