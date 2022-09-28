# Tickets Endpoints


`/tickets/getAllTickets` -> Returns a dictionary containing all items in the Tickets table.

- Request type: Post
- Required Headers: None
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/tickets/getAllTickets')
    .then((res) => {
        if (res.data.error) {
            console.log(res.data.error)
        } else {
            console.log(res.data)
        }
    })
    .catch((err) => {
        console.log(err)
    });
```

----

`/tickets/deleteTicket` -> Deletes an existing item in the Tickets table.

- Request type: Post
- Required Headers: String - `ticketid`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/tickets/deleteTicket', null, {
    headers: {
        'ticketid': 1
    })
    .then((res) => {
        if (res.data.error) {
            console.log(res.data.error)
        } else {
            console.log(res.data)
        }
    })
    .catch((err) => {
        console.log(err)
    });
```

----

`/tickets/updateTicket` -> Updates an existing item in the Tickets table.

- Request type: Post
- Required Headers: String (ID) - `ticketid`, JSON String - `cols`, JSON String - `vals`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/tickets/updateTicket', null, {
    headers: {
        'ticketid': 2,
        'cols': '{'cols': [DATA_HERE]}',
        'vals': '{'vals': [DATA_HERE]}'
    })
    .then((res) => {
        if (res.data.error) {
            console.log(res.data.error)
        } else {
            console.log(res.data)
        }
    })
    .catch((err) => {
        console.log(err)
    });
```

----


`/tickets/createNewTicket` -> Creates a new Ticket entry in the Tickets table in the Database.

- Request type: Post
- Required Headers: Dictionary - `ticket`, Dictionary - `ticketVisit`, Dictionary - `ticketVisitTeeth`.
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/quotes/createNewQuote', null, {
    headers: {
        'data': {
            'ticket': {
                'PatientID': 2,
                'NumberOfVisits': 4
            },
            'ticketVisit': [
                {
                    'VisitNumber': 1,
                    'Date': '2022/2/2',
                    'Time': '10:25',
                    'VisitTimeLength': 35
                }
            ],
            'ticketVisitTeeth': [
                {
                    'VisitNumber': 1,
                    'Tooth': 3,
                    'ProcedureName': 'Crown',
                    'ProcedureCostDollars': 25,
                    'ProcedureCostCents': 42
                }
            ]
        }
    })
    .then((res) => {
        if (res.data.error) {
            console.log(res.data.error)
        } else {
            console.log(res.data)
        }
    })
    .catch((err) => {
        console.log(err)
    });
```

----