const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique'
    }
  };

const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);
const fs = require('fs');

export const createPDF = async (quoteData:{
        id:Number,
        date:String,
        paymentStatus:String,
        paymentDeadline:String,
        totalCost:String,
        patientName:String,
        patientNHI:String,
        patientDOB:String,
        patientContactNumber:String,
        patientEmailAddress:String,
        bookingID:Number,
        bookingDate:String,
        bookingTime:String,
        bookingDentistName:String,
        bookingLocation:String,
        bookingNotes:String,
        bookingProcedure:String
    }, filePath:String) => {

    const docDefinition = {
        content: [
            "COMPANY_NAME_HERE QUOTE - " + new Date().toString().split(" (")[0],
            " ",
            " ",
            {
              layout: 'lightHorizontalLines',
              table: {
                widths: [ '*', 'auto'],
        
                body: [
                  [ { text: 'Quote ', bold: true }, ""],
                  [ { text: 'Quote ID: ', bold: true }, quoteData.id ],
                  [ { text: 'Quote Creation Date: ', bold: true }, quoteData.date ],
                  [ { text: 'Quote Payment Status: ', bold: true }, quoteData.paymentStatus ],
                  [ { text: 'Quote Payment Deadline: ', bold: true }, quoteData.paymentDeadline ],
                  [ { text: 'Quote Total Cost: ', bold: true }, "$" + quoteData.totalCost ],
                  [ { text: 'Patient Information: ', bold: true }, "" ],
                  [ { text: '-  Patient Full Name: ', bold: true }, quoteData.patientName ],
                  [ { text: '-  Patient NHI Number: ', bold: true }, quoteData.patientNHI ],
                  [ { text: '-  Patient Date of Birth: ', bold: true }, quoteData.patientDOB ],
                  [ { text: '-  Patient Contact Number: ', bold: true }, quoteData.patientContactNumber ],
                  [ { text: '-  Patient Email Address: ', bold: true }, quoteData.patientEmailAddress ],
                  [ { text: 'Booking Information: ', bold: true }, "" ],
                  [ { text: '-  Booking ID: ', bold: true }, quoteData.bookingID ],
                  [ { text: '-  Booking Date: ', bold: true }, quoteData.bookingDate ],
                  [ { text: '-  Booking Time: ', bold: true }, quoteData.bookingTime ],
                  [ { text: '-  Booking Dentist Name: ', bold: true }, quoteData.bookingDentistName ],
                  [ { text: '-  Booking Location: ', bold: true }, quoteData.bookingLocation ],
                  [ { text: '-  Booking Notes: ', bold: true }, quoteData.bookingNotes ],
                  [ { text: '-  Booking Procedure: ', bold: true }, quoteData.bookingProcedure ],
                ]
              }
            }
          ],
        defaultStyle: {
            font: 'Helvetica'
          }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
}