const Discord = require('discord.js');
var auth = require('./config.json');
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./db/fortcord.db');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Typing f!help");
    client.getProfile = sql.prepare("SELECT * FROM profile WHERE username = ?");
    client.setProfile = sql.prepare("INSERT OR REPLACE INTO profile (id, username, wood, stone, metal, gold, balance) VALUES (@id, @username, @wood, @stone, @metal, @gold, @balance);");
});

client.on('message', message => {
    var prefix = 'f!'
    var msg = message.content;



    if (msg === prefix + 'help') {

        let user = message.mentions.users.first() || message.author;
        message.channel.send({
            embed: {
                color: 3447003,

                fields: [{
                    name: "Help",
                    value: "Want to learn about commands? Need help? Visit http://fortcord.com/index.php/commands/ \n ***This site is incomplete.** \n \n Plus, you can discover the whole website with all info about the bot!!! \n If you have any questions, contact me by mail using **xxgamerxx.ca@gmail.com** or on discord using \n **!!![Hello1234]!!!#1466**. \n \n *If you want to donate type* `f!donate` *and it will give you the donate link.* \n *If you don't have a profile, type* `f!profile` *to gain your profile*"

                }, ],


            }
        });
    }

    if (msg === prefix + 'donate') {

        message.channel.send(" " + message.author.toString() + "»You want to donate? No problem, go on this link and buy the pack you want! \n https://donatebot.io/checkout/546084751438512128 \n Enjoy! \n ***Contact me if there is any problems.**");

    }

    if (msg === prefix + 'server') {

        message.channel.send(" " + message.author.toString() + "**» Come and join the support server!!!** \n You can also chat with others. https://discord.gg/DjPn58");

    }

    if (msg === prefix + 'invite') {

        message.channel.send('**Invite the bot to other servers!!!** \n Link: https://discordapp.com/oauth2/authorize?client_id=536594831649275924&scope=bot&permissions=252928');

    }

    if (msg === prefix + 'vote') {

        message.channel.send(" " + message.author.toString() + "» Sorry about that, the command is currently unavailable. \n **Please wait patiently, thank you!**");
    }

    if (msg === prefix + 'profile') {
        let user = message.mentions.users.first() || message.author;
        profile = client.getProfile.get(user.username);
        if (!profile) {
            profile = { id: null, username: user.username, wood: 0, stone: 0, metal: 0, gold: 0, balance: 0 }
            client.setProfile.run(profile);
        }
        message.channel.send({
            embed: {
                color: 3447003,
                author: {

                    name: user.username,
                    icon_url: user.avatarURL
                },

                fields: [{
                    name: "Profile",
                    value: "**Level:** 20 \n **Experience:** 2697/3000 \n **Lobby:** None \n **Tier:** 14 \n **Tier XP:** 3/10 \n **Balance:** "+profile.balance+" <:VBuck:544626836332871692> \n **Battle pass:** Free Pass \n **Pickaxe:** <:pulse_axe:546816166056689682>"

                }, ],



            }
        });

        message.channel.send({
            embed: {
                color: 3447003,
                author: {

                },

                fields: [{
                    name: "Tools and ressources ",
                    value: " \n **Ressources** \n <:wood:544704700935831558> `x"+profile.wood+"`  <:stone:544706153272180737> `x"+profile.stone+"`  <:Metal:544706407719501836> `x"+profile.metal+"` \n \n **Tools** \n <:marshy_smasher:546517860294459392>`x1`"


                }, ],



            }
        });


    }
    if (msg === prefix + 'inv') {
        let user = message.mentions.users.first() || message.author;
         profile = client.getProfile.get(user.username);
        if (!profile) {
            profile = { id: null, username: user.username, wood: 0, stone: 0, metal: 0, gold: 0 }
            client.setProfile.run(profile);
        }
        message.channel.send({
            embed: {
                color: 3447003,
                author: {

                    name: user.username,
                    icon_url: user.avatarURL
                },

                fields: [{
                    name: "Profile",
                    value: "**Level:** 20 \n **Experience:** 2697/3000 \n **Lobby:** None \n **Tier:** 14 \n **Tier XP:** 3/10 \n **Balance:** "+profile.balance+" <:VBuck:544626836332871692> \n **Battle pass:** Free Pass \n **Pickaxe:** <:pulse_axe:546816166056689682>"

                }, ],



            }
        });

        message.channel.send({
            embed: {
                color: 3447003,
                author: {

                },

                fields: [{
                    name: "Tools and ressources ",
                    value: " \n **Ressources** \n <:wood:544704700935831558> `x"+profile.wood+"`  <:stone:544706153272180737> `x"+profile.stone+"`  <:Metal:544706407719501836> `x"+profile.metal+"` \n \n **Tools** \n <:pulse_axe:546816166056689682>`x1`"


                }, ],



            }
        });


    }


    if (msg === prefix + 'break') {
        
        let user = message.mentions.users.first() || message.author;
        profile = client.getProfile.get(user.username);
         if (!profile) {
            profile = { id: null, username: user.username, wood: 0, stone: 0, metal: 0, gold: 0, balance: 0 }
            client.setProfile.run(profile);
        }
        profile.wood = profile.wood+45; 
        profile.stone = profile.stone+35
        profile.metal = profile.metal+5
        client.setProfile.run(profile);
        
        message.channel.send(" " + message.author.toString() + "» You broke `45` <:wood:544704700935831558>, `35` <:stone:544706153272180737>,  and `5` <:Metal:544706407719501836> with your <:pulse_axe:546816166056689682>")

    }

    if (msg === prefix + 'b') {
        
         let user = message.mentions.users.first() || message.author;
        profile = client.getProfile.get(user.username);
         if (!profile) {
            profile = { id: null, username: user.username, wood: 0, stone: 0, metal: 0, gold: 0, balance: 0 }
            client.setProfile.run(profile);
        }
        profile.wood = profile.wood+45; 
        profile.stone = profile.stone+35
        profile.metal = profile.metal+5
        client.setProfile.run(profile);

        message.channel.send(" " + message.author.toString() + "» You broke `45` <:wood:544704700935831558>, `35` <:stone:544706153272180737>,  and `5` <:Metal:544706407719501836> with your <:pulse_axe:546816166056689682>")

    }



    if (msg === prefix + 'botinfo') {

        let user = message.mentions.users.first() || message.author;
        message.channel.send({
            embed: {
                color: 3447003,

                fields: [{
                    name: "Information about the bot",
                    value: "**Created**: `16 January 2019`   **Added to Discordbots**: `February 14 2019`  \n **Owner**: `!!![Hello1234]!!!` **Bot status**: `online` \n **Website**: Visit http://fortcord.com"

                }, ],


            }
        });
    }



})


client.login(auth.token);
