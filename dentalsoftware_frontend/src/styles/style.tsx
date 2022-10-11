export const style = (width:any, height:any) =>
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
        height: ` + Math.round((width * 5.20833333) / 100) + ` px;
        width: ` + Math.round((height * 9.25925926) / 100) + ` px;
        outline: 'none';
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
        height: ` + Math.round((width * 5.20833333) / 100) + ` px;
        width: ` + Math.round((height * 9.25925926) / 100) + ` px;
        outline: 'none';
    }
    #weekdaysCalander {
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100) / 4) + ` px;
        width: ` + Math.round((height * 9.25925926) / 100) + ` px;
        outline: 'none';
    }
    #monthSelectedCalander {
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100) / 4) + ` px;
        width: ` + ((Math.round((height * 9.25925926) / 100) * 3) + 4) + ` px;
        outline: 'none';
    }
    #monthChangeButtonsCalander {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100) / 4) + ` px;
        width: ` + ((Math.round((height * 9.25925926) / 100) * 2) + 2) + ` px;
        outline: 'none';
    }
    #monthChangeButtonsCalander:hover {
        background-color: #FFFFFF;
    }
    #monthChangeButtonsCalander:pressed {
        background-color: #BBBBBB;
    }
    #bookingChangePageButton {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black'; 
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100) / 4) + ` px;
        flex: 1;
        flex-direction: 'row';
        outline: 'none';
    }
    #bookingChangePageButton:hover {
        background-color: #FFFFFF;
    }
    #bookingChangePageButton:pressed {
        background-color: #BBBBBB;
    }

    #toggleBookingAndTicket {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black'; 
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100) / 4) + ` px;
        flex: 4;
        flex-direction: 'row';
        outline: 'none';
    }
    #toggleBookingAndTicket:hover {
        background-color: #FFFFFF;
    }
    #toggleBookingAndTicket:pressed {
        background-color: #BBBBBB;
    }

    #createBookingButton {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black'; 
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100) / 4) + ` px;
        outline: 'none';
    }
    #createBookingButton:hover {
        background-color: #FFFFFF;
    }
    #createBookingButton:pressed {
        background-color: #BBBBBB;
    }
    #ticketText {
        background-color: #FFFFFF;
        border-width: 1px;
        border-style: solid;
        color: 'black';
        font-size: 15px;
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100)) + ` px;
        flex: 6;
        flex-direction: 'row';
        outline: 'none';
        margin: 1px;
    }
    #ticketAddAndDeleteButton {
        background-color: #DDDDDD;
        border-width: 1px;
        border-style: solid;
        color: 'black'; 
        border-radius: 2px;
        margin: 1px;
        height: ` + (Math.round((width * 5.20833333) / 100)) + ` px;
        flex: 2;
        flex-direction: 'row';
        outline: 'none';
    }
    #ticketAddAndDeleteButton:hover {
        background-color: #FFFFFF;
    }
    #ticketAddAndDeleteButton:pressed {
        background-color: #BBBBBB;
    }
    
`
