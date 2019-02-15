const Discord = require('discord.js');
var auth = require('./config.json');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Playing Fortcord with **EVERYONE**"); 
});

client.on('message', message => {
    var prefix = 'f!'
    var msg = message.content;



    if (msg === prefix + 'help') {

        message.channel.send(' Want to learn about commands? Need help?  Visit http://fortcord.com/index.php/commands/ \n ***This site is incomplete and be sure to click on the link and not the links in the text box.** \n \n Plus, you can discover the whole website with all info about the bot!!! \n If you have any questions, contact me by mail using  **xxgamerxx.ca@gmail.com** or on discord using \n **!!![Hello1234]!!!#1466**. \n \n *If you want to donate tap* `f!donate` *and it will give you the donate link.* ');

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
    
    if (msg === prefix + 'profile'){
        let user = message.mentions.users.first() || message.author;
        message.channel.send({embed: {
    color: 3447003,
    author: {
        
      name: user.username,
      icon_url: user.avatarURL
    },
    
    fields: [{
        name: "Profile",
        value: "**Level:** 20 \n **Experience:** 2697/3000 \n **Lobby:** None \n **Tier:** 14 \n **Tier XP:** 3/10 \n **Balance:** 328755 <:VBuck:544626836332871692> \n **Battle pass:** Free Pass \n **Pickaxe:** <:frozen_pickaxe:544877199010824192>"

    },
     ],
            
   
    
        }
});
        
 message.channel.send({embed: {
    color: 3447003,
    author: {
        
    },
    
    fields: [{
        name: "Tools and ressources ",
        value: " \n **Ressources** \n <:wood:544704700935831558> `x20000`  <:stone:544706153272180737> `x15456`  <:Metal:544706407719501836> `x9875` \n \n **Tools** \n <:assaultrifle:544706737194795009> `x2`  <:compactsmg:544708571904868352> `x1`"
       

    },
     ],
            
   
    
        }
});
        
        
    }if (msg === prefix + 'inv'){
        let user = message.mentions.users.first() || message.author;
        message.channel.send({embed: {
    color: 3447003,
    author: {
        
      name: user.username,
      icon_url: user.avatarURL
    },
    
    fields: [{
        name: "Profile",
        value: "**Level:** 20 \n **Experience:** 2697/3000 \n **Lobby:** None \n **Tier:** 14 \n **Tier XP:** 3/10 \n **Balance:** 328755 <:VBuck:544626836332871692> \n **Battle pass:** Free Pass \n **Pickaxe:** <:frozen_pickaxe:544877199010824192>"

    },
     ],
            
   
    
        }
});
        
 message.channel.send({embed: {
    color: 3447003,
    author: {
        
    },
    
    fields: [{
        name: "Tools and ressources ",
        value: " \n **Ressources** \n <:wood:544704700935831558> `x20000`  <:stone:544706153272180737> `x15456`  <:Metal:544706407719501836> `x9875` \n \n **Tools** \n  <:frozen_pickaxe:544877199010824192> `x1` <:assaultrifle:544706737194795009> `x2`  <:compactsmg:544708571904868352> `x1`"
       

    },
     ],
            
   
    
        }
});
        
        
    }
    
    
 if (msg === prefix + 'break'){
 
 message.channel.send(" " + message.author.toString() + "» You broke `30` <:wood:544704700935831558>, `40` <:stone:544706153272180737>,  and `10` <:Metal:544706407719501836> with your <:frozen_pickaxe:544877199010824192>")
 
 }
    
 if (msg === prefix + 'b'){
 
 message.channel.send(" " + message.author.toString() + "» You broke `30` <:wood:544704700935831558>, `40` <:stone:544706153272180737>,  and `10` <:Metal:544706407719501836> with your <:fortnite:544877199010824192>")
 
 }
    
})


client.login(auth.token);
