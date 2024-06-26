# WeCanChat chat in real time application
WeCanChat is a full-stack, real-time chat application built with Node.js and React.js. It allows users to send and receive messages instantly, providing a seamless communication experience.

## High Level Diagram

![Alt text](./imgs/diagram.drawio.png)

## Backend
The backend server is implemented with Node.js and uses the following libraries:

- *express*: A web application framework for Node.js, used to build the API endpoints.
- *socket.io*: Enables real-time, bidirectional and event-based communication between the browser and the server.
- *mongoose*: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to manage relationships between data, provide schema validation, and translate between objects in code and the representation of those objects in MongoDB.

## Frontend 
The frontend client is built with React.js and uses the following libraries:

- *react-router-dom*: A collection of navigational components that compose declaratively with your application.
- *socket.io-client*: The client-side library for socket.io, used to establish a connection to the server and send/receive events.
- *axios*: A promise-based HTTP client for the browser and Node.js, used to make API requests.
- *react-toastify*: Allows you to add notifications to your app with ease.

## Real-Time Chat
The real-time chat functionality is implemented using socket.io and socket.io-client. When a user sends a message, the client emits a message event to the server with the message data. The server then broadcasts this event to all other connected clients, which update their state to include the new message, causing the message to appear in the chat UI in real time.

## Getting Started
To get started with WeCanChat, clone the repository and install the necessary dependencies in both the server and client directories. Then, start the server and client, and navigate to the client URL in your browser. You can now start chatting in real time!

## Prerequisites
Make sure you have the following software installed on your machine:
- Node.js (version 18.18.2)
- npm (version 9.8.1)

## server side (backend)
server folder contains nodeJS code for the backend
```sh
cd server/
npm start
```

## client side (frontend)
client folder contains reactJS code for the frontend application

```sh
cd client/
npm start
```

# Deployments (Render)

## api deployed


### health endpoint 


must return {"msg":"OK"}

## website deployed



## Environment Variables:
Create a .env file in the root directory and configure the necessary environment variables, including MongoDB connection details, OpenAI API key, and other required parameters.

Example .env file:

