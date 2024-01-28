# WeCanChat (comp313-group-project)
chat in real time application

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
MONGODB_URL=<your_mongodb_url>
OPENAI_API_KEY=<your_openai_api_key>
PORT=<your_server_port>
```

### Features
1. Health Check Endpoint
Endpoint: /api/health
Method: GET
Description: Used for basic health checking. Responds with a JSON message "OK" when the server is running.



### Health Check:
Access the health check endpoint at http://localhost:<your_port>/api/health to ensure the server is running.

