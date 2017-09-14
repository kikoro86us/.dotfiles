#!/bin/bash

RED="\033[0;31m"
CLEAR="\033[0m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
#initialize app
# printf '\33c\e' &&
create-react-app "$1" && 
cd "$1" && 
#install additional common dependencies
# printf '\33c\e' &&
echo -e "\nInstalling ${CYAN}axios${CLEAR} and ${CYAN}react-router-dom${CLEAR}\n" &&
npm i -s axios react-router-dom && 
#restructure file tree
# printf '\33c\e' &&
echo -e "\nDeleting the crap from ${CYAN}create-react-app${CLEAR},\nand adding ${GREEN}utilities${CLEAR}, ${GREEN}css${CLEAR}, and ${GREEN}components${CLEAR} folders\n" &&
rm -rfv ./src/* ./public/favicon.ico ./README.md && 
mkdir ./src/utilities ./src/css ./src/components &&
#rebuild index.js and App.js
# printf '\33c\e' &&
echo -e "\nBuilding ${GREEN}App.js${CLEAR} and ${GREEN}index.js${CLEAR}. Also here's a ${GREEN}README${CLEAR}.\n\n" &&
touch ./src/components/App.js ./src/index.js README.md && 
printf "import React from 'react'\nimport ReactDOM from 'react-dom'\nimport App from './components/App'\n\nReactDOM.render(\n\t<App />,\ndocument.getElementById('root'))">> ./src/index.js && 
printf "import React, { Component } from 'react'\n\nexport default class App extends Component {\n\trender(){\n\t\treturn (\n\t\t\t<div className='App'>\n\t\t\t\t<p>Testing!</p>\n\t\t\t</div>\n\t\t)\n\t}\n}">> ./src/components/App.js &&
for i
do
    if [ $i == 'sass' ] 
    then 
        mv ./src/css ./src/sass &&
        # clear &&
        echo -e "You've run this command with the ${RED}sass${CLEAR} argument. Here are your ${GREEN}reset${CLEAR}, ${GREEN}main${CLEAR} and ${GREEN}variables${CLEAR} files\n" &&
        cp ~/Codes/_reset.scss ./src/sass &&
        touch ./src/sass/main.scss ./src/sass/_variables.scss &&
        rm ./src/components/App.js &&
        touch ./src/components/App.js &&
        printf "import React, { Component } from 'react'\nimport '../sass/main.scss'\n\nexport default class App extends Component {\n\trender(){\n\t\treturn (\n\t\t\t<div className='App'>\n\t\t\t\t<p>Testing!</p>\n\t\t\t</div>\n\t\t)\n\t}\n}">> ./src/components/App.js
        printf "@import 'reset';\n@import 'variables';\n">> ./src/sass/main.scss &&
        #install dependencies
        printf "Installing sass dependencies ${CYAN}npm-run-all${CLEAR} and ${CYAN}node-sass-chokidar${CLEAR}...\n\n" &&
        npm i -s npm-run-all node-sass-chokidar && 
        #update package.json with additional scripts
        echo -e "Updating ${GREEN}package.json${CLEAR} and ${GREEN}.gitignore${CLEAR}...\n\n" &&
        json -If package.json -e 'this.scripts["build-css"] = "node-sass-chokidar src/ -o src/"' &&
        json -If package.json -e 'this.scripts["watch-css"] = "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive"' &&
        json -If package.json -e 'this.scripts["start-js"] = "react-scripts start"' &&
        json -If package.json -e 'this.scripts["start"] = "concurrently \"watch-css\" \"start-js\""' &&
        json -If package.json -e 'this.scripts["build"] = "npm run build-css && react-scripts build"'&&
        #update .gitignore with sass
        printf '\n# SASS \nsrc/**/*.css'>> .gitignore
    fi

    
    if [ $i == 'full' ]
    then 
        # clear &&
        echo -e "You've run this command with the ${RED}full${CLEAR} argument. Installing ${CYAN}express${CLEAR}, ${CYAN}express-session${CLEAR}, ${CYAN}body-parser${CLEAR}, ${CYAN}dotenv${CLEAR}, and ${CYAN}cors${CLEAR}\n"&&
        npm i -s express express-session body-parser cors dotenv &&
        # clear &&
        echo -e "Adding ${GREEN}server${CLEAR} folder, ${GREEN}main.js${CLEAR}, and ${GREEN}.env${CLEAR} files...\n" &&
        mkdir ./server &&
        touch ./server/main.js ./.env
        printf "SERVER_PORT=3001">> ./.env
        printf "require('dotenv').config()\n\nconst express = require('express')\n\t//, session = require('express-session')\n\t, bodyParser = require('body-parser')\n\t, cors = require('cors')\n\t, app = express()\n\napp.use(bodyParser.json())\napp.use(cors())\n\napp.listen(process.env.SERVER_PORT, _=>{console.log('(I)...(I) '+process.env.SERVER_PORT)})">> ./server/main.js
    fi
done
# printf '\33c\e' &&
printf "Opening VSCode...\n\n" &&
code .
# printf '\33c\e'