```sh
PORT=<your_server_port>
MONGODB_URL=<your_mongodb_url>
SOCKET_ORI="*"
MAIL_USER="wecanchat.comp313@gmail.com"
MAIL_PASSWORD=<your_pass>
MAIL_WELCOME_SUBJECT="Welcome to WeCanChat!"
AVATAR_IMG="PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiM4YWNmMDA7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojREVBNTYxOyIvPjxwYXRoIGQ9Im0xNDEuODkgMTk1YTExNC43OSAxMTQuNzkgMCAwIDEgMzggMTYuNSAxMTUuNTUgMTE1LjU1IDAgMCAxLTEyOC40NyAwIDExNC43OSAxMTQuNzkgMCAwIDEgMzgtMTYuNWwxNS43NSAxNS43NWgyMXoiIHN0eWxlPSJmaWxsOiMwRDIwNEE7Ii8+PHBhdGggZD0ibTE0Ni40IDE5Ni4xNC0xNy40IDE3LjQ0LTEuMTcgMS4xN2gtMjQuMzRsLTEuMTgtMS4xNy0xNy40My0xNy40NGMxLjQ5LTAuNDEgMy0wLjc5IDQuNTEtMS4xNGw0LjY3LTEgMTIuNzQgMTIuNzRoMTcuNjlsMTIuNzMtMTIuNzQgNC42NyAxYzEuNTIgMC4zNSAzIDAuNzMgNC41MSAxLjE0eiIgc3R5bGU9ImZpbGw6IzAwZmZkZjsiLz48cGF0aCBkPSJtMTA5Ljk5IDE1LjU3Yy0xMy40NiAzLjYzMDEtMTkuNzg5IDExLjk1LTI0LjA2OSAyNC4wOC02Ljk5OTYtNy04LjczMDctMTAuODItNy41NjA2LTIxLjQzYTQxIDQxIDAgMCAwLTkuMjY5OCAyNC45ODhjMC4wMzY2IDcuNjc3NiA1LjY0NjIgMTMuOTM5IDEyLjY5NyAxNS4yOTctMTMuMzE1IDUuODEwNi0xNS4yNTggMjIuMDMzLTE0LjA0NSAzMy41MjQgNS43Njg3LTExLjg2MSAxNC4yNTQtMjAuOTgxIDI3LjI1OC0yMi45NTEtMC40MzAxNyA2LjYtMi41MDk5IDEwLjIyLTcuMjkgMTcuNjYgMTguMjktMi44NjAxIDI1LjExOS03LjgxOTkgMzcuMTUtMTguMjQgMC40NjAwMSAwIDEuMDAwMSAwLjA4OSAxLjQ2MDYgMC4xMjA1OC0wLjMzMDIzIDMuNTYwMS0xLjA5MDYgNi41NTk4LTUuMDAwNCAxMi40NiA5LjUyOTgtMS4zMiAxNC43MjEtNS44MDA2IDE3LjUzOS0xMS42NzEgOC44ODYyIDAuOTUzMTQgMTUuODM2IDYuNzg1IDIxLjI2IDE0LjgxOCAxLjkyOC0xNS4yMTEtNC40NzY2LTI2LjYtMTkuODA3LTM0LjAzNiAxLjQxNjctMi42OTc0IDguMDE0My0xMS45MjUgMTcuNjYxLTE1LjcyMS0xLjQyNC0wLjI4NTY5LTIuODg4My0wLjQ5NDg2LTQuNDAzMy0wLjYxMTI1LTUuNzEtMC40MTk5Mi0xMy42Mi0wLjk5OTgyLTI0Ljg5IDQuMTcwMyAyLjg1MDEtOC41MTAxIDEwLjIxLTExIDE4LjA1LTEzLjEyLTE1LjEzMS0xLjI1MDEtMjguNjEtMi41ODk4LTQwLjUzIDguMTgwMS0xLjg5OTctNi4yMS0wLjE4MDU1LTEyLjU0IDMuNzg4OS0xNy41MnoiIHN0eWxlPSJmaWxsOiMwMGZmZmQ7Ii8+PHBhdGggZD0ibTE3Mi42MyA2OS45NTRjMS4yMjkyIDE0LjA2NCAwLjkzODQxIDI5Ljk2IDAuMzQ2MzUgNDUuMTY5IDEuNzg4NyA2Ljc5NiAzLjAzNzkgMTMuMjM1IDMuODg0MiAxOC4zODhsMC4xMzk3My0wLjAxMWMxLjAwMDEgNi41NiAyLjM1OTcgMTMuMTggMy4yNjk4IDE5LjczIDIuMDAwMi02LjU2OTkgMi41MzAzLTE4LjI1IDMuMjQwNS0yNS40MyAxLjI1OTctMTMgMS44Mjk2LTI5LjMxMS0wLjQzMDE3LTQxLjkzMS0wLjg1MDQxLTQuNzItMi4wMDA3LTcuNjg5Ni0yLjAwMDctOC40Nzk2IDQuNjIwNSAzLjU2MDEgOC42NjA2IDkuMjIwNCAxMy4wMDEgMTQuMTUtMC42NzUxLTMuNDMxOC0xLjM0Ny02LjYwMDQtMi4wNTY3LTkuNTI3My00LjA0Ny01LjcxODMtMTMuNzI2LTEyLjE1NC0xOS4zOTMtMTIuMDZ6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im0xNTcuOTcgMzQuNDcxYy0xMC4zMzkgMi43NTc5LTE3LjcxNSAxMy41NDMtMTkuMTMyIDE2LjI0IDE1LjMzIDcuNDM2MSAyMC43ODMgMTcuOTYgMjEuMjc4IDMzLjUxNyA1Ljk1MzQgOC44MTc5IDEwLjA2NiAyMC4yODkgMTIuODU3IDMwLjg5NSAwLjg3NjM2LTEzLjE3OCAxLjgxODYtMjcuNzI2IDAuMjY1NjYtNDQuMjggMi41Njk4IDAuNDQ4NTcgOS4xMzcyIDEuMzkzNCAxOC43ODEgMTEuMTctMi4xMTU4LTguNzMyMS00LjU2NzEtMTUuMzEtOC40NTM5LTIwLjI4My00LjU1OTgtNS44NDAxLTEwLjk5OS0xMC40MzEtMjMuODA5LTEzIDkuNjUwMi0zLjM0IDE2LjI3LTAuNzY5OTMgMjUuNSAyLjEzMDEtOC4xMzg4LTcuNDMxNS0xNi40NzQtMTQuMjE5LTI3LjI4Ny0xNi4zODl6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im02MS40NzMgNzMuMzU0Yy03LjI1Ni0wLjc3NTAxLTEzLjAyNCAyLjM3NDYtMTYuMjYyIDUuMzg3OSAwLjczNzg5LTAuNDU0MDkgMS4zODY4LTAuNzQyMDggMS44NDg5LTAuNzQyMDggMCAwLTEuNTE5OCAxMC4zNTktMS42MTk3IDExLjUxOS0xLjU2IDE5LjczIDAuOTk5NTcgNDMuNDAxIDYuMzcgNjIuNDcxIDEuMzA5OSA0LjY4OTkgMS4xODk1IDMuMDg5MyAxLjg4OTgtMC45MTA3IDEuNzUyNi0xMC4wNjEgMy4zODkxLTI0LjcwMyA2Ljk3MzktMzguODY0LTUuMDY4LTE3LjYyNy00LjI1MDgtMzIuNDAzIDAuNzk5MzctMzguODYxeiIgc3R5bGU9ImZpbGw6bm9uZTsiLz48cGF0aCBkPSJtNjkuMDkgNDMuMjFjLTAuMDI1MyAxLjA4MDMtOGUtMyAyLjE2MTIgMC4wNTIzIDMuMjQwMi0zLjg0MDIgMC0xMi40NiAwLjcxOTg0LTE2IDIuMTU5OC00LjQ1MDQgMS44MDAxLTguNDggNS40ODAxLTExLjY3IDExLjgzIDcuMjk5OS0zLjk0IDExLjg5OS0zLjg1MDIgMTYuNjYtMS44MTAyLTEwLjM5IDMuNDUtMTkuNTIgMTEuMzctMjAuMzIgMjYuOSAxLjE0NTYtMS41MDUzIDQuNjA3OS00Ljk3ODkgNy4xMzkzLTYuNjI4NSAwLjA5LTAuMDU4NyAwLjE3NDI3LTAuMTA1NTYgMC4yNjE2Ny0wLjE1OTQ2IDMuNzE0MS0yLjMyMTEgOS4wNDk0LTUuMTI0NyAxNS4xODEtNC45NTUzLTUuMDUwMSA2LjQ1NzctNi42ODI0IDIwLjQzNCAwLjI4MjA3IDM4LjQyOCAxLjc4NjYtNy4wNTY3IDQuMDU3NC0xMy45OTQgNy4wNjgxLTIwLjE4NC0xZS0zIC0xMS42NjQgMi4wNzY0LTI3Ljc3NCAxNS4zOTEtMzMuNTg1LTcuMDUwOC0yLjE1MzgtMTIuNzA5LTcuOTkxLTE0LjA0My0xNS4yMzZ6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im0xNjEuNzMgODYuMDE2aC05Mi41MWMtMy4zNyAwLTYuMDAwMSAyLjM5OTgtNi4wMDAxIDUuMjk5OXYyOC40NWMwIDMuMDAwMiAyLjc0IDUuMzAwMSA2LjAwMDEgNS4zMDAxaDMyLjM2YzcuMDkwMSAwIDcuNDQtMTkuNDMgMTMuODItMTkuNDNzNi44ODAxIDE5LjQ0IDEzLjgzIDE5LjQ0aDMyLjM2YzMuMzcgMCA1Ljk5OTktMi40IDUuOTk5OS01LjMwMDF2LTI4LjQ2YzAuMTQwNDMtMi45MDAxLTIuNi01LjI5OTktNS45LTUuMjk5OXoiIHN0eWxlPSJmaWxsOiMxZjI2NDQ7Ii8+PHBhdGggZD0ibTE2MS43MyA4Ni4wMTZoLTkyLjUxYy0zLjM3IDAtNi4wMDAxIDIuMzk5OC02LjAwMDEgNS4yOTk5djI4LjQ1bDEwNC41NS0yOC40NWMwLTIuOTAwMS0yLjc0LTUuMjk5OS01Ljk5OTktNS4yOTk5eiIgc3R5bGU9ImZpbGw6IzliOTdjZTsiLz48cGF0aCBkPSJtMTYxLjczIDg2LjAxNmgtOTIuNTFjLTMuMzcgMC02LjAwMDEgMi4zOTk4LTYuMDAwMSA1LjI5OTl2MjguNDVjMCAzLjAwMDIgMi43NCA1LjMwMDEgNi4wMDAxIDUuMzAwMWgzMi4zNmM3LjA5MDEgMCA3LjQ0LTE5LjQzIDEzLjgyLTE5LjQzczYuODgwMSAxOS40NCAxMy44MyAxOS40NGgzMi4zNmMzLjM3IDAgNS45OTk5LTIuNCA1Ljk5OTktNS4zMDAxdi0yOC40NmMwLjE0MDQzLTIuOTAwMS0yLjYtNS4yOTk5LTUuOS01LjI5OTl6IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6NC4wMDI2cHg7c3Ryb2tlOiMzMDFlMTk7Ii8+PHBhdGggZD0ibTExOC41NyAxNjUuMTRhOC42NiA4LjY2IDAgMCAwLTIuNzYtNC4yM2gtMC42MmE4IDggMCAwIDAtMi43NiA0LjIyYy0wLjUyIDEuODkgMi4wNyAxMC42MSAyLjc2IDEyLjUzaDAuNjJjMC42NC0xLjc2IDMuMTktMTAuODIgMi43Ni0xMi41MnoiIHN0eWxlPSJmaWxsOiMxOTE5MTk7Ii8+PHBhdGggZD0ibTEwMi44MSAxNTIuMjRhMi40OTIxIDIuNDkyMSAwIDEgMSAxLjE5LTQuODRsMC4yMSAwLjA2YTM3LjEgMzcuMSAwIDAgMCA1LjQzIDEuMTIgNDQuNTIgNDQuNTIgMCAwIDAgMTEuNzYgMCAzNy4xIDM3LjEgMCAwIDAgNS40My0xLjEyIDIuNDkwMyAyLjQ5MDMgMCAwIDEgMS41OSA0LjcybC0wLjIxIDAuMDZhNDMuMDggNDMuMDggMCAwIDEtNi4xNSAxLjI5IDQ4LjU1IDQ4LjU1IDAgMCAxLTEzLjA4IDAgNDIuNzkgNDIuNzkgMCAwIDEtNi4xNy0xLjI5eiIgc3R5bGU9ImZpbGw6IzE5MTkxOTsiLz48L3N2Zz4="
```

### Features
1. Health Check Endpoint
Endpoint: /api/health
Method: GET
Description: Used for basic health checking. Responds with a JSON message "OK" when the server is running.



### Health Check:
Access the health check endpoint at http://localhost:<your_port>/api/health to ensure the server is running.

###
##
