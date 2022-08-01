import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import {  QFileDialog,FileMode,QMainWindow,QWidget,FlexLayout,QLabel,QPushButton } from "@nodegui/nodegui";

export class Reading extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
          Numa: 0,
          Numb: 0,
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

            var Num1 = parseInt(this.state.Numa, 10);
            var Num2 = parseInt(this.state.Numb, 10);
            var Num3 = Num1+Num2;

            const win = new QMainWindow();

            const centralWidget = new QWidget();
            const layout = new FlexLayout();
            centralWidget.setObjectName("container");
            centralWidget.setLayout(layout);

            const label = new QLabel();
            label.setText("The answer is "+Num3+" !");
            const button = new QPushButton();
            button.setText("close");
            button.addEventListener('clicked',(checked)=>win.close());
            layout.addWidget(label);
            layout.addWidget(button);

            win.setCentralWidget(centralWidget);
            win.setMinimumSize(200,0);
            win.show();

            // global.win = win;
          }
        };

        return (
            
            <View style="flex: 1; background-color: 'grey';">

                <Button text = {"Choose text File"} on = {buttonHandler} id={"btn"}/>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                          Numa: textValue.replace(/[^0-9! ]+/g, '')
                        })
                    } }} text={this.state.Numa} />
                </View>

                <View style="flex-direction: row; justify-content: start; align-items: start;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                          Numb: textValue.replace(/[^0-9! ]+/g, '')
                        })
                    } }} text={this.state.Numb} />
                </View>

                <Button text = {"Add('+')"} on = {MainWindow} id={"btn"}/>
                <Text>{this.state.text}</Text>

            </View>
        );
    }
} 

export default Reading;