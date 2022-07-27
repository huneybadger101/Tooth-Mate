//This file will calculate the weekday that a month has as a starting point
//I.e. 1/1/2012 falls on a Sunday
//It is used so the calendar will have the selectable dates accuratly show weekdays they fall on.

export const getWeekdayStart = (day:number, month:number, year:number) =>{

    //Will set the default value for 2022 months to weekdays calculations
    var referenceWeekday = [12];
    referenceWeekday[0] = 5;
    referenceWeekday[1] = 1;
    referenceWeekday[2] = 1;
    referenceWeekday[3] = 4;
    referenceWeekday[4] = 6;
    referenceWeekday[5] = 2;
    referenceWeekday[6] = 4;
    referenceWeekday[7] = 0;
    referenceWeekday[8] = 3;
    referenceWeekday[9] = 5;
    referenceWeekday[10] = 1;
    referenceWeekday[11] = 3;

    //Will set needed variables for later use
    var referenceYear = 2022;
    var currentWeekday = month;
    var goThroughLeapYear = true;
    
    if (referenceYear < year)
    {
        for (var refYear = referenceYear; refYear <= year; refYear++)
        {
            for (var num = 0; num < 12; num++)
            {
                //Required to prevent the for loop from going through this section on it's first rotation (the year will still be set to 2022)
                if (refYear != 2022)
                {
                    //Checks for a leap year.
                    if ((refYear % 4 == 0 && refYear % 100 != 0) && (num > 1 && goThroughLeapYear == true))
                    {
                        if (num == 11)
                        {
                            goThroughLeapYear = false;
                        }

                        referenceWeekday[num] = referenceWeekday[num] + 2;
                    }
                    //Checks for a post leap year
                    //This is because the first two months of a year post leapyear are still ahead by 2 days.
                    else if (((refYear - 1) % 4 == 0 && (refYear - 1) % 100 != 0) && num < 2)
                    {
                        referenceWeekday[num] = referenceWeekday[num] + 2;
                    }
                    else
                    {
                        referenceWeekday[num] = referenceWeekday[num] + 1;
                    }
                    
                    if (referenceWeekday[num] > 6)
                    {
                        referenceWeekday[num] = referenceWeekday[num] - 7;
                    }
                }
            }

            goThroughLeapYear = true;
        }
    }

    //Sets the weekday the calendar should start on 
    if (referenceYear > year)
    {
        console.log("Less than year");
        console.log("Reference year: " + referenceYear + ", Year: " + year);

        for (var refYear = referenceYear; refYear >= year; refYear--)
        {
            for (var num = 0; num < 12; num++)
            {
                //Required to prevent the for loop from going through this section on it's first rotation (the year will still be set to 2022)
                if (refYear != 2022)
                {
                    //Checks for a leap year
                    if ((refYear % 4 == 0 && refYear % 100 != 0) && (num > 1 && goThroughLeapYear == true))
                    {
                        if (num == 11)
                        {
                            goThroughLeapYear = false;
                        }
                        referenceWeekday[num] = referenceWeekday[num] - 2;
                    }
                    //Checks for a post leap year
                    //This is because the first two months of a year post leapyear are still ahead by 2 days.
                    else if (((refYear - 1) % 4 == 0 && (refYear - 1) % 100 != 0) && num < 2)
                    {
                        referenceWeekday[num] = referenceWeekday[num] - 2;
                    }
                    else
                    {
                        referenceWeekday[num] = referenceWeekday[num] - 1;
                    }
                    
                    if (referenceWeekday[num] < 0)
                    {
                        referenceWeekday[num] = referenceWeekday[num] + 7;
                    }
                }
            }

            goThroughLeapYear = true;
        }

        //NOTE: I HAVE NO IDEA WHY, BUT THIS IS REQUIRED (DESPITE IT EXISTING ABOVE) TO
            //ALLOW THE LEAP YEARS TO WORK WHEN THE MONTH/ YEAR IS BEING CHANGED BACK (2022 -> 2021).
        if ((year % 4 == 0 && year % 100 != 0) && (currentWeekday > 1))
        {
            console.log("Running fix 1 " + year);
            referenceWeekday[currentWeekday] = referenceWeekday[currentWeekday] + 1;
        }
        else if (((year - 1) % 4 == 0 && (year - 1) % 100 != 0) && currentWeekday < 2)
        {
            console.log("Running fix 2 " + year);
            referenceWeekday[currentWeekday] = referenceWeekday[currentWeekday] + 1;
        }
    }

    //Returns the current weeday start point for the calendar to use as reference.
    return referenceWeekday[currentWeekday];
}