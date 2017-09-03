export PS1="\[\033[36m\]\u\[\033[m\]\[\033[32m\]->>\[\033[93;1m\]\W\[\033[m\]⚙️  "
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
export PATH=~/mongodb/bin:$PATH

#reassignment
alias ls='ls -GFha'
alias rm='rm -rfv'
jsonadd(){
    json -If "$1" -e "$2"
}
alias clear="printf '\33c\e'"

#movement shortcuts
alias ~='cd ~ && ls -GFha'
alias cd1='cd ../ && ls -GFha'
alias cd2='cd ../../ && ls -GFha'
alias cd3='cd ../../../ && ls -GFha'
alias dm='cd ~/DevMountain && ls'
alias c='cd ~/Codes && ls'
cdl(){
    cd "$1" && ls -GFha
}


#application shortcuts
alias music='open /Applications/iTunes.app'
alias server="ssh -i '~/.ssh/server.pem' ubuntu@54.70.75.71"
alias slack='open -a Slack'
alias code='open -a Visual\ Studio\ Code'
alias bscript='open -a Visual\ Studio\ Code ~/.bash_profile'
alias chrome='open -a Google\ Chrome'

#dev shortcuts
alias react=". ~/.scripts/react.sh"
alias test=". ~/.scripts/if.sh"

fullstack(){
    #install common dependencies
    clear &&
    printf "You'll need some more dependencies...\n\n" &&
    npm i -s express express-session body-parser cors &&
    #update filestructure
    printf "And some extra files. Building...\n\n" &&
    mkdir server &&
    touch ./server/main.js server/config.json &&
    #build necessary files
    printf "{\n}">> server/config.json &&
    json -If server/config.json -e "this.port=3001" &&
    printf "const express=require('express')\n\t, bodyParser=require('body-parser')\n\t, cors=require('cors')\n\t, app=express()\n\t, { port }=require('../server/config.json')\n\napp.use(bodyParser.json())\napp.use(cors())\napp.use(bodyParser.json())\n\napp.listen(port, _=>{console.log('(I)...(I) '+port)})">> ./server/main.js &&
    #update .gitignore for keys.js
    printf "Updating .gitignore...\n\n" &&
    printf "\n\n# sensitive server files\nserver/config.json">> .gitignore
    #update package.json.main
    printf "And package.json. Try not to get too frustrated.\n\n" &&
    json -If package.json -e "this.main='./server/main.js'" &&
    nodemon
}

testColor(){
    RED="\033[0;31m"
    CLEAR="\033[0m"
    GREEN="\033[0;32m"
    BLUE="\033[0;34m"
    echo -e "this is ${RED}red${CLEAR}, and this is ${GREEN}green${CLEAR}."
    for i
    do
        if [[$i=='sass']]
        then
            echo I am sass
            continue
        else
            echo I am not sass
            continue
        fi
    done
}
