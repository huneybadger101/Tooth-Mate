declare type ComboBoxItem = {
    text: string;
};

declare type ComboBoxHour = {
    text: string;
};

declare type ComboBoxMinute = {
    text: string;
};

declare type ComboBoxAMorPM = {
    text: string;
};

declare type ComboBoxTeeth = {
    text: string;
}

declare type Range = {
    maximum: number;
    minimum: number;
};

export const treatmentList = () =>{

    let comboBoxContents: ComboBoxItem[] = [
        {
            text: treatmentListTreatments(0)
        },
        {
            text: treatmentListTreatments(1)
        },
        {
            text: treatmentListTreatments(2)
        },
        {
            text: treatmentListTreatments(3)
        },
        {
            text: treatmentListTreatments(4)
        },
        {
            text: treatmentListTreatments(5)
        },
        {
            text: treatmentListTreatments(6)
        },
        {
            text: treatmentListTreatments(7)
        },
        {
            text: treatmentListTreatments(8)
        },
        {
            text: treatmentListTreatments(9)
        },
        {
            text: treatmentListTreatments(10)
        },
        {
            text: treatmentListTreatments(11)
        },
        {
            text: treatmentListTreatments(12)
        },
        {
            text: treatmentListTreatments(13)
        },
        {
            text: treatmentListTreatments(14)
        },
        {
            text: treatmentListTreatments(15)
        },
        {
            text: treatmentListTreatments(16)
        },
        {
            text: treatmentListTreatments(17)
        },
        {
            text: treatmentListTreatments(18)
        },
        {
            text: treatmentListTreatments(19)
        },
        {
            text: treatmentListTreatments(20)
        },
    ]

    return comboBoxContents;
}

export const treatmentListTreatments = (selectedTreatment:any) =>{
    
    switch(selectedTreatment) {
        case 0:
        return "Initial examination";
        break;
        case 1:
        return "Annual examination";
        break;
        case 2:
        return "Post operative examination";
        break;
        case 3:
        return "Filling treatment";
        break;
        case 4:
        return "Crown";
        break;
        case 5:
        return "Traditional fixed bridge";
        break;
        case 6:
        return "Cantilever bridge";
        break;
        case 7:
        return "Maryland bridge";
        break;
        case 8:
        return "Implant supported bridge";
        break;
        case 9:
        return "Implant";
        break;
        case 10:
        return "Extraction";
        break;
        case 11:
        return "Root canal treatment initial";
        break;
        case 12:
        return "Root canal treatment follow up";
        break;
        case 13:
        return "Hygiene clean";
        break;
        case 14:
        return "Impressions";
        break;
        case 15:
        return "X-Ray";
        break;
        case 16:
        return "Periapical";
        break;
        case 17:
        return "Panoramic";
        break;
        case 18:
        return "Cephalometic";
        break;
        case 19:
        return "Computed temography";
        break;
        case 20:
        return "Sailography";
        break;
        default:
        return "0.00";
      }
}

export const treatmentListPrices = (selectedTreatment:any) =>{
    
    //TODO: Have the pricing editable via the settings
    switch(selectedTreatment) {
        case 0: //Initial examination
        return "$100.00";
        break;
        case 1: //Annual examination
        return "$200.00";
        break;
        case 2: //Post operative examination
        return "$300.00";
        break;
        case 3: //Filling treatment
        return "$400.00";
        break;
        case 4: //Crown
        return "$500.00";
        break;
        case 5: //Traditional fixed bridge
        return "$600.00";
        break;
        case 6: //Cantilever bridge
        return "$700.00";
        break;
        case 7: //Maryland bridge
        return "$800.00";
        break;
        case 8: //Implant supported bridge
        return "$900.00";
        break;
        case 9: //Implant
        return "$1,000.00";
        break;
        case 10: //Extraction
        return "$1,100.00";
        break;
        case 11: //Root canal treatment initial
        return "$1,200.00";
        break;
        case 12: //Root canal treatment follow up
        return "$1,300.00";
        break;
        case 13: //Hygiene clean
        return "$1,400.00";
        break;
        case 14: //Impressions
        return "$1,500.00";
        break;
        case 15: //X-Ray
        return "$1,600.00";
        break;
        case 16: //Periapical
        return "$1,700.00";
        break;
        case 17: //Panoramic
        return "$1,800.00";
        break;
        case 18: //Cephalometic
        return "$1,900.00";
        break;
        case 19: //Computed temography
        return "$2,000.00";
        break;
        case 20: //Sailography
        return "$2,100.00";
        break;
        default:
        return "$0.00";
      }
}

