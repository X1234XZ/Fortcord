const Discord = require('discord.js');
var auth = require('./config.json');
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('../db/fortcord.db');


const helloProfile = {
  id: null,
  username: null,
  wood: 0,
  stone: 0,
  metal: 0,
  gold: 0,
  balance: 0,
  experience: 0,
  tierxp: 0,
  tier: 1,
  level: 1
}


client.on('ready', () => {
  var scount = client.guilds.size
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Fortcord on ${scount} servers`);
  client.getProfile = sql.prepare("SELECT * FROM profile WHERE username = ?");
  client.setProfile = sql.prepare("INSERT OR REPLACE INTO profile (id, username, wood, stone, metal, gold, balance, experience, tierxp, level, tier) VALUES (@id, @username, @wood, @stone, @metal, @gold, @balance, @experience, @tierxp, @level, @tier);");
  client.getTimestamp = sql.prepare("SELECT * FROM timestamp WHERE username = ? and command = ? ");
  client.setTimestamp = sql.prepare("INSERT OR REPLACE INTO timestamp (id, username, command, executed) VALUES (@id, @username, @command, @executed)");
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

        message.channel.send(" " + message.author.toString() + "**» Come and join the support server!!!** \n You can also chat with others. https://discord.gg/vb77EKr");   

      }

      if (msg === prefix + 'invite') {

        message.channel.send('**Invite the bot to other servers!!!** \n Link: https://discordapp.com/oauth2/authorize?client_id=536594831649275924&scope=bot&permissions=252928');

      }

      if (msg === prefix + 'vote') {

        message.channel.send(" " + message.author.toString() + "» Sorry about that, the command is currently unavailable. \n **Please wait patiently, we will add this command shortly, thank you!**");
      }

      if (msg === prefix + 'profile' || msg === prefix + 'inv' || msg === prefix + 'pfl') {
        let user = message.mentions.users.first() || message.author;
        profile = client.getProfile.get(user.username);
        if (!profile) {
          profile = helloProfile;
          profile.username = user.username;
          client.setProfile.run(profile);
        }

        var maxXp = 100 + (profile.level - 1) * 75;
        var maxTier = 500 + (profile.tier - 1) * 50;

        message.channel.send({
          embed: {
            color: 3447003,
            author: {

              name: user.username,
              icon_url: user.avatarURL
            },

            fields: [{
              name: "Profile",
              value: "**Level:** " + profile.level + " \n **Experience:** " + profile.experience + "/" + maxXp + " \n **Lobby:** None \n **Tier:** " + profile.tier + " \n **Tier XP:** " + profile.tierxp + "/" + maxTier + " \n **Balance:** " + profile.balance + " <:VBuck:544626836332871692> \n **Battle pass:** Free Pass \n **Pickaxe:** <:pulse_axe:546816166056689682>[Pulse axe]`x1`"

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
              value: " \n **Ressources** \n <:wood:544704700935831558> `x" + profile.wood + "`  <:stone:544706153272180737> `x" + profile.stone + "`  <:Metal:544706407719501836> `x" + profile.metal + "` \n \n **Tools** \n <:pulse_axe:546816166056689682>[Pulse axe]`x1`"


            }, ],



          }
        });


      }

  
      function getCooldownTime(username,command){
        timestamp = client.getTimestamp.get(username,command);
        var cooltime=3500
        if(timestamp){
          //caculate the difference between last time and now
          var datetime = new Date( timestamp.executed ).getTime();
          var nowtime = new Date().getTime();
          
          if((nowtime-datetime)>=cooltime) {
            cooltime=0;
          }else{
            cooltime = (nowtime-datetime) / 1000;
          }
        }else{
          cooltime =0;
        }
        
        timestamp=timestamp || {
          id:null,
          username:username,
          command:command,
          
        } 
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        timestamp.executed=datetime;
        client.setTimestamp.run(timestamp);
        return cooltime;
      }




      if (msg === prefix + 'break' || msg === prefix + 'b' || msg === prefix + 'B') {

        let user = message.mentions.users.first() || message.author;
        let cooltime=getCooldownTime(user.username,"break");
        if(cooltime > 0){
         let user = message.mentions.users.first() || message.author;
        message.channel.send({
          embed: {
            color: 3447003,

            fields: [{
              name: "WAIT!!!",
              value: " " + message.author.toString() + " »**STOP!** Wait " + (cooltime) + " seconds to break again!"

            }, ],


          }
        });
           return;
        }
        
        
        
        
        
        profile = client.getProfile.get(user.username);
        if (!profile) {
          profile = helloProfile;
          profile.username = user.username;
          client.setProfile.run(profile);
        }

        var maxXp = 100 + (profile.level - 1) * 75;
        var maxTier = 500 + (profile.tier - 1) * 50;

        profile.wood = profile.wood + 45;
        profile.stone = profile.stone + 35;
        profile.metal = profile.metal + 5;
        profile.experience = profile.experience + 5;
        if (profile.experience >= maxXp) {
          profile.level = profile.level + 1;
          profile.experience = profile.experience - maxXp
          message.channel.send(" " + message.author.toString() + "» GG, You just advance to **level** " + profile.level + "")
        }
        profile.tierxp = profile.tierxp + 2;
        if (profile.tierxp >= maxTier) {
          profile.tier = profile.tier + 1;
          profile.tierxp = profile.tierxp - maxTier
          message.channel.send(" " + message.author.toString() + "» GG, You just advance to **Tier** " + profile.tier + "")
        }
        client.setProfile.run(profile);

        message.channel.send(" " + message.author.toString() + "» You broke `45` <:wood:544704700935831558>, `35` <:stone:544706153272180737>,  and `5` <:Metal:544706407719501836> with your <:pulse_axe:546816166056689682>`[Pulse axe]`")

      }



      if (msg === prefix + 'botinfo') {

        let user = message.mentions.users.first() || message.author;
        message.channel.send({
          embed: {
            color: 3447003,

            fields: [{
              name: "Information about the bot",
              value: "**Created**: `16 January 2019`   **Added to Discordbots**: `February 14 2019`  \n **Owner**: `!!![Hello1234]!!!#1466` **Bot status**: `online` \n **Website**: Visit http://fortcord.com"

            }, ],


          }
        });
      }

      if (msg === prefix + 'servercount') {

        var scount = client.guilds.size
        var usercount = client.users.size

        message.channel.send(`${client.user.username} is on **${scount}** servers with **${usercount}** members!`)

      }


      if (msg === prefix + 'shop') {

        let user = message.mentions.users.first() || message.author;
        message.channel.send({
          embed: {
            color: 3447003,

            fields: [{
              name: "Pickaxes",
              value: "**Select the category by typing** `f!shop <category>` \n \n `Potions`\n `Healing items`\n `Pickaxe` \n `Guns`\n `Ammo`"

            }, ],


          }
        });
      }


      if (msg === prefix + 'shop pickaxe') {

        let user = message.mentions.users.first() || message.author;
        message.channel.send({
          embed: {
            color: 3447003,

            fields: [{
              name: "Shop",
              value: "**Here are the list of pickaxe** \n \n `f!info default` \n `f!info cliffhanger` \n `f!info ac/dc` \n `f!info plunja` \n `f!info icebreaker` \n `f!info pulseaxe`\n `f!info tataxe`\n `f!info silverfang`\n `f!info oracleaxe`\n `f!info resonator`\n `f!info marshysmasher`"

            }, ],


          }
        });
      }

      if (msg === prefix + 'info default') {

        message.channel.send("**Name:** Default pickaxe \n **Rating:** 10/100 \n **Cost:** No cost because you gain it when you start \n **Ressources:** `10`<:wood:544704700935831558>", {
            file: "https://image.fnbr.co/pickaxe/5abf70c2577d2d6afc3fa6c7/png.png"}
          )
        };
  
  
  
  if (msg === prefix + 'info cliffhanger') {

        message.channel.send("**Name:** Cliffhanger \n **Rating:** 25/100 \n **Cost:** 300 <:VBuck:544626836332871692> \n **Ressources:** `20`<:wood:544704700935831558>, `5`<:stone:544706153272180737>", {
            file: "https://image.fnbr.co/pickaxe/5ab176665f957f27504aa51b/icon.png"}
          )
        };




      
    })




    client.login(auth.token);
