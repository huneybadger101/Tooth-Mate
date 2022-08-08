# DentalSoftware

# Installing

- First clone the repo - `git clone https://github.com/matthewPiersonUni/dentalSoftware/`
- Move into the backend folder - `cd dentalsoftware_backend`
- Install the Node dependencies - `npm install`
- Start the API - `npm start`
- Open a new terminal window and move into the frontend folder - `cd ../dentalsoftware_frontend`
- Install the Node dependencies - `npm install --force` (The `force` flag is required due to some version conflicts, there is no issue in the actual application however)
    - If `npm` hangs while installing dependencies, cancel the install with `ctrl + c` and re-reun it. Sometimes it can get stuck forever, however rerunning `npm install --force` should allow the dependecies to install correctly
- Start the webpack watcher - `npm run dev`
- Open a new terminal window in the `dentalsoftware_frontend` folder and start the application - `npm start`

You should now have the main application and the API both up and running!

## API Documentation

Please visit [this link](./dentalsoftware_backend/documentation/README.md) to read the API documentation.