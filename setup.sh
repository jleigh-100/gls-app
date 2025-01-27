#!/bin/bash
echo "Setting up the project..."

echo "By default, this project runs on port 3000."
echo "If you would like to change it, enter a new port number, otherwise leave blank:"
read -p "" newport

if [[ ! -z "$newport" && $((newport)) != $newport ]]; then
    echo ""
    echo "!!!!!!!!!!!!!!!!"
    echo "! Setup failed !"
    echo "!!!!!!!!!!!!!!!!"
    echo ""
    echo "The port can only contain numbers."
    echo "Please run this script again."
    echo ""
    exit
fi

if [ -z "$newport" ]; then
    echo "Port will remain 3000"
    newport=3000
else    
    echo "Changing port to $newport..."
fi

if ! [ -f server/secrets/.env ]; then # if .env file doesn't exist, create it
    touch server/secrets/.env
    echo "PORT=$newport" > server/secrets/.env
else # otherwise replace the port number
    sed -i "" -E "s/PORT=.*/PORT=$newport/" server/secrets/.env
fi
echo "Port is now set to $newport"

echo "Installing dependencies..."
echo "--------------------------------------------------------------------------"
npm i # run an npm install to install dependencies
echo "--------------------------------------------------------------------------"
echo "Dependencies installed."
echo ""
echo "Setup complete."
echo ""
echo "You should not need to run this script again."
echo ""
echo "You should now run 'npm start' from the project's root to start the project."
echo ""