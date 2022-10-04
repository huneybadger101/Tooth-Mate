import axios from 'axios';

export const ticketItems = () =>{

    let ticketText:any = [];

    //Gets all of the tickets currently created
    axios.post('http://localhost:3000/tickets/getAllTickets')
    .then((resTickets) => {

        for (var num = 0; num < resTickets.data.result.length; num++)
        {
            ticketText.push("Ticket ID: " + resTickets.data.result[num]['ID']);
        }
    })
    .catch((err) => {
        console.log(err)
    });

    return ticketText;
}

export const ticketVisitTable = (number:any) =>{

    let ticketVisitTableArray:any;
    









    //Gets all of the tickets currently created
    axios.post('http://localhost:3000/tickets/getAllTickets')
    .then((resTickets) => {

        console.log("HERE IS THE LENGTH OF THE TICKET: " + resTickets.data.result.length);

        
        //Gets all of the tickets currently created
        axios.post('http://localhost:3000/tickets/getTicketDataByID', null, {
            headers: {
                'ID': number //ID #1 does exist
            }
        })
        .then((resTicketsVisit) => {

            ticketVisitTableArray = ("I am in a vast hallway: " + resTicketsVisit.data.result['ticketVisit'][0]['Date']);
            
        })
        .catch((err) => {
            console.log(err)
        });
        
    })
    .catch((err) => {
        console.log(err)
    });







    





    

    return ticketVisitTableArray;
}
