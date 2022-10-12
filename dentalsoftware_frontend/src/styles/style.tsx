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
    #alert {
        position: 'absolute'; 
        justify-content: 'space-evenly'; 
        align-items: 'center'; 
        width: 400px;
        height: 200px;
        top: 20px; 
        right: ` + ((width / 2) - 227) + `px;
        border: 2px;
        border-width: 1px;
        border-style: solid;
        border-radius: 15px 15px 15px 15px;
    }
`