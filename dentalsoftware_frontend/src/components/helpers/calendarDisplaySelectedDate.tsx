//This file will send a string back containing the current date/ time
import { getWeekdayStart } from "./calendarHelper";
import { getMonthDayCount } from "./calendarMonthDayCount";

export const getWeekdaySelected = (monthSelected: any, year: any, daySelected: any) =>{

    var monthDayCount = getMonthDayCount(monthSelected, year);
    var monthWeekdayStart = getWeekdayStart(monthSelected, year);

    console.log("MONTH WEEDAY START VAR: " + monthWeekdayStart);
    var returnValue = monthWeekdayStart - 2;

    for (var num = 0; num <= daySelected; num++)
    {
        returnValue ++;

        if (returnValue > 6)
        {
            returnValue = returnValue - 7;
        }
    }

    console.log("BEING SENT: " + returnValue);
    return returnValue;
}
