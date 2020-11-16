const Discord = require('discord.js');
const config = require('../config.json');
const app = require(__dirname + '/../app.js');

const client = new Discord.Client();

// Launch and login Discord Bot
function launchBot(){
    client.on('ready', () => {
        console.log("Discord Bot is ready!");
      });

      client.login(config.discordBotToken);  
}

// Listen for message and check if that was a command
function checkCommand(){

  client.on('message', async(msg) =>{
    
    if(msg.content[0] === '!'){ // Command

      let reply = await msg.channel.send("Retrieving data from the server...");

      // All commands
      if(msg.content === "!help"){
        reply.edit("Available commands: !help"); 
      } else {
        reply.edit("There's no such command! Check all available commands by typing: !help");
      } 

    } else { // Just a message if you want to synchronize ingame chat with discord chat
        config.ignoredBots.push(config.botClientID); // This bot also can't send messages to Haxball chat

        if(config.chatChannels.includes(msg.channel.id)) // Channel has to be synchronized with Haxball chat
          if(!(config.ignoredWebHooks.includes(msg.webhookID))) // Ignore and don't synchronize messages from included webHooks
            if(!(config.ignoredBots.includes(msg.author.id))){ // Ignore and don't synchronize messages form included bots
              
              let senderName = msg.guild.member(msg.author).displayName; // Get current user's discord nickname
              app.sendChatMessage(msg.content, senderName); // Send the message to haxball room

            }
    }
  }); 
}

// Export functions to app.js
exports.launchBot = launchBot;
exports.checkCommand = checkCommand;



