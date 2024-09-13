# LLI-Assessment-Exam
Faculty Profile 

Starting the app (First Time)
npm install for back-end and front-end


Starting the Back-end:
cd back-end; npm start

Starting the Front-end:
cd front-end\exam; npm run dev


Problems & Fixes:


SQL Server Issues:

-had a problem with the login into ssms with the created user, checked the trust certificate and tried login again and it finally works

-the sql server(express) services is not running at the first so i manually checked the services and started it along with the sql server booster

-and then the tcp/ip is disable so i manually enabled it so i can use the port for the backend


Front-end Issues:

-had problem with the delete function when making it a component type, so i just mixed the delete along with edit/update in the dashboard

-Implemented a simple security which is a random 6-digit authentication token saved in local storage. The token is cleared from local storage upon logout, ensuring the dashboard is unaccessible unless logged in.