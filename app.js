const discord = require('./discordBot/bot.js'); // 
const puppeteer = require('puppeteer');
let page; // Haxball page object

// "Main" function
(async () => {
    // Launch browser
    const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "browserData",
    args: ['--no-sandbox']
    })

    // Open new page and navigate to Haxball Headless host
    page = await browser.newPage()
    await page.goto('https://www.haxball.com/headless', {waitUntil: 'networkidle2'})

    // Run all scripts for Haxball Room
    InitHaxballRoom(page);

    // Launch Discord Bot
    discord.launchBot();

    // Listen for message and check if that was a command
    discord.checkCommand();

    // Inform user that he cannot use the bot no more
    page.on('close', ()=>{console.log("Haxball Page closed! Discord Bot is still running but won't read any data! App needs a restart!")});
})()

// Initiates Haxball room by running all scripts in haxRoom folder
function InitHaxballRoom(page){
    
    const haxRoomDir = './haxRoom/';
    const fs = require('fs');

    fs.readdirSync(haxRoomDir).forEach(async (file) => { // Go through all files
        await page.addScriptTag({path: haxRoomDir + file}); // Run script in browser
        console.log("Loaded Haxball script file: " + file);
    });
    
}

// Send a chat message directly to the Haxball room
async function sendChatMessage(content, sender){

    let toSend = "room.sendAnnouncement(\" "+ sender +": " + content + "\", null, \"0xffffff\", \"normal\");"

    await page.addScriptTag({content: toSend});
}

// Export functions to /discordBot/discord.js
exports.sendChatMessage = sendChatMessage;
