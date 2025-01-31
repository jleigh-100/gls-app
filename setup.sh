#!/bin/bash
echo "Setting up the project..."

echo "By default, this project's frontend runs on port 3000 and db runs on port 27017."
echo "If you would like to change the frontend's port, enter a new port number, otherwise leave blank:"
read -p "" newclientport

echo "If you would like to change the port the Database runs on, enter a new port number, otherwise leave blank:"
read -p "" newserverport

if [[ ! -z "$newclientport" && $((newclientport)) != $newclientport ]]; then
    echo ""
    echo "!!!!!!!!!!!!!!!!"
    echo "! Setup failed !"
    echo "!!!!!!!!!!!!!!!!"
    echo ""
    echo "The ports can only contain numbers."
    echo "Please run this script again."
    echo ""
    exit
fi

if [[ ! -z "$newserverport" && $((newserverport)) != $newserverport ]]; then
    echo ""
    echo "!!!!!!!!!!!!!!!!"
    echo "! Setup failed !"
    echo "!!!!!!!!!!!!!!!!"
    echo ""
    echo "The ports can only contain numbers."
    echo "Please run this script again."
    echo ""
    exit
fi

if [ -z "$newclientport" ]; then
    echo "Client port will remain 3000"
    newclientport=3000
else    
    echo "Changing port to $newclientport..."
fi

if [ -z "$newserverport" ]; then
    echo "Server port will remain 27017"
    newserverport=27017
else    
    echo "Changing port to $newserverport..."
fi

if ! [ -f .env ]; then # if .env file doesn't exist, create it
    touch .env
    echo "CLIENT_PORT=$newclientport" >> .env
    echo "SERVER_PORT=$newserverport" >> .env
else # otherwise replace the port number
    sed -i "" -E "s/CLIENT_PORT=.*/CLIENT_PORT=$newclientport/" .env
    sed -i "" -E "s/SERVER_PORT=.*/SERVER_PORT=$newserverport/" .env
fi
echo "Ports have now been set to $newclientport and $newserverport."

echo "Setting up Node Version Manager..."
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
nvm install # use the correct node version

echo "Installing dependencies..."
echo "--------------------------------------------------------------------------"
npm i # run an npm install to install dependencies
echo "--------------------------------------------------------------------------"
echo "Dependencies installed."
echo ""
echo "Setup complete."
echo ""
echo "You should now run 'nvm use' then 'npm start' from the project's root to run the project."
echo ""