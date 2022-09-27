import open from "open";

export const generateEmailReferral = (patientData:{
        patientName:String,
        patientNHI:String,
        patientDOB:String,
        patientContactNumber:String,
        patientEmailAddress:String
    }, subject:String, body:String) => {

        patientData['patientName'] + 
        "%0D%0APatients NHI Number: " + patientData['patientNHI'] +
        "%0D%0APatients Date of Birth: " + patientData['patientDOB'] +
        "%0D%0APatients Contact Number: " + patientData['patientContactNumber'] +
        "%0D%0APatients Email Address: " + patientData['patientContactNumber'];
        let mailToString = "mailto:";
        mailToString += patientData['patientEmailAddress'];
        mailToString += "?subject=";
        mailToString += subject;
        mailToString += "&body="
        mailToString += body
        mailToString = mailToString.replaceAll(" ", "%20");

        open(mailToString);
}
