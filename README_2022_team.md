# DentalSoftware

# Installing MySQL
- Windows/MacOS: Visit [this site](https://www.apachefriends.org/) and download XAMPP. Install it and start Apache and MySQL.
- Linux Distributions: Use your package manager of choice to install MySQL. E.G:
    - `sudo apt install mysql-server`
    - `sudo systemctl start mysql.service`

# Installing

- First clone the repo - `git clone https://github.com/matthewPiersonUni/dentalSoftware/`
- Move into the backend folder - `cd dentalsoftware_backend`
- Install the Node dependencies - `npm install`
- Create a `.env` file and ensure it contains the following entries:

    ```
    MYSQL_DATABASE_URL="IP_ADDRESS_OF_YOUR_MYSQL_INSTANCE"
    MYSQL_DATABASE_USERNAME="USERNAME_FOR_DATABASE"
    MYSQL_DATABASE_PASSWORD="PASWORD_FOR_DATABASE"
    MYSQL_DATABASE_NAME="NAME_OF_DATABASE"
    MYSQL_DATABASE_PORT=PORT_FOR_DATABASE (Number not String)
    ```
    
- Start the API - `npm start`
- Open a new terminal window and move into the frontend folder - `cd ../dentalsoftware_frontend`
- Install the Node dependencies - `npm install --force` (The `force` flag is required due to some version conflicts, there is no issue in the actual application however)
    - If `npm` hangs while installing dependencies, cancel the install with `ctrl + c` and re-reun it. Sometimes it can get stuck forever, however rerunning `npm install --force` should allow the dependecies to install correctly
- Start the webpack watcher - `npm run dev`
- Open a new terminal window in the `dentalsoftware_frontend` folder and start the application - `npm start`

You should now have the main application and the API both up and running!

# API Documentation

Please visit [this link](./dentalsoftware_backend/documentation/README.md) to read the API documentation.
