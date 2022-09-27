# Patients Endpoints

`/patients/getAllPatientData` -> Returns a dictionary containing all items in the Patients table.

- Request type: Post
- Required Headers: None
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/patients/getAllPatientData')
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

`/patients/getAllPatientDataByID` -> Gets all of a patients data (Including Teeth data) by a given ID.

- Request type: Post
- Required Headers: String (ID) - `id`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/patients/getPaitientDataByID', null, {
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

`/patients/deletePatientData` -> Deletes a patients data based of a given NHI number.

- Request type: Post
- Required Headers: String (NHI) - `nhinumber`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/patients/deletePatientData', null, {
    headers: {
        'nhinumber': '123ABC'
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

`/patients/updatePatientData` -> Updates an existing item in the Patients table.

- Request type: Post
- Required Headers: String (NHI) - `nhinumber`, JSON String - `cols`, JSON String - `vals`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/patients/updatePatientData', null, {
    headers: {
        'nhinumber': '123ABC',
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


`/patients/createNewPatient` -> Creates a new Patient entry in the Patient table in the Database.

- Request type: Post
- Required Headers: String (NHI) - `patient_nhi`, String - `patient_First_Name`, String - `patient_Last_Name`, String - `patient_DOB`, String - `patient_Contact_Number`, String - `patient_Email_Address`.
- Optional Headers: String - `patient_Middle_Name`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/bookings/createNewAccount', null, {
    headers: {
        'data': {
            'patient_NHI': 'ABC123',
            'patient_First_Name': 'FirstName',
            'patient_Middle_Name': 'MiddleName',
            'patient_Last_Name': 'LastName',
            'patient_DOB': '1999/9/4',
            'patient_Contact_Number': '0221532331',
            'patient_Email_Address': 'email@gmail.com'
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