export const treatmentListTimes = (selectedTreatment:any) =>{

    switch(selectedTreatment) {
        case 0: //"Initial examination":
        return "1 hour";
        break;
        case 1: // "Annual examination":
        return "2 hours";
        break;
        case 2: // "Post operative examination":
        return "3 hours";
        break;
        case 3: // "Filling treatment":
        return "4 hours";
        break;
        case 4: // "Crown":
        return "4 hours";
        break;
        case 5: // "Traditional fixed bridge":
        return "5 hours";
        break;
        case 6: // "Cantilever bridge":
        return "6 hours";
        break;
        case 7: // "Maryland bridge":
        return "7 hours";
        break;
        case 8: // "Implant supported bridge":
        return "8 hours";
        break;
        case 9: // "Implant":
        return "9 hours";
        break;
        case 10: //"Extraction":
        return "10 hours";
        break;
        case 11: // "Root canal treatment initial":
        return "11 hours";
        break;
        case 12: // "Root canal treatment follow up":
        return "12 hours";
        break;
        case 13: // "Hygiene clean":
        return "13 hours";
        break;
        case 14: // "Impressions":
        return "14 hours";
        break;
        case 15: // "X-Ray":
        return "15 hours";
        break;
        case 16: // "Periapical":
        return "16 hours";
        break;
        case 17: // "Panoramic":
        return "17 hours";
        break;
        case 18: // "Cephalometic":
        return "18 hours";
        break;
        case 19: // "Computed temography":
        return "19 hours";
        break;
        case 20: // "Sailography":
        return "20 hours";
        break;
        default:
        return "0 hours";
      }
}

export const timeAMorPM = () =>{


    let comboBoxContents: ComboBoxAMorPM[] = [
        {text: "AM"},
        {text: "PM"}
    ]

    return comboBoxContents;

}

export const timeHourRange = () =>{
    let comboBoxContents: Range =
        {
            maximum: 12,
            minimum: 1
        }

    return comboBoxContents;
}

export const timeMinuteRange = () =>{
    let comboBoxContents: Range =
        {
            maximum: 59,
            minimum: 0
        }

    return comboBoxContents;
}

export const toothComboBox = () =>{


    let comboBoxContents: ComboBoxTeeth[] = [
        {
            text: toothNames(0)
        },
        {
            text: toothNames(1)
        },
        {
            text: toothNames(2)
        },
        {
            text: toothNames(3)
        },
        {
            text: toothNames(4)
        },
        {
            text: "01 - " + toothNames(5)
        },
        {
            text: "02 - " + toothNames(6)
        },
        {
            text: "03 - " + toothNames(7)
        },
        {
            text: "04 - " + toothNames(8)
        },
        {
            text: "05 - " + toothNames(9)
        },
        {
            text: "06 - " + toothNames(10)
        },
        {
            text: "07 - " + toothNames(11)
        },
        {
            text: "08 - " + toothNames(12)
        },
        {
            text: "09 - " + toothNames(13)
        },
        {
            text: "10 - " + toothNames(14)
        },
        {
            text: "11 - " + toothNames(15)
        },
        {
            text: "12 - " + toothNames(16)
        },
        {
            text: "13 - " + toothNames(17)
        },
        {
            text: "14 - " + toothNames(18)
        },
        {
            text: "15 - " + toothNames(19)
        },
        {
            text: "16 - " + toothNames(20)
        },
        {
            text: "17 - " + toothNames(21)
        },
        {
            text: "18 - " + toothNames(22)
        },
        {
            text: "19 - " + toothNames(23)
        },
        {
            text: "20 - " + toothNames(24)
        },
        {
            text: "21 - " + toothNames(25)
        },
        {
            text: "22 - " + toothNames(26)
        },
        {
            text: "23 - " + toothNames(27)
        },
        {
            text: "24 - " + toothNames(28)
        },
        {
            text: "25 - " + toothNames(29)
        },
        {
            text: "26 - " + toothNames(30)
        },
        {
            text: "27 - " + toothNames(31)
        },
        {
            text: "28 - " + toothNames(32)
        },
        {
            text: "29 - " + toothNames(33)
        },
        {
            text: "30 - " + toothNames(34)
        },
        {
            text: "31 - " + toothNames(35)
        },
        {
            text: "32 - " + toothNames(36)
        },
        
    ]

    return comboBoxContents;
}

