//This file will send back the amount of days a month should have

export const getMonthDayCount = (month:number, year:number) =>{

    var monthDayCount = [12];
    monthDayCount[0] = 31;

    if (year % 4 == 0 && year % 100 != 0)
    {
        //Sets the count for an additional day (due to leap year).
        monthDayCount[1] = 29;
    }
    else
    {
        //Standard date.
        monthDayCount[1] = 28;
    }

    monthDayCount[2] = 31;
    monthDayCount[3] = 30;
    monthDayCount[4] = 31;
    monthDayCount[5] = 30;
    monthDayCount[6] = 31;
    monthDayCount[7] = 31;
    monthDayCount[8] = 30;
    monthDayCount[9] = 31;
    monthDayCount[10] = 30;
    monthDayCount[11] = 31;

    return monthDayCount[month];
}