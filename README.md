| :exclamation:  Archived   |
|-----------------------------------------|

This project is no longer being worked on. I don't even know if it's still functional. Also, dependabot is screaming about a bunch of prototype pollution exploits so use at your own risk or whatever.


## Twitch DeleteLog
#### Log deleted Twitch messages
***
### Installation
You need to have Node.JS (https://nodejs.org) installed already

- Clone the repository
- Go into the directory with a terminal/command prompt
- Run ``npm install`` to install all required packages
- Insert your Twitch bot's credentials into configs/tmi.json
- Insert the channels you want to log into configs/channels.json

***
### Getting Bot Credentials
- Make a new Twitch account
- Go to https://twitchapps.com/tmi and log into the new account
- The site will give you an OAuth token (Example: ``oauth:97yaizbgf6fovfg3eer9si61qsfpdl``)
- Insert the account's username and OAuth token as described in the installation section

***
### Usage
You can run the script by using ``node deletelog.js``

The script will output any deleted messages from channels specified in configs/channels.json into the console.

For every channel, a directory is created inside the logs directory (Which is created when you first run the script). Log files will be named by the date they were created. 

Example of a log entry: ``[23:07:51] sometwitchuser > Hello There``

***
### Donating
If you like the script and want to give me a buck or two for my work, feel free to do so at https://paypal.me/Xenorio
***
### Contributing
Feel free to make as many pull requests and forks as you want!
