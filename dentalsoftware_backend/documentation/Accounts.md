# Accounts Endpoints

`/getAllAccounts` -> Returns a dictionary containing all items in the Accounts table.

- Request type: Post
- Required Headers: None
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/getAllAccounts')
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

`/deleteAccount` -> Deletes an existing item in the Accounts table.

- Request type: Post
- Required Headers: String - `accountid`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/deleteAccount', {
    headers: {
        'bookingid': '2'
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

`/updateAccount` -> Updates an existing item in the Accounts table.

- Request type: Post
- Required Headers: String - `accountid`, JSON String - `cols`, JSON String - `vals`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/deleteAccount', {
    headers: {
        'accountid': '2',
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