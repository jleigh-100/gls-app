# GLS-APP

A simple web application that allows users to create, read, and update “opportunities” (requests from customers for help). The app includes:

Frontend: A React-based UI
Backend: A Node.js/Express API
Database: MongoDB for data storage


## Setup for local deployment

1. Clone this repo: `git clone https://github.com/jleigh-100/gls-app.git`.
2. In a terminal, in `gls-app`'s root, run `sh setup.sh`, which will run the setup script. It will prompt you to enter a port number you would like to run the dev server on. The default is port 3000, and pressing enter with nothing entered when prompted will keep the project using port 3000. Entering any number will update the .env file (server/secrets/.env) with the specified port. It will also run `npm install` for you, installing all dependencies. **You should only run this file once**.

## Running locally

1. Once the setup script has been run, or the next time you want to run the web app, just run `npm start` in a termial which is open at the project's root.
2. Unless changed from the default, you should access the client from `localhost:3000`.


### Things that you'll probably want to change:
[The title of the index.ejs page](client/index.ejs#L4)
[Theme colours](client/src/theme/theme.json)
[Favicon](client/public/favicon.ico)
[App.jsx][client/src/components/App.jsx] - This uses the login page by default
[Login API Router](server/routes/apiRouter.js) - Again, no login page means no need for login api
