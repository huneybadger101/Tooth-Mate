import { Text, View, Button, ComboBox, LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import {  WidgetEventTypes } from "@nodegui/nodegui";
import { disableDentalChartButton } from "./Calendarhelpers/calendarDayButtonDisable";
import { treatmentList, treatmentListPrices, treatmentListTimes, treatmentListTreatments, toothComboBox } from "./Calendarhelpers/comboBoxVariables";
import DentalChartIniniteLoopFix from "./Calendarhelpers/loopPreventer";


export class ToothCreator extends React.Component<any, any> {


    //Sets up several state based variables to use throughout the .tsx file
    constructor(props: any) {
        super(props);

        this.state = {
            buttonOne: "height: 100px; width: 100px;",
            buttonTwo: "height: 100px; width: 100px;",
            buttonThree: "height: 100px; width: 100px;",
            buttonFour: "height: 100px; width: 100px;",
            buttonFive: "height: 100px; width: 100px;",
            buttonSix: "height: 100px; width: 100px;",
            buttonSeven: "height: 100px; width: 100px;",
            buttonEight: "height: 100px; width: 100px;",
            buttonNine: "height: 100px; width: 100px;",   
            
            dentalChartDataHolderOne: [],
            dentalChartDataHolderTwo: [],
            dentalChartDataHolderThree: [],
            dentalChartDataHolderFour: [],
            dentalChartDataHolderFive: [],
            dentalChartDataHolderSix: [],
            dentalChartDataHolderSeven: [],
            dentalChartDataHolderEight: [],
            dentalChartDataHolderNine: [],
            totalCharts: 1,
            currentlySelectedChart: 0,
            procedure: [],
            procedureCopy: [],
            procedurePrice: [],
            procedureTime: [],
            patientNotes: [],
            preventTotalReload: false,

            procedurePrinted: "Initial examination",
            procedureTimePrinted: treatmentListTimes(0),
            procedurePricePrinted: treatmentListPrices(0),
            procedureTimeStored: [],
            procedureCostStored: [],
            
            currentlySelectedProcedureIndex: [],
            currentlySelectedToothIndex: [],
        }

        if (DentalChartIniniteLoopFix.alreadyRun == undefined) {
            DentalChartIniniteLoopFix.alreadyRun = 4;
        }
    }

    setStateWithDataViaRef = (data:any) => {

        let existingData = data;

        this.resetStateViaRef();

        if (existingData.length != 0) {

            let buttonData:any = [];

            for (let k = 0; k < 9; k++) 
            {

                let data:any = [];

                for (let i = 0; i < existingData['NumTeeth']; i++) {
                    data.push((existingData['Teeth'][i][k] ? "height: 100px; width: 100px; background: 'Grey';" : "height: 100px; width: 100px;"))
                }
                buttonData.push(data)
            }
            
            this.setState({
                buttonOne: buttonData[0][0],
                buttonTwo: buttonData[1][0],
                buttonThree: buttonData[2][0],
                buttonFour: buttonData[3][0],
                buttonFive: buttonData[4][0],
                buttonSix: buttonData[5][0],
                buttonSeven: buttonData[6][0],
                buttonEight: buttonData[7][0],
                buttonNine: buttonData[8][0],
                
                dentalChartDataHolderOne: buttonData[0],
                dentalChartDataHolderTwo: buttonData[1],
                dentalChartDataHolderThree: buttonData[2],
                dentalChartDataHolderFour: buttonData[3],
                dentalChartDataHolderFive: buttonData[4],
                dentalChartDataHolderSix: buttonData[5],
                dentalChartDataHolderSeven: buttonData[6],
                dentalChartDataHolderEight: buttonData[7],
                dentalChartDataHolderNine: buttonData[8],
    
                totalCharts: existingData['NumTeeth'],
                currentlySelectedChart: 0,
                procedure: existingData['Procedures'],
                procedureCopy: [],
                procedurePrice: existingData['ProcedureCosts'],
                procedureTime: existingData['ProcedureTimes'],
                patientNotes: existingData['Notes'],
                preventTotalReload: false,
    
                procedurePrinted: "Initial examination",
                procedureTimePrinted: treatmentListTimes(0),
                procedurePricePrinted: treatmentListPrices(0),
                procedureTimeStored: [],
                procedureCostStored: [],
                
                currentlySelectedProcedureIndex: [],
                currentlySelectedToothIndex: [],
            })
        }
    }

    resetStateViaRef = () => {
        this.setState({
            buttonOne: "height: 100px; width: 100px;",
            buttonTwo: "height: 100px; width: 100px;",
            buttonThree: "height: 100px; width: 100px;",
            buttonFour: "height: 100px; width: 100px;",
            buttonFive: "height: 100px; width: 100px;",
            buttonSix: "height: 100px; width: 100px;",
            buttonSeven: "height: 100px; width: 100px;",
            buttonEight: "height: 100px; width: 100px;",
            buttonNine: "height: 100px; width: 100px;",   
            
            dentalChartDataHolderOne: [],
            dentalChartDataHolderTwo: [],
            dentalChartDataHolderThree: [],
            dentalChartDataHolderFour: [],
            dentalChartDataHolderFive: [],
            dentalChartDataHolderSix: [],
            dentalChartDataHolderSeven: [],
            dentalChartDataHolderEight: [],
            dentalChartDataHolderNine: [],
            totalCharts: 1,
            currentlySelectedChart: 0,
            procedure: [],
            procedureCopy: [],
            procedurePrice: [],
            procedureTime: [],
            patientNotes: [],
            preventTotalReload: false,

            procedurePrinted: "Initial examination",
            procedureTimePrinted: treatmentListTimes(0),
            procedurePricePrinted: treatmentListPrices(0),
            procedureTimeStored: [],
            procedureCostStored: [],
            
            currentlySelectedProcedureIndex: [],
            currentlySelectedToothIndex: [],
        })
    }

    updateViaRef = () => {
        this.resetStateViaRef();
    }

    passbackTeeth = (index:number) => {
        let teeth = []
        for (let k = 0; k < this.state.dentalChartDataHolderOne.length; k++) {
            teeth.push([
                (this.state.dentalChartDataHolderOne[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderTwo[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderThree[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderFour[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderFive[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderSix[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderSeven[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderEight[k].includes("Grey") ? true : false),
                (this.state.dentalChartDataHolderNine[k].includes("Grey") ? true : false)
            ])
        }
        let teethNames = [];
        for (let i = 0; i < this.state.currentlySelectedToothIndex.length; i++) {
            let selTooth = this.state.currentlySelectedToothIndex[i];
            if (selTooth == -1) {
                selTooth = 0;
                this.state.currentlySelectedToothIndex[i] = selTooth;
            }
            teethNames.push(toothComboBox()[selTooth].text)
        }
        let data = {
            NumTeeth: this.state.totalCharts,
            Index: this.props.getVisitIndex(),
            Teeth: teeth,
            TeethNames: teethNames,
            TeethIndexes: this.state.currentlySelectedToothIndex,
            Procedures: this.state.procedure,
            ProcedureTimes: this.state.procedureTimeStored,
            ProcedureCosts: this.state.procedureCostStored,
            Notes: this.state.patientNotes
        }

        this.props.passbackTeeth(data)
    }

    render() {

        //Will hold the button rows
        var buttonRowOne:any = [];
        var buttonRowTwo:any = [];
        var buttonRowThree:any = [];

        //Will set the array up to fill '0' to ensure buttons stay as the style they are meant to
        //Note that several setState function will set 'preventTotalReload' to true to prevent this to replay
        if (this.state.preventTotalReload == false)
        {
            this.state.dentalChartDataHolderOne[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderTwo[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderThree[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderFour[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderFive[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderSix[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderSeven[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderEight[0] = "height: 100px; width: 100px;";
            this.state.dentalChartDataHolderNine[0] = "height: 100px; width: 100px;";
            this.state.currentlySelectedProcedureIndex[0] = 0;
            this.state.currentlySelectedToothIndex[0] = 1;

            this.state.procedureCostStored[0] = treatmentListPrices(0);
            this.state.procedureTimeStored[0] = treatmentListTimes(0);
        }

        //Handles adding a dental chart
        const dentalChartAddHandler = {
            clicked: () =>{


                //Has the index for the total chart count increase by one
                this.setState({
                    totalCharts: this.state.totalCharts + 1,
                    preventTotalReload: true,
                    currentlySelectedChart: this.state.totalCharts,
                });
                //Uses the new chart index to increase the chart arrays and store the default button style in them
                this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";
                this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart] = "height: 100px; width: 100px;";

                this.setState({
                    buttonOne: this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart],
                    buttonTwo: this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart],
                    buttonThree: this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart],
                    buttonFour: this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart],
                    buttonFive: this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart],
                    buttonSix: this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart],
                    buttonSeven: this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart],
                    buttonEight: this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart],
                    buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart],

                    procedurePricePrinted: this.state.procedureCostStored[this.state.currentlySelectedChart],
                    procedureTimePrinted: this.state.procedureTimeStored[this.state.currentlySelectedChart],
                });

                this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart] = 0;
                this.state.currentlySelectedToothIndex[this.state.currentlySelectedChart] = 1;

                this.state.procedureCostStored[this.state.currentlySelectedChart] = treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]);
                this.state.procedureTimeStored[this.state.currentlySelectedChart] = treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]);

                this.passbackTeeth(this.state.currentlySelectedChart)
            }
        }

        //Handles removing a dental chart`
        const dentalChartRemoveHandler = {
            clicked: () =>{

                this.setState({
                    preventTotalReload: true
                })

                if (this.state.totalCharts > 0)
                {
                    if (this.state.currentlySelectedChart + 1 == this.state.totalCharts) {
                            this.state.dentalChartDataHolderOne[num] = null;
                            this.state.dentalChartDataHolderTwo[num] = null;
                            this.state.dentalChartDataHolderThree[num] = null;
                            this.state.dentalChartDataHolderFour[num] = null;
                            this.state.dentalChartDataHolderFive[num] = null;
                            this.state.dentalChartDataHolderSix[num] = null;
                            this.state.dentalChartDataHolderSeven[num] = null;
                            this.state.dentalChartDataHolderEight[num] = null;
                            this.state.dentalChartDataHolderNine[num] = null;
    
                            this.state.currentlySelectedProcedureIndex[num] = null;
                            this.state.currentlySelectedToothIndex[num] = null;
                    } else {
                        for (var num = this.state.currentlySelectedChart; num < this.state.totalCharts; num++)
                        {
                            this.state.dentalChartDataHolderOne[num] = this.state.dentalChartDataHolderOne[num + 1];
                            this.state.dentalChartDataHolderTwo[num] = this.state.dentalChartDataHolderTwo[num + 1];
                            this.state.dentalChartDataHolderThree[num] = this.state.dentalChartDataHolderThree[num + 1];
                            this.state.dentalChartDataHolderFour[num] = this.state.dentalChartDataHolderFour[num + 1];
                            this.state.dentalChartDataHolderFive[num] = this.state.dentalChartDataHolderFive[num + 1];
                            this.state.dentalChartDataHolderSix[num] = this.state.dentalChartDataHolderSix[num + 1];
                            this.state.dentalChartDataHolderSeven[num] = this.state.dentalChartDataHolderSeven[num + 1];
                            this.state.dentalChartDataHolderEight[num] = this.state.dentalChartDataHolderEight[num + 1];
                            this.state.dentalChartDataHolderNine[num] = this.state.dentalChartDataHolderNine[num + 1];
    
                            this.state.currentlySelectedProcedureIndex[num] = this.state.currentlySelectedProcedureIndex[num + 1];
                            this.state.currentlySelectedToothIndex[num] = this.state.currentlySelectedToothIndex[num + 1];
                        }
                    }

                    //Changes the tooth back to the first index
                    this.setState({
                        buttonOne: this.state.dentalChartDataHolderOne[0],
                        buttonTwo: this.state.dentalChartDataHolderTwo[0],
                        buttonThree: this.state.dentalChartDataHolderThree[0],
                        buttonFour: this.state.dentalChartDataHolderFour[0],
                        buttonFive: this.state.dentalChartDataHolderFive[0],
                        buttonSix: this.state.dentalChartDataHolderSix[0],
                        buttonSeven: this.state.dentalChartDataHolderSeven[0],
                        buttonEight: this.state.dentalChartDataHolderEight[0],
                        buttonNine: this.state.dentalChartDataHolderNine[0],
                        totalCharts: this.state.totalCharts - 1,
                        currentlySelectedChart: 0,

                        procedurePricePrinted: this.state.procedureCostStored[0],
                        procedureTimePrinted: this.state.procedureTimeStored[0]
                    });
                }
            }
        }

        //Hanldes changing the dental chart by clicking left arrow
        const dentalChartDisplayedLeftHanlder = {
            clicked: () => {

                if (this.state.currentlySelectedChart > 0)
                {
                    this.setState({
                        currentlySelectedChart: this.state.currentlySelectedChart - 1,
                        preventTotalReload: true,
                        buttonOne: this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart - 1],
                        buttonTwo: this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart - 1],
                        buttonThree: this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart - 1],
                        buttonFour: this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart - 1],
                        buttonFive: this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart - 1],
                        buttonSix: this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart - 1],
                        buttonSeven: this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart - 1],
                        buttonEight: this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart - 1],
                        buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart - 1],

                        procedurePricePrinted: this.state.procedureCostStored[this.state.currentlySelectedChart - 1],
                        procedureTimePrinted: this.state.procedureTimeStored[this.state.currentlySelectedChart - 1],
                    });
                }
                
            }
        }

        //Hanldes changing the dental chart by clicking left arrow
        const dentalChartDisplayedRightHanlder = {
            clicked: () =>{

                if (this.state.currentlySelectedChart < this.state.totalCharts)
                {
                    let num = this.state.currentlySelectedChart + 1;
                    this.setState({
                        currentlySelectedChart: num,
                        preventTotalReload: true,
                        buttonOne: this.state.dentalChartDataHolderOne[num],
                        buttonTwo: this.state.dentalChartDataHolderTwo[num],
                        buttonThree: this.state.dentalChartDataHolderThree[num],
                        buttonFour: this.state.dentalChartDataHolderFour[num],
                        buttonFive: this.state.dentalChartDataHolderFive[num],
                        buttonSix: this.state.dentalChartDataHolderSix[num],
                        buttonSeven: this.state.dentalChartDataHolderSeven[num],
                        buttonEight: this.state.dentalChartDataHolderEight[num],
                        buttonNine: this.state.dentalChartDataHolderNine[num],

                        procedurePricePrinted: this.state.procedureCostStored[num],
                        procedureTimePrinted: this.state.procedureTimeStored[num],
                    });
                }
            }
        }

        //Handles and changes the text for the procedure type during booking edit and creation
        const indexHanlderProcedure = {
            currentIndexChanged: (currentText:any) =>{


                this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart] = currentText
                this.state.procedure[this.state.currentlySelectedChart] = treatmentListTreatments(currentText);

                this.passbackTeeth(this.state.currentlySelectedChart)
               
            }
        }

        const indexHanlderTooth = {
            currentIndexChanged: (currentText:any) =>{

                this.state.currentlySelectedToothIndex[this.state.currentlySelectedChart] = currentText
                //this.state.procedure[this.state.currentlySelectedChart] = treatmentListTreatments(currentText);

                this.passbackTeeth(this.state.currentlySelectedChart)
                
            }
        }

        const setProcedurePriceAndTime = {
            clicked: () =>{

                //I DO NOT KNOW WHY, BUT YOU NEED TO HAVE BOTH OF THESE HERE TO FIX AN ISSUE WHERE THE MIDDLE LINES DO NOT UPDATE
                this.setState({
                    procedurePricePrinted: treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    procedureTimePrinted: treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    preventTotalReload: true
                });

                this.state.procedureCostStored[this.state.currentlySelectedChart] = this.state.procedurePricePrinted;
                this.state.procedureTimeStored[this.state.currentlySelectedChart] = this.state.procedureTimePrinted;

                //I DO NOT KNOW WHY, BUT YOU NEED TO HAVE BOTH OF THESE HERE TO FIX AN ISSUE WHERE THE MIDDLE LINES DO NOT UPDATE
                this.setState({
                    procedurePricePrinted: treatmentListPrices(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    procedureTimePrinted: treatmentListTimes(this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]),
                    preventTotalReload: true
                });

                this.passbackTeeth(this.state.currentlySelectedChart)
                
            }
        }
         
        const textHandlerNotes = {
            textChanged: (textValue:any) =>{

                this.state.patientNotes[this.state.currentlySelectedChart] = textValue.replace(/[^a-zA-Z0-9,! ]+/g, '');

                this.setState({
                    //TODO: replace past a specific length
                })

                this.passbackTeeth(this.state.currentlySelectedChart)
            }
        }

        //TODO--------------------------------------------------------------------------------------------------------------------
        const textHandlerCost = {
            textChanged: (textValue:any) =>{

                this.state.procedureCostStored[this.state.currentlySelectedChart] = textValue;

                this.setState({
                    procedurePricePrinted: textValue
                })

                this.passbackTeeth(this.state.currentlySelectedChart)
            
            }
        }

        //TODO--------------------------------------------------------------------------------------------------------------------
        const textHandlerTime = {
            textChanged: (textValue:any) =>{

                this.state.procedureTimeStored[this.state.currentlySelectedChart] = textValue;
                
                this.setState({
                    procedureTimePrinted: textValue
                })

                this.passbackTeeth(this.state.currentlySelectedChart)
            
            }
        }

        buttonRowOne.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "1" } style={this.state.buttonOne} on={{clicked: () => {

                this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonOne);

                this.setState({
                    buttonOne: this.state.dentalChartDataHolderOne[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart)
                }}}/>
            </View>
        )

        buttonRowOne.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "2" } style={this.state.buttonTwo} on={{clicked: () => {

                this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonTwo);

                this.setState({
                    buttonTwo: this.state.dentalChartDataHolderTwo[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart)
                }}}/>
            </View>
        )

        buttonRowOne.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "3" } style={this.state.buttonThree} on={{clicked: () => {

                this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonThree);

                this.setState({
                    buttonThree: this.state.dentalChartDataHolderThree[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart)
                }}}/>
            </View>
        )

        buttonRowTwo.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "4" } style={this.state.buttonFour} on={{clicked: () => {

                this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonFour);

                this.setState({
                    buttonFour: this.state.dentalChartDataHolderFour[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart)
                }}}/>
            </View>
        )

        buttonRowTwo.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "5" } style={this.state.buttonFive} on={{clicked: () => {

                this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonFive);

                this.setState({
                    buttonFive: this.state.dentalChartDataHolderFive[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart)
                }}}/>
            </View>
        )

        buttonRowTwo.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "6" } style={this.state.buttonSix} on={{clicked: () => {

                this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonSix);

                this.setState({
                    buttonSix: this.state.dentalChartDataHolderSix[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart)
                }}}/>
            </View>
        )

        buttonRowThree.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "7" } style={this.state.buttonSeven} on={{clicked: () => {

                this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonSeven);

                this.setState({
                    buttonSeven: this.state.dentalChartDataHolderSeven[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart);
                }}}/>
            </View>
        )

        buttonRowThree.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "8" } style={this.state.buttonEight} on={{clicked: () => {

                this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonEight);

                this.setState({
                    buttonEight: this.state.dentalChartDataHolderEight[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart);
                }}}/>
            </View>
        )

        buttonRowThree.push(
            <View style="border: 1px solid black; height: 100px; width: 100px;">
            <Button text={ "9" } style={this.state.buttonNine} on={{clicked: () => {

                this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart] = disableDentalChartButton(this.state.buttonNine);

                this.setState({
                    buttonNine: this.state.dentalChartDataHolderNine[this.state.currentlySelectedChart], preventTotalReload: true
                });
                this.passbackTeeth(this.state.currentlySelectedChart);
                }}}/>
            </View>
        )

        const containerStyle = `
            flex-grow: 0 0 0;
            background: 'white';
        `;

        const containerStyle2 = `
            flex-grow: 2 2 2;
            flex-direction: 'column';
            background: 'white';
        `;

        const containerStyle3 = `
            flex-shrink: 2;
            bottom: 10px;
            flex-direction: 'column';
            background: 'white';
        `;

        this.state.patientNotes[this.state.currentlySelectedChart] = " ";

        return (

            <View style={"flex-grow: 1; flex-direction: 'column';"}>
  
                <View style="flex-direction: 'row';">
                    <View style={containerStyle}>

                        <View style="flex: 0; flex-direction: 'row';">
                            <Button text="-" style="width: 150px;" on={dentalChartRemoveHandler}></Button>
                            <Button text="+" style="width: 150px;" on={dentalChartAddHandler}></Button>
                        </View>

                        <View style="flex: 0; flex-direction: 'row';">
                            {buttonRowOne}
                        </View>

                        <View style="flex: 0; flex-direction: 'row';">
                            {buttonRowTwo}
                        </View>

                        <View style="flex: 0; flex-direction: 'row';">
                            {buttonRowThree}
                        </View>

                        <View style="flex: 0; flex-direction: 'row';">
                            <Button text="<" style="width: 100px;" on={dentalChartDisplayedLeftHanlder}></Button>

                            <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey'; width: 100px;"}>
                                {"Tooth: " + (this.state.currentlySelectedChart + 1) + "/ " + this.state.totalCharts}
                            </Text>
                            
                            <Button text=">" style="width: 100px;" on={dentalChartDisplayedRightHanlder}></Button>
                        </View>

                    </View>
  
  
                    {/**/}
                    <View style={containerStyle2}>
                
                        <View style="flex-direction: 'row';">
                            <View style={"flex-grow: 1 0 0; background: 'white';"}>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Tooth</Text>
                                    <ComboBox style={"flex: 2;"} items={toothComboBox()} currentIndex={this.state.currentlySelectedToothIndex[this.state.currentlySelectedChart]}
                                    on={indexHanlderTooth} />
                                </View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Procedure</Text>
                                    <ComboBox style={"flex: 2;"} items={treatmentList()} currentIndex={this.state.currentlySelectedProcedureIndex[this.state.currentlySelectedChart]}
                                    on={indexHanlderProcedure} />
                                </View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <LineEdit style={"flex: 2;"} on={textHandlerCost} text={this.state.procedureCostStored[this.state.currentlySelectedChart]} />
                                    <LineEdit style={"flex: 2;"} on={textHandlerTime} text={this.state.procedureTimeStored[this.state.currentlySelectedChart]} />
                                    <Button on={setProcedurePriceAndTime} text={"Default"}></Button>
                                </View>
                                
                                <View style="margin: 10px;"></View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <Text style={"flex: 1; border: 1px solid black; background: 'LightGrey';"}>Notes</Text>
                                </View>

                                <View style="margin-left: 10px; flex-direction: 'row';">
                                    <LineEdit style={"flex: 2;"} on={textHandlerNotes} text={this.state.patientNotes[this.state.currentlySelectedChart]} />
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
} 

export default ToothCreator;
