
# Tooth Mate project

# Description:
The Tooth Mate project includes the development of comprehensive Customer Relationship Management (CRM) software for dental professionals. The software aims to streamline appointment management, enable voice note-taking, and store dental graphics and images as dynamic 3D models. Moreover, it is designed to ensure seamless data export to the Tooth Mate mobile app. This project's goal is to facilitate effective and efficient dental practice management, allowing dentists to concentrate more on providing quality patient care.

# A brief summary of the project and its purpose:
The purpose of this project is to continue developing the Tooth Mate app from last year's students, which will facilitate communication between dentists and their patients. This will be particularly helpful for parents with young children as it will help them start an oral healthcare routine with their kids. The app aims to promote oral health in New Zealand, where the oral health system is poorly functioning, causing long wait lists for patients. By providing accessible and understandable dental information and advice through the app, the project aims to minimize the amount of treatment that patients must pay for in the long run, reducing costs and increasing continuity of care. Our role in this project is to continue the development of Tooth Mate to get a workable prototype running that the client can present to potential investors.


# Installation:

Use this command to clone:

`gh repo clone Puttipat-P/Tooth-Mate`




- ###  To run Backend:

Firstly, download the sql database file then import it to mysql database.

Secondly, open the vscode terminal and change directory using this command:


`cd toothmate_current_team_backend`

then use command to start the server:

`node server.js`




- ### To run Front End:
Change to the Front End directory:

`cd toothmate_current_team`

then use command(used to install all dependencies or devDependencies from a package):

`npm install`

to start the frontend webapp use:

`npm start`

# Updating Links
### Connect Frontend to Backend Configuration 

To connect the Backend to the Frontend, you will need to update the base URL route link in the api folder to match where your backend is hosted. This is because we will be turning off our ngrok server. 

For example, the below may be updated to `http://localhost:5000` if the backend is hosted locally at port 5000: 

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/33407458/887ecc1c-447c-4a35-bb3d-6cc845fef14d)

We recommend continuing with either a free local hosting service such as ngrok, or a reliable cloud hosting service. 

 

### Connect CRM to Medical Page 

To connect the CRM to the Medical Page, you will need to update the connecting link in the CRM. 
 
Note: This is assuming that the Vercel link (https://tooth-mate-current-team.vercel.app/) is no longer working due to the connected GitHub repository’s ownership being transferred. 
 
 Open a patient like below: 
 
<img width="757" alt="meow" src="https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/6b1746f8-7222-4471-8524-12caeaf59620">


 Then change the medicalPage link to the Medical Page’s current link e.g. `http://localhost:3000`

We recommend hosting the frontend on Vercel so that the latest updates to Medical Page can be easily viewed without having to run the development version locally.


# Usage:

### suitCRM:


### Application usage:

This is the main page. Firstly, search NHI and it will show the dropdown result of similar matches from the database.

 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/a33482e7-44b0-4c63-b7e2-8032122eb785)

Example:

 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/6736ee49-c70c-475b-a066-d6d6d231bf9e)

-
This is the patent info. It can be edited by clicking edit and then saved.
 
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/37b8bf64-c3ca-4337-ae78-143936ab8515)






-
This is for the dentist to note the treatment.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/a6f64112-e53d-4928-aa60-44e2949451ff)

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/5b47ff96-163f-4c7e-80eb-23301d289bfb)

 -
To see patient history, click on patient history. This is patient History which displays recorded patient treatments.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/c3aa4d56-2e3f-4974-aa9d-7997f5104eea)

 

-
After double-clicking a tooth in the Treatment Plan model, a popup will open. The user can select the treatment, then tooth surfaces and click add to list.
 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/e7a3bd6d-ac56-40a2-af88-4f7639005808)

-
The chosen umbrella treatment and tooth surface will show on Treatment Summary. After that click submit. The treatment summary will display on Treatment Plan.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/f6d0a9ab-195c-4551-aabc-d860718a6b40)

 

-
To see planned Treatments, click on the Treatment Plan button.


![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/1b06b127-7983-4e2c-96aa-d8aeefc773eb)

-
After finishing everything click save and then ok.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/3b34a373-d416-438a-9e4d-34b9cbaa933c)
 
-
The saved information will display in Patient History.

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/9c8cbc68-e662-48e6-86ae-09a2edd435d9)
 
-
Click on the date of the treatment to show the saved treatment details.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/0871f41c-b652-4d93-a5b4-e38977e16d91)


-
To view or edit the periodontal chart. Open the Periodontal Plan view and double-click on the teeth model.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/91cbd143-320c-4318-b29c-1fd82c9245c3)
 
-

To update the Treatment History notes, Treatment Plan and Patent Info - After updating the information click on update. 
For example, below:
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/61f81532-aa2d-4091-ae62-1c41942a2bb4)

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/bfe9e219-c520-4969-b865-5e6a764e289b)

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/f260e93c-dbba-46e6-b03e-688789efcfa3)



 

# Key Features and Requirements: 
The Tooth Mate software will encompass the following features and requirements: 
1.	User-friendly interface for easy navigation and usage 
2.	Advanced appointment management system 
3.	Voice recognition capabilities for efficient note-taking 
4.	Data export functionality for the Tooth Mate app 
5.	Visualization capabilities for creating 3D dynamic models of dental charts (for both adult and child teeth) 
6.	Inclusion of a periodontal chart 
7.	Treatment planning capabilities via a web interface 
8.	Role-based user permissions for secure access control 

# Githup folder:
Tooth mate team 2022 folder:
- dentalsoftware_backend
- dentalsoftware_frontend

Tooth mate team 2023 folder:
- Node_modules
- Toothmate_current_team
