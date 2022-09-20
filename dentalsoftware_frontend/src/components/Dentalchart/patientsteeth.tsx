import { Text, View, Button } from "@nodegui/react-nodegui";
import { QMainWindow,QWidget,FlexLayout,QLabel,QPushButton } from "@nodegui/nodegui";
import React from "react";

export class Dentalchart extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
        patientname:"Sam",patientage:"--",patientToothHistory:[],

        color1:0,color2:0,color3:0,color4:0,color5:0,color6:0,color7:0,color8:0,color9:0,color10:0,
        color11:0,color12:0,color13:0,color14:0,color15:0,color16:0,color17:0,color18:0,color19:0,color20:0,
        color21:0,color22:0,color23:0,color24:0,color25:0,color26:0,color27:0,color28:0,color29:0,color30:0,
        color31:0,color32:0,

        status1:false,status2:false,status3:false,status4:false,status5:false,status6:false,status7:false,status8:false,status9:false,status10:false,
        status11:false,status12:false,status13:false,status14:false,status15:false,status16:false,status17:false,status18:false,status19:false,status20:false,
        status21:false,status22:false,status23:false,status24:false,status25:false,status26:false,status27:false,status28:false,status29:false,status30:false,
        status31:false,status32:false,
    }
  }

    render() {

        var calendar1:any = [];
        var calendar2:any = [];

        for (var i = 1; i <= 16; i++) {

          let buttonName_0 = (i).toString();
            calendar1.push( 
              <View style="border: 1px solid black; height: 50px; width: 50px;">
                <Button text={ buttonName_0 } style={((this.state.color1==parseInt(buttonName_0)&&this.state.status1)
                ||(this.state.color2==parseInt(buttonName_0)&&this.state.status2)
                ||(this.state.color3==parseInt(buttonName_0)&&this.state.status3)
                ||(this.state.color4==parseInt(buttonName_0)&&this.state.status4)
                ||(this.state.color5==parseInt(buttonName_0)&&this.state.status5)
                ||(this.state.color6==parseInt(buttonName_0)&&this.state.status6)
                ||(this.state.color7==parseInt(buttonName_0)&&this.state.status7)
                ||(this.state.color8==parseInt(buttonName_0)&&this.state.status8)
                ||(this.state.color9==parseInt(buttonName_0)&&this.state.status9)
                ||(this.state.color10==parseInt(buttonName_0)&&this.state.status10)
                ||(this.state.color11==parseInt(buttonName_0)&&this.state.status11)
                ||(this.state.color12==parseInt(buttonName_0)&&this.state.status12)
                ||(this.state.color13==parseInt(buttonName_0)&&this.state.status13)
                ||(this.state.color14==parseInt(buttonName_0)&&this.state.status14)
                ||(this.state.color15==parseInt(buttonName_0)&&this.state.status15)
                ||(this.state.color16==parseInt(buttonName_0)&&this.state.status16))
                ?"height: 50px; width: 50px;background: 'grey';":"height: 50px; width: 50px;"}  on={{clicked: () => {
                if (parseInt(buttonName_0) == 1){
                    this.setState({status1: !this.state.status1,color1:1})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right 3rd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status1: !this.state.status1,color1:1}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 2){
                    this.setState({status2: !this.state.status2,color2:2})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right 2nd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status2: !this.state.status2,color2:2}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 3){
                    this.setState({status3: !this.state.status3,color3:3})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right 1st Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status3: !this.state.status3,color3:3}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 4){
                    this.setState({status4: !this.state.status4,color4:4})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right 2nd Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status4: !this.state.status4,color4:4}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 5){
                    this.setState({status5: !this.state.status5,color5:5})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right 1st Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status5: !this.state.status5,color5:5}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 6){
                    this.setState({status6: !this.state.status6,color6:6})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right Cuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status6: !this.state.status6,color6:6}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 7){
                    this.setState({status7: !this.state.status7,color7:7})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right Lateral Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status7: !this.state.status7,color7:7}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 8){
                    this.setState({status8: !this.state.status8,color8:8})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Right Central Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status8: !this.state.status8,color8:8}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 9){
                    this.setState({status9: !this.state.status9,color9:9})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left Central Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status9: !this.state.status9,color9:9}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 10){
                    this.setState({status10: !this.state.status10,color10:10})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left Lateral Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status10: !this.state.status10,color10:10}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 11){
                    this.setState({status11: !this.state.status11,color11:11})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left Cuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status11: !this.state.status11,color11:11}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 12){
                    this.setState({status12: !this.state.status12,color12:12})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left 1st Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status12: !this.state.status12,color12:12}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 13){
                    this.setState({status13: !this.state.status13,color13:13})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left 2nd Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status13: !this.state.status13,color13:13}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 14){
                    this.setState({status14: !this.state.status14,color14:14})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left 1st Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status14: !this.state.status14,color14:14}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 15){
                    this.setState({status15: !this.state.status15,color15:15})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left 2nd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status15: !this.state.status15,color15:15}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_0) == 16){
                    this.setState({status16: !this.state.status16,color16:16})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_0);
                    label4.setText("Tooth Name: Upper Left 3rd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status16: !this.state.status16,color16:16}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                
          }}} />
              </View>
              )
        }
        for (var i = 32; i >= 17; i--) {  
          let buttonName_1 = (i).toString();
          calendar2.push( 
            <View style="border: 1px solid black; height: 50px; width: 50px;">
                <Button text={ buttonName_1 } style={((this.state.color17==parseInt(buttonName_1)&&this.state.status17)
                ||(this.state.color18==parseInt(buttonName_1)&&this.state.status18)
                ||(this.state.color19==parseInt(buttonName_1)&&this.state.status19)
                ||(this.state.color20==parseInt(buttonName_1)&&this.state.status20)
                ||(this.state.color21==parseInt(buttonName_1)&&this.state.status21)
                ||(this.state.color22==parseInt(buttonName_1)&&this.state.status22)
                ||(this.state.color23==parseInt(buttonName_1)&&this.state.status23)
                ||(this.state.color24==parseInt(buttonName_1)&&this.state.status24)
                ||(this.state.color25==parseInt(buttonName_1)&&this.state.status25)
                ||(this.state.color26==parseInt(buttonName_1)&&this.state.status26)
                ||(this.state.color27==parseInt(buttonName_1)&&this.state.status27)
                ||(this.state.color28==parseInt(buttonName_1)&&this.state.status28)
                ||(this.state.color29==parseInt(buttonName_1)&&this.state.status29)
                ||(this.state.color30==parseInt(buttonName_1)&&this.state.status30)
                ||(this.state.color31==parseInt(buttonName_1)&&this.state.status31)
                ||(this.state.color32==parseInt(buttonName_1)&&this.state.status32))
                ?"height: 50px; width: 50px;background: 'grey';":"height: 50px; width: 50px;"} on={{clicked: () => {
                if (parseInt(buttonName_1) == 17){
                    this.setState({status17: !this.state.status17,color17:17})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left 3rd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status17: !this.state.status17,color17:17}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 18){
                    this.setState({status18: !this.state.status18,color18:18})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left 2nd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status18: !this.state.status18,color18:18}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 19){
                    this.setState({status19: !this.state.status19,color19:19})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left 1st Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status19: !this.state.status19,color19:19}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 20){
                    this.setState({status20: !this.state.status20,color20:20})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left 2nd Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status20: !this.state.status20,color20:20}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 21){
                    this.setState({status21: !this.state.status21,color21:21})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left 1st Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status21: !this.state.status21,color21:21}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 22){
                    this.setState({status22: !this.state.status22,color22:22})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left Cuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status22: !this.state.status22,color22:22}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 23){
                    this.setState({status23: !this.state.status23,color23:23})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left Lateral Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status23: !this.state.status23,color23:23}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 24){
                    this.setState({status24: !this.state.status24,color24:24})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Left Central Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status24: !this.state.status24,color24:24}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 25){
                    this.setState({status25: !this.state.status25,color25:25})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right Central Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status25: !this.state.status25,color25:25}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 26){
                    this.setState({status26: !this.state.status26,color26:26})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right Lateral Incisor");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status26: !this.state.status26,color26:26}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 27){
                    this.setState({status27: !this.state.status27,color27:27})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right Cuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status27: !this.state.status27,color27:27}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 28){
                    this.setState({status28: !this.state.status28,color28:28})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right 1st Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status28: !this.state.status28,color28:28}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 29){
                    this.setState({status29: !this.state.status29,color29:29})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right 2nd Bicuspid");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status29: !this.state.status29,color29:29}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 30){
                    this.setState({status30: !this.state.status30,color30:30})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right 1st Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status30: !this.state.status30,color30:30}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 31){
                    this.setState({status31: !this.state.status31,color31:31})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right 2nd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status31: !this.state.status31,color31:31}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
                else if(parseInt(buttonName_1) == 32){
                    this.setState({status32: !this.state.status32,color32:32})
                    const win = new QMainWindow();const centralWidget = new QWidget();const layout = new FlexLayout();centralWidget.setObjectName("container");centralWidget.setLayout(layout);
                    const label1 = new QLabel();const label2 = new QLabel();const label3 = new QLabel();const label4 = new QLabel();const label5 = new QLabel();const label6 = new QLabel();
                    label1.setText("Patient Name: "+this.state.patientname);
                    label2.setText("Patient Age: "+this.state.patientage);
                    label3.setText("Tooth Number: "+buttonName_1);
                    label4.setText("Tooth Name: Lower Right 3rd Molar");
                    label5.setText("Tooth History: ");
                    label6.setText(this.state.patientToothHistory);
                    const button = new QPushButton();button.setText("close");
                    button.addEventListener('clicked',(checked)=>win.close());
                    button.addEventListener('clicked',(checked)=>this.setState({status32: !this.state.status32,color32:32}));
                    layout.addWidget(label1);layout.addWidget(label2);layout.addWidget(label3);layout.addWidget(label4);layout.addWidget(label5);layout.addWidget(label6);
                    layout.addWidget(button);win.setCentralWidget(centralWidget);win.setMinimumSize(1000,1000);win.show();}
          }}} />
            </View>
          )
        }
        const containerStyle = `
            
            background: 'white';
        `;
        return (

          <View>
              <View style={containerStyle}>
                <Text>{this.state.patientname}</Text>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar1}
                </View>
                <View style="flex: 0; flex-direction: 'row';">
                    {calendar2}
                </View>
              </View>
            </View>
        );
    }
} 

export default Dentalchart;