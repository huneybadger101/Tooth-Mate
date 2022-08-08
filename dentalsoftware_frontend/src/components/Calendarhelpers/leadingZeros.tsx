//Will return a value with leading Zeros (specifically used for the 'time' digits)
    //I.e., 09:00AM instead of 9:0AM
export const addLeadingZeros = (num:number, totalLength:number) =>{
    return String(num).padStart(totalLength, '0');
}

//Will take in a string and replace any characters past the index point with the newValue
export const replaceStringAtLength = (string:any, index:any) =>{

    if (string.length > index)
    {
        let temp = string.substr(index - index, index);
        return temp;
    }
    else
    {
        return string;
    }
}