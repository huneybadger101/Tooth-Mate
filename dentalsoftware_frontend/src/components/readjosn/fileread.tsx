import { Text, View, Button, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import {  QFileDialog,FileMode,QMainWindow,QWidget,FlexLayout,QLabel,QPushButton,QScrollArea } from "@nodegui/nodegui";

export class Reading extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
          Numa: 0,
          Numb: 0,
          text: '',
          path:''
        }
      }
    render() {
        const buttonHandler = {
            clicked: () => {

              const fileDialog = new QFileDialog();
              fileDialog.setFileMode(FileMode.AnyFile);
              fileDialog.setNameFilter('text (*txt *.tsx)');
              fileDialog.exec();
              const fs = require('fs');
              const selectedFiles = fileDialog.selectedFiles();

              const win = new QMainWindow();
              // const centralWidget = new QWidget();
              const scrollArea = new QScrollArea();
              scrollArea.setInlineStyle("flex: 1; width:'100%';");
              const layout = new FlexLayout();
              scrollArea.setObjectName("container");
              scrollArea.setLayout(layout);
              // scrollArea.setWidget(centralWidget);
              const label = new QLabel();
              // label.setText("The answer is !");
              const button = new QPushButton();
              button.setText("close");
              button.addEventListener('clicked',(checked)=>win.close());
              layout.addWidget(button);
              layout.addWidget(label);
              win.setCentralWidget(scrollArea);
              win.setMinimumSize(1000,1000);
              win.show();

              selectedFiles.map((file)=>{
                let rawdata = fs.readFileSync(file);
                console.log(rawdata.toString('utf8'));
                
                this.setState({
                  path:selectedFiles,
                  text: rawdata.toString('utf8')
                });

                label.setText(rawdata.toString('utf8'));
              })
              // const result = fileDialog.accessibleDescription();
              // console.log(fileDialog); 
              // console.log(result); 

              // this.setState({
              //   text: selectedFiles
              // });
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

                <View style="flex-direction: row;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                          Numa: textValue.replace(/[^0-9! ]+/g, '')
                        })
                    } }} text={this.state.Numa} />
                </View>

                <View style="flex-direction: row;">
                    <LineEdit on={{ textChanged: (textValue) => {
                        this.setState({
                          Numb: textValue.replace(/[^0-9! ]+/g, '')
                        })
                    } }} text={this.state.Numb} />
                </View>

                <Button text = {"Add('+')"} on = {MainWindow} id={"btn"}/>
                <Text>path:{this.state.path}</Text>
                <Text>content:</Text>
                <Text style="height: 400%;">{this.state.text}</Text>
                <Text>end</Text>

            </View>
        );
    }
} 

export default Reading;