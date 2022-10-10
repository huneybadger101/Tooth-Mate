



export const screenResolutionX = () =>{

    return 1920;
}

export const screenResolutionY = () =>{

    //return 1080;

    var test:any;
    
    var resolution = require("screen-resolution");
    resolution.get(false)
    .then((result: any) => {

        //Setting states for the visual calculations
        test = result.height;

        return test;
    });

    //return test;
      
}




export const style = 
`
    #titleCenterAlign {
        font-size: 22px;
        margin: 5px 0px;
        color: black;
        align-self: 'center';
    }
    #titleLeftAlign {
        font-size: 22px;
        margin: 5px 20px;
        color: black;
    }
    #titleRightAlign {
        font-size: 22px;
        margin: 5px 0px;
        color: black;
        align-self: 'flex-end';
    }
    #button {
        align-self: 'center';
        margin: 2px 0px 2px 0px;
        padding: 15px 40px;
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        border-radius: 10px;
    }
    #button:hover {
        background-color: #FFFFFF;
    }
    #button:pressed {
        background-color: #BBBBBB;
    }
    #buttonLarge {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        border-radius: 10px;
        width: 400%; 
        height: 200%; 
        color: 'black'; 
        font-size: 20px;
    }
    #buttonLarge:hover {
        background-color: #FFFFFF;
    }
    #buttonLarge:pressed {
        background-color: #BBBBBB;
    }
    #textEntry {
        margin: 2px 0px 0px 0px;
        width: '25%';
        height: 50px;
        align-self: 'center';
        border-radius: 10px;
    }
    #text {
        font-size: 18px;
        color: black;
    }
    #buttonCalanderDate {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black'; 
        border-radius: 2px;
        margin: 1px;
        height: ` + Math.round((screenResolutionX() * 5.20833333) / 100) + ` px;
        width: ` + Math.round((screenResolutionY() * 9.25925926) / 100) + ` px;
    }
    #buttonCalanderDate:hover {
        background-color: #FFFFFF;
    }
    #buttonCalanderDate:pressed {
        background-color: #BBBBBB;
    }
    #buttonCalanderDateDisabled {
        background-color: #7A7A7A;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        border-radius: 2px;
        margin: 1px;
        height: ` + Math.round((screenResolutionX() * 5.20833333) / 100) + ` px;
        width: ` + Math.round((screenResolutionY() * 9.25925926) / 100) + ` px;
    }
    #weekdaysCalander {
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((screenResolutionX() * 5.20833333) / 100) / 4) + ` px;
        width: ` + Math.round((screenResolutionY() * 9.25925926) / 100) + ` px;
    }
    #monthSelectedCalander {
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((screenResolutionX() * 5.20833333) / 100) / 4) + ` px;
        width: ` + ((Math.round((screenResolutionY() * 9.25925926) / 100) * 3) + 4) + ` px;
    }
    #monthChangeButtonsCalander {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((screenResolutionX() * 5.20833333) / 100) / 4) + ` px;
        width: ` + ((Math.round((screenResolutionY() * 9.25925926) / 100) * 2) + 2) + ` px;
    }
    #monthChangeButtonsCalander:hover {
        background-color: #FFFFFF;
    }
    #monthChangeButtonsCalander:pressed {
        background-color: #BBBBBB;
    }
`
