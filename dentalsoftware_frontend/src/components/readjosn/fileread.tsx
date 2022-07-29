import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import {  QFileDialog } from "@nodegui/nodegui";

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
              const selectedFiles = fileDialog.selectedFiles();
              console.log(selectedFiles);

              this.setState({
                text: selectedFiles
              });
            }
        };

        return (
            
            <View style="flex: 1; background-color: 'grey';">

                <Button text = {"Choose text File"} on = {buttonHandler} id={"btn"}/>

                <Text>{this.state.text}</Text>

            </View>
        );
    }
} 

export default Reading;