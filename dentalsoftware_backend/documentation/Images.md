# Images Endpoints

[Back](./README.md)

`/images/getAllImagesForPatient` -> Returns a dictionary containing all images for the given patient in the Images table.

- Request type: Post
- Required Headers: Number (ID) - `id`
- Optional Headers: String - `searchitem`
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/images/getAllImagesForPatient', null, {
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

`/images/deleteImage` -> Delete an image by it's ID.

- Request type: Post
- Required Headers: Number (ID) - `imageID`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/images/deleteImage', null, {
    headers: {
        'imageID': 2
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

`/images/createNewImage` -> Creates a new Image entry in the Image table in the Database.

- Request type: Post
- Required Headers: Number (ID) - `patientID`, String - `imagePath`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/images/createNewImage', null, {
    headers: {
        'data': {
            'patientID': 2,
            'imagePath': 'C:/Users/Matty/Desktop/ImageOne.png'
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