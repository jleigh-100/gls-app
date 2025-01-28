# GLS-APP

A simple web application that allows users to create, read, and update “opportunities” (requests from customers for help). The app includes:

Frontend: A React-based UI

Backend: A Node.js/Express API

Database: MongoDB for data storage


## Setup for local deployment

1. Clone this repo: `git clone https://github.com/jleigh-100/gls-app.git`.
2. In a terminal, in `gls-app`'s root, run `sh setup.sh`, which will run the setup script. It will prompt you to enter a port number you would like to run the dev server on. The default is port for the client is 3000, and for the db is 27017. By pressing enter with nothing entered when prompted will keep the project using the default ports. Entering any number will update the .env file (./.env) with the specified port(s). It will also run `npm install` for you, installing all dependencies. **You should only need to run this file once**.

## Running locally

You can run the client and DB together by running `npm start` in the project's root.
