# Bookings Endpoints

[Back](./README.md)

`/bookings/getAllBookings` -> Returns a dictionary containing all items in the Bookings table.

- Request type: Post
- Required Headers: None
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/bookings/getAllBookings')
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

`/bookings/getBookingDataByID` -> Returns a dictionary containing all items in the Bookings table.

- Request type: Post
- Required Headers: Number - `id`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/bookings/getBookingDataByID', null, {
    headers: {
        'id': 2
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

`/bookings/deleteBooking` -> Deletes an existing item in the Bookings table.

- Request type: Post
- Required Headers: String - `bookingid`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/bookings/deleteBooking', null, {
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

`/bookings/updateBooking` -> Updates an existing item in the Bookings table.

- Request type: Post
- Required Headers: String - `bookingid`, JSON String - `cols`, JSON String - `vals`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/bookings/deleteBooking', null, {
    headers: {
        'bookingid': 2,
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

`/bookings/createNewBooking` -> Creates a new Booking entry in the Bookings table in the Database.

- Request type: Post
- Required Headers: Number (ID) - `patientID`, String - `Date`, String `Time`, Number (ID) - `dentistID`, String - `procedure`, String - `affectedAreas`, String - `PatientAttended`, JSON String Array - `dentalCharts`.
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/bookings/createNewAccount', null, {
    headers: {
        'data': {
            'patientID': 1,
            'Date': '2022/11/25',
            'Time': '10:25',
            'dentistID': 2,
            'procedure': 'Initial Checkup',
            'affectedAreas': 'Top Right',
            'PatientAttended': 'NO',
            'dentalCharts': /* JSON String Array of Dental Charts, can be more then one */ '[
                    {
                        'data1': True,
                        'data2': True,
                        'data3': False,
                        'data4': False,
                        'data5': False,
                        'data6': False,
                        'data7': False,
                        'data8': True,
                        'data9': False,
                        'procedure': 'Initial Checkup',
                        'procedureLength': '2 Hours',
                        'procedureCost': '$20.50',
                        'notes': 'Notes here',
                        'tooth': 'All Quadrants - Entire mouth'
                    },
                ]'
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