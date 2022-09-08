export const testButtons = (buttonSelected:any, daySelected:any, monthSelected:any, currentMonthSelected:any) =>{

    console.log("Current month selected: " + monthSelected);
    console.log("Month selected: " + monthSelected);


    if (buttonSelected == daySelected && monthSelected == currentMonthSelected)
    {
        return false
    }
    else
    {
        return true;
    }
}