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

declare type Range = {
    maximum: number;
    minimum: number;
};

export const treatmentList = () =>{


    let comboBoxContents: ComboBoxItem[] = [
        {
            text: "Initial examination"
        },
        {
            text: "Annual examination"
        },
        {
            text: "Post operative examination"
        },
        {
            text: "Filling treatment"
        },
        {
            text: "Crown"
        },
        {
            text: "Traditional fixed bridge"
        },
        {
            text: "Cantilever bridge"
        },
        {
            text: "Maryland bridge"
        },
        {
            text: "Implant supported bridge"
        },
        {
            text: "Implant"
        },
        {
            text: "Extraction"
        },
        {
            text: "Root canal treatment initial"
        },
        {
            text: "Root canal treatment follow up"
        },
        {
            text: "Hygiene clean"
        },
        {
            text: "Impressions"
        },
        {
            text: "X-Ray"
        },
        {
            text: "Periapical"
        },
        {
            text: "Panoramic"
        },
        {
            text: "Cephalometic"
        },
        {
            text: "Computed temography"
        },
        {
            text: "Sailography"
        }
    ]

    return comboBoxContents;

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