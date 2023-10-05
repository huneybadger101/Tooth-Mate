
Tooth Mate project

Description:
The Tooth Mate project is to develop comprehensive Customer Relationship Management (CRM) software for dental professionals. The software aims to streamline appointment management, enable voice note-taking, and store dental graphics and images as dynamic 3D models. Moreover, it is designed to ensure seamless data export to the Tooth Mate mobile app. This project's goal is to facilitate effective and efficient dental practice management, allowing dentists to concentrate more on providing quality patient care.

A brief summary of the project and its purpose:
The purpose of this project is to continue developing the Tooth Mate app from last year's students, which will facilitate communication between dentists and their patients. This will be particularly helpful for parents with young children as it will help them start an oral healthcare routine with their kids. The app aims to promote oral health in New Zealand, where the oral health system is poorly functioning, causing long wait lists for patients. By providing accessible and understandable dental information and advice through the app, the project aims to minimize the amount of treatment that patients must pay for in the long run, reducing costs and increasing continuity of care. Our role in this project is to continue the development of Tooth Mate to get a workable prototype running that the client can present to potential investors.

Installation:

Use this command to clone:

gh repo clone Puttipat-P/Tooth-Mate


To run backend:

Firstly, download sql database file then import it to mysql database.

Secondaly, go to vscode terminal using this command:
cd toothmate_current_team_backend

then use command to start the server:

node server.js



To run front end:

cd toothmate_current_team

then use command(used to install all dependencies or devDependencies from a package):

npm install

to start the frontend webapp use:

npm start




Usage:

suitCRM:


Application usage:
This is the main page. Firstly, search NHI and it will show dropdown result of the similar match from database.

 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/a33482e7-44b0-4c63-b7e2-8032122eb785)

Example:

 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/6736ee49-c70c-475b-a066-d6d6d231bf9e)


This is the patent info. This can be edit by click on edit and then save.
 
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/37b8bf64-c3ca-4337-ae78-143936ab8515)







This is for the dentist to note the treatment.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/a6f64112-e53d-4928-aa60-44e2949451ff)

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/5b47ff96-163f-4c7e-80eb-23301d289bfb)

 
To see patient history, click on patient history. This is patient History which use to record patient treatment.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/c3aa4d56-2e3f-4974-aa9d-7997f5104eea)

 


After double click on the model in treatment page. The user can select umbrella treatment, tooth surface and click add to list.
 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/e7a3bd6d-ac56-40a2-af88-4f7639005808)


The chosen umbrella treatment and tooth surface will show on treatment summary. After that click submit. The treatment summary will display on treatment plan.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/f6d0a9ab-195c-4551-aabc-d860718a6b40)

 


To see treatment plan. Click on treatment plan button.
 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/1b06b127-7983-4e2c-96aa-d8aeefc773eb)


After finish everything. Click save and then ok.
 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/3b34a373-d416-438a-9e4d-34b9cbaa933c)
 

The save information will display in patient history.
 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/9c8cbc68-e662-48e6-86ae-09a2edd435d9)
 

Click on the date of the treatment to show the treatment detail that the user save.
 ![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/0871f41c-b652-4d93-a5b4-e38977e16d91)



To view or edit the periodontal chart. Go to periodontal page and double click on teeth model.
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/91cbd143-320c-4318-b29c-1fd82c9245c3)
 

To update the treatment history note, treatment plan and patent info. After updated the information click on update. For example, below:
![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/61f81532-aa2d-4091-ae62-1c41942a2bb4)

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/bfe9e219-c520-4969-b865-5e6a764e289b)

![image](https://github.com/Puttipat-P/Tooth-Mate/assets/83695784/f260e93c-dbba-46e6-b03e-688789efcfa3)



 

Key Features and Requirements: 
The Tooth Mate software will encompass the following features and requirements: 
1.	User-friendly interface for easy navigation and usage 
2.	Advanced appointment management system 
3.	Voice recognition capabilities for efficient note-taking 
4.	Data export functionality for the Tooth Mate app 
5.	Visualization capabilities for creating 3D dynamic models of dental charts (for both adult and child teeth) 
6.	Inclusion of a periodontal chart 
7.	Treatment planning capabilities via a web interface 
8.	Role-based user permissions for secure access control 

Githup folder:
Tooth mate team 2022 folder:
dentalsoftware_backend
dentalsoftware_frontend

Tooth mate team 2023 folder:
Node_modules
Toothmate_current_team
