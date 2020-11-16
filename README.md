# Haxball Discord Bot

This Node.js app allows you to automatically run a Haxball room script and fully integrate it with a dedicated Discord bot.

Puppeteer and discord.js modules are required. Install them by running `npm install puppeteer discord.js`.

## Getting started

1. Copy all of your Haxball room scripts to ./haxRoom directory
2. Fill the config.js file ([how?](#config-file))
3. In main directory, run `node app.js` command to start the app
4. Solve captcha
5. Enter the room and start using start using Discord bot!

## Config file
This is the file where you put all of your information in order for bot to work. 

Config properties:

- discordBotToken - token used to login to Discord bot (get it from [here](https://discord.com/developers/applications))
- botClientID - also available [here](https://discord.com/developers/applications)
- adminChannels - array of IDs of channels where you can execute admin-only commands (e.g. bans and kicks)
- chatChannels - array of IDs of channels that are synchronized with Haxball chat (also see [this](#synchronizing-chats))
- ignoredWebHooks - array of IDs of webHooks that are ignored and their messages not synchronized with Haxball chat
- ignoredBots - array of IDs of bots that are ignored and their messages not synchronized with Haxball chat

## Adding your commands

To add your Discord bot commands edit ./discordBot/bot.js and ./app.js files. Method called `Puppeter.browser.page.addScriptTag()` will run functions defined in your Haxball script from this app. More info [here](https://pptr.dev/#?product=Puppeteer&version=v5.4.1&show=api-pageaddscripttagoptions).

## Synchronizing chats

Discord messages are send to Haxball chat by default but only from channels defined in config.json. To make it also the other way you have to setup a webHook in your Haxball script file.

