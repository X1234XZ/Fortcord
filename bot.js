const Discord = require('discord.js');
var auth = require('./config.json');
const client = new Discord.Client();
const Discord = module.require('discord.js');
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
    
   let user = message.mentions.users.first() || message.author;
    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setColor(`RANDOM`)
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField('Joined at:', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', user.presence.status, true)
        .addField('Roles:', user.roles.map(r => `${r}`).join(' | '), true)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp();

    message.channel.send({ embed: embed });
    return;
}
    
})



client.login(auth.token);