export const toothNames = (selectedTreatment:any) =>{
    
    //TODO: BEFORE TWO WEEK BEFORE DUE DATE
    switch(selectedTreatment) {
        //Uper right quadrant teeth
        case 0:
        return "All Quadrants - Entire mouth";
        break;
        case 1:
        return "Upper Left Quadrant";
        break;
        case 2:
        return "Upper Right Quadrant";
        break;
        case 3:
        return "Lower Left Quadrant";
        break;
        case 4:
        return "Lower Right Quadrant";
        break;

        case 5:
        return "Upper Right Quadrant - Wisdom Tooth (3rd Molar)";
        break;
        case 6:
        return "Upper Right Quadrant - Molar (2nd Molar)";
        break;
        case 7:
        return "Upper Right Quadrant - Molar (1st Molar)";
        break;
        case 8:
        return "Upper Right Quadrant - Bicuspid (2nd)";
        break;
        case 9:
        return "Upper Right Quadrant - Bicuspid (1st)";
        break;
        case 10:
        return "Upper Right Quadrant - Canine (Eye tooth / Cuspid)";
        break;
        case 11:
        return "Upper Right Quadrant - Incisor (Lateral)";
        break;
        case 12:
        return "Upper Right Quadrant - Incisor (Central)";
        break;

        //Upper left quadrant teeth
        case 13:
        return "Upper Left Quadrant - Incisor (Central)";
        break;
        case 14:
        return "Upper Left Quadrant - Incisor (Lateral)";
        break;
        case 15:
        return "Upper Left Quadrant - Canine (Eye tooth / Cuspid)";
        break;
        case 16:
        return "Upper Left Quadrant - Bicuspid (1st)";
        break;
        case 17:
        return "Upper Left Quadrant - Bicuspid (2nd)";
        break;
        case 18:
        return "Upper Left Quadrant - Molar (1st Molar)";
        break;
        case 19:
        return "Upper Left Quadrant - Molar (2nd Molar)";
        break;
        case 20:
        return "Upper Left Quadrant - Wisdom Tooth (3rd Molar)";
        break;

        //lower left quadrant teeth
        case 21:
        return "Lower Left Quadrant - Wisdom Tooth (3rd Molar)";
        break;
        case 22:
        return "Lower Left Quadrant - Molar (2nd Molar)";
        break;
        case 23:
        return "Lower Left Quadrant - Molar (1st Molar)";
        break;
        case 24:
        return "Lower Left Quadrant - Bicuspid (2nd)";
        break;
        case 25:
        return "Lower Left Quadrant - Bicuspid (1st)";
        break;
        case 26:
        return "Lower Left Quadrant - Canine (Eye tooth / Cuspid)";
        break;
        case 27:
        return "Lower Left Quadrant - Incisor (Lateral)";
        break;
        case 28:
        return "Lower Left Quadrant - Incisor (Central)";
        break;

        //Lower right quadrant teeth
        case 29:
        return "Lower Right Quadrant - Incisor (Central)";
        break;
        case 30:
        return "Lower Right Quadrant - Incisor (Lateral)";
        break;
        case 31:
        return "Lower Right Quadrant - Canine (Eye tooth / Cuspid)";
        break;
        case 32:
        return "Lower Right Quadrant - Bicuspid (1st)";
        break;
        case 33:
        return "Lower Right Quadrant - Bicuspid (2nd)";
        break;
        case 34:
        return "Lower Right Quadrant - Molar (1st Molar)";
        break;
        case 35:
        return "Lower Right Quadrant - Molar (2nd Molar)";
        break;
        case 36:
        return "Lower Right Quadrant - Wisdom Tooth (3rd Molar)";
        break;

        default:
        return "All Quadrants - Entire mouth";
      }
}
