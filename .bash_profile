export PS1="\[\033[36m\]\u\[\033[m\]\[\033[32m\]->>\[\033[93;1m\]\W\[\033[m\]🌚  "
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
export PATH=~/mongodb/bin:$PATH

#reassignment
alias ls='ls -GFha'
alias rm='rm -rfv'

#movement shortcuts
alias ~='cd ~ && ls -GFha'
alias cd1='cd ../ && ls -GFha'
alias cd2='cd ../../ && ls -GFha'
alias cd3='cd ../../../ && ls -GFha'
alias dm='cd ~/DevMountain && ls'
alias c='cd ~/Codes && ls'

#application shortcuts
alias music='open /Applications/iTunes.app'
alias server="ssh -i '~/.ssh/server.pem' ubuntu@54.70.75.71"
alias slack='open -a Slack'
alias code='open -a Visual\ Studio\ Code'
alias bscript='open -a Visual\ Studio\ Code ~/.bash_profile'
alias chrome='open -a Google\ Chrome'

react(){
    #initialize app
    create-react-app "$1" && 
    cd "$1" && 
    #install additional common dependencies
    printf "Installing axios and react-router-dom\n\n" &&
    npm i -s axios react-router-dom && 
    #restructure file tree
    printf "Deleting the crap from create-react-app,\nand adding a styles, utils, and components folder\n\n" &&
    rm -rfv ./src/* ./public/favicon.ico README.md && 
    mkdir ./src/utils ./src/js ./src/styles && 
    #rebuild index.js and App.jsx
    printf "Building App.jsx and index.js. Also here's a README.\n\n" &&
    touch ./src/js/App.jsx ./src/index.js README.md && 
    printf "import React from 'react'\nimport ReactDOM from 'react-dom'\nimport App from './js/App'\n\nReactDOM.render(\n\t<App />,\ndocument.getElementById('root'))">> ./src/index.js && 
    printf "import React, { Component } from 'react'\n\nexport default class App extends Component {\n\trender(){\n\t\treturn (\n\t\t\t<div className='App'>\n\t\t\t\t<p>Testing!</p>\n\t\t\t</div>\n\t\t)\n\t}\n}">> ./src/js/App.jsx && 
    #open VSCode and start dev server
    printf "Initializing git...\n\n" &&
    git init &&
    printf "Opening VSCode...\n\n" &&
    code . && 
    printf "And starting your dev server. Enjoy.\n\n" &&
    npm start    
}
sassme() {
    #bring in reset and init basic sass setup
    printf "Here are your reset, main and variables file\n\n" &&
    mv ./src/styles ./src/sass
    cp ~/Codes/_reset.scss ./src/sass &&
    touch ./src/sass/main.scss ./src/sass/_variables.scss
    printf "@import 'reset';\n@import 'variables';\n">> ./src/sass/main.scss &&
    #install dependencies
    printf "Installing sass dependencies...\n\n" &&
    npm i -s npm-run-all node-sass-chokidar && 
    #update package.json with additional scripts
    printf "Updating package.json...\n\n" &&
    json -If package.json -e 'this.scripts["build-css"] = "node-sass-chokidar src/ -o src/"' &&
    json -If package.json -e 'this.scripts["watch-css"] = "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive"' &&
    json -If package.json -e 'this.scripts["start-js"] = "react-scripts start"' &&
    json -If package.json -e 'this.scripts["start"] = "npm-run-all -p watch-css start-js"' &&
    json -If package.json -e 'this.scripts["build"] = "npm run build-css && react-scripts build"'&&
    #update .gitignore with sass
    printf "Updating .gitignore. There you go!\n\n" &&
    printf '\n# SASS \nsrc/**/*.css'>> .gitignore
}

fullstack(){
    #install common dependencies
    printf "You'll need some more dependencies...\n\n" &&
    npm i -s express body-parser cors &&
    #update filestructure
    printf "And some extra files. Building...\n\n" &&
    mkdir server &&
    touch main.js server/config.json &&
    #build necessary files
    printf "{\n}">> server/config.json &&
    json -If server/config.json -e "this.port=3001" &&
    printf "const express=require('express'),\n\t  bodyParser=require('body-parser'),\n\t  cors=require('cors'),\n\t  app=express(),\n\t  { port }=require('./server/keys')\n\napp.use(bodyParser.json())\napp.use(cors())\n\n//GET\n\n//PUT\n\n//POST\n\n//DELETE\n\n\napp.listen(port, _=>{console.log('(I)...(I) '+port)})">> main.js &&
    printf "module.exports={\n\tport: 3001,\n}">> server/keys.js
    #update .gitignore for keys.js
    printf "Updating .gitignore...\n\n" &&
    printf "\n\n# sensitive server files\nserver/keys.js">> .gitignore
    #update package.json.main
    printf "And package.json. Try not to get too frustrated.\n\n" &&
    json -If package.json -e "this.main='main.js'" &&
    nodemon
}
