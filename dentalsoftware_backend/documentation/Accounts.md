# Accounts Endpoints

`/accounts/getAllAccounts` -> Returns a dictionary containing all items in the Accounts table.

- Request type: Post
- Required Headers: None
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/accounts/getAllAccounts')
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

`/accounts/deleteAccount` -> Deletes an existing item in the Accounts table.

- Request type: Post
- Required Headers: String - `accountid`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/accounts/deleteAccount', null, {
    headers: {
        'bookingid': 2
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

`/accounts/updateAccount` -> Updates an existing item in the Accounts table.

- Request type: Post
- Required Headers: String - `accountid`, JSON String - `cols`, JSON String - `vals`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/accounts/updateAccount', null, {
    headers: {
        'accountid': 2,
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

`/accounts/createNewAccount` -> Creates a new Account entry in the Accounts table in the Database.

- Request type: Post
- Required Headers: String - `usernmae`, String - `password`, Number - `accessLevel`, Number - `dentistNumber`, String - `DOB`, String - `Email_Address`, String - `Contact_Number`.
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/accounts/createNewAccount', null, {
    headers: {
        'username': 'accountUsername',
        'password': 'accountPassword',
        'accessLevel': 2,
        'dentistNumber': 2,
        'DOB': '1999/9/4',
        'Email_Address': 'example@gmail.com',
        'Contact_Number': '0221224336'

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