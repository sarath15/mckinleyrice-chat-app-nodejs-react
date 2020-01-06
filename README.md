## Requirements

* Node 8 or Greater
* NPM
* Git

Without any changes, this app is connected to a Contentful space with read-only access. To experience the full end-to-end Contentful experience, you need to connect the app to a Contentful space with read _and_ write access. This enables you to see how content editing in the Contentful web app works and how content changes propagate to this app.

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/sarath15/mckinleyrice-chat-app-nodejs-react.git
```
Navigate to API project, install dependencies and start the application
```
cd mckinleyrice-chat-app-nodejs-react/chat-API-nodeJs

npm i

node index.js
```
Now the API and websocket will run under http://localhost:3001


Navigate to UI project, install dependencies and start the application

```bash
cd mckinleyrice-chat-app-nodejs-react/chat-UI-reactJs

npm i

npm start
```
then got to http://locahost:3000 to access the login and chat page.

