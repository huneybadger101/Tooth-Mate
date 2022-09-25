# Login Endpoints


`/login/loginAccount` -> Takes in a username + password and compares them to existing data in the database. Will return success = 1 if the salted + hashed given password matches that of the password that is in the database.

- Request type: Post
- Required Headers: String - `username`, String - `password`
- Optional Headers: None
- Error: In the `response.data` dictionary, `result` will be equal to `1` and `error` will contain the full error logs

Example Code -> 
```
axios.post('http://localhost:3000/login/loginAccount', null, {
    headers: {
        'username': 'accountUsername',
        'password': 'accountPassword'
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