
//Will return a value with leading Zeros (specifically used for the 'time' digits)
    //I.e., 09:00AM instead of 9:0AM
export const addLeadingZeros = (num:number, totalLength:number) =>{
    return String(num).padStart(totalLength, '0');
}