//Will return a value with leading Zeros (specifically used for the 'time' digits)
    //I.e., 09:00AM instead of 9:0AM
export const addLeadingZeros = (num:number, totalLength:number) =>{
    return String(num).padStart(totalLength, '0');
}

//Will take in a string and replace any characters past the index point with the newValue
export const replaceStringAtLength = (string:any, index:any) =>{

    if (string.length > index)
    {
        let temp = string.substr(0, index);

        return temp;
    }
    else
    {
        return string;
    }
}

export const NHIcorrectFormatCheck = (string:any) =>{
    
    console.log("String 1 " + string);

    var stringArray:any = [];
    var returnedString = "";

    for (var num = 0; num < string.length; num++)
    {
        if (num < 3)
        {
            stringArray[num] = string.charAt(num).replace(/[^a-zA-Z! ]+/g, '');
        }
        else
        {
            stringArray[num] = string.charAt(num).replace(/[^0-9! ]+/g, '');
        }

        returnedString = returnedString + stringArray[num];
    }
    
    return returnedString;
}
