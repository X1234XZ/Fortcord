const Discord = require('discord.js');
var auth = require('./config.json');
const client = new Discord.Client();
const moment = require('moment');



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    var prefix = 'f!'
    var msg = message.content;



    if (msg === prefix + 'help') {

        message.channel.send(' Want to learn about commands? Need help?  Visit http://fortcord.com/index.php/commands/ \n ***This site is incomplete and be sure to click on the link and not the links in the text box.** \n \n Plus, you can discover the whole website with all info about the bot!!! \n If you have any questions, contact me by mail using  **xxgamerxx.ca@gmail.com** or on discord using \n **!!![Hello1234]!!!#1466**. \n \n *If you want to donate tap* `f!donate` *and it will give you the donate link. ');

    }

    if (msg === prefix + 'donate') {

        message.channel.send(" " + message.author.toString() + "»You want to donate? No problem, go on this link and buy the pack you want! \n \n https://donatebot.io/checkout/539435332198858753 \n Enjoy! \n \n ***Contact me if there is any problems.**");

    }

    if (msg === prefix + 'server') {

        message.channel.send(" " + message.author.toString() + "**» Come and join the support server!!!** \n You can also chat with others. https://discord.gg/HG4BUQD");

    }

    if (msg === prefix + 'invite') {

        message.channel.send('**Invite the bot to other servers!!!** \n Link: https://discordapp.com/oauth2/authorize?client_id=536594831649275924&scope=bot&permissions=252928');

    }

    if (msg === prefix + 'vote') {

        message.channel.send(" " + message.author.toString() + "» Sorry about that, the command is not currently unavailable. \n **Please wait patiently, thank you!**");
    }
    
    if (msg === prefix + 'userinfo'){
    
  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "This is an embed",
    url: "http://google.com",
    description: "This is a test embed to showcase what they look like and what they can do.",
    fields: [{
        name: "Fields",
        value: "They can have different fields with small headlines."
      }
    
})


client.login(auth.token);
