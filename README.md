# GLS-APP

A simple web application that allows users to create, read, and update “opportunities” (requests from customers for help). The app includes:

Frontend: A React-based UI

Backend: A Node.js/Express API

Database: MongoDB for data storage


## Setup for local deployment

### Requirements

- nvm [install link](https://github.com/nvm-sh/nvm) - to manage your node version
- docker engine [install link](https://www.docker.com/products/docker-desktop/) - to run the database

### Setting up

1. Clone this repo: `git clone https://github.com/jleigh-100/gls-app.git`.
2. In a terminal, in `gls-app`'s root, run `sh setup.sh`, which will run the setup script. This does 3 things:
  - Ask you which ports you wish to run the project on. Leaving these blank will use the defaults of:
    - Client: **3000**
    - Server: **27017**
  - run `nvm install`, which will install and use the node version currentl in [`.nvmrc`](./.nvmrc)
  - run `npm install`, which will install all dependancies for you

  If you wish to update the ports used, either re-run the command, or update them in [`.env`](./.env);


## Running locally

1. Run `nvm use` to use the correct node version in your terminal
2. Run the client and DB together by running `npm start` in the project's root
