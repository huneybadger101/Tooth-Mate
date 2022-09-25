# Quotes Endpoints

`/quotes/getAllQuotes` -> Returns a dictionary containing all items in the Quotes table.

- Request type: Post
- Required Headers: None
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/quotes/getAllQuotes')
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

`/quotes/deleteQuote` -> Deletes an existing item in the Quotes table.

- Request type: Post
- Required Headers: String - `quoteid`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/quotes/deleteQuote', null, {
    headers: {
        'quoteid': 1
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

`/quotes/deleteAllQuotesForPatient` -> Deletes all existing quotes in the Quotes table which are assigned to a given patientID.

- Request type: Post
- Required Headers: String (ID) - `patientid`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/quotes/deleteAllQuotesForPatient', null, {
    headers: {
        'patientid': 1
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

`/quotes/updateQuote` -> Updates an existing item in the Quotes table.

- Request type: Post
- Required Headers: String - `quoteid`, JSON String - `cols`, JSON String - `vals`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/quotes/updateQuote', null, {
    headers: {
        'quoteid': 2,
        'cols': '{"cols": [DATA_HERE]}',
        'vals': '{"vals": [DATA_HERE]}'
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


`/quotes/createNewQuote` -> Creates a new Quote entry in the Quotes table in the Database.

- Request type: Post
- Required Headers: Number (ID) - `patientID`, Number (ID) - `bookingID`, Number (ID) - `dentistID`, Number - `totalCostDollars`, Number - `TotalCostCents`.
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/quotes/createNewQuote', null, {
    headers: {
        'data': {
            'patientID': 1,
            'dentistID': 1,
            'bookingID': 1,
            'totalCostDollars': 25,
            'totalCostCents': 0
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