export const disableCalendarButton = (buttonSelected:any, daySelected:any, monthSelected:any, currentMonthSelected:any) =>{

    if (buttonSelected == daySelected && monthSelected == currentMonthSelected)
    {
        return false
    }
    else
    {
        return true;
    }
}

export const disableDentalChartButton = (buttonStyleString:any) =>{
    
    if (buttonStyleString == "height: 100px; width: 100px;")
    {
        return "height: 100px; width: 100px; background: 'Grey';";
    }
    else
    {
        return "height: 100px; width: 100px;";
    }
}
