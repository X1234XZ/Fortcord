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


  function getCooldownTime(username, command) {
    timestamp = client.getTimestamp.get(username, command);
    var cooltime = 5000
    var rs = 0;
    if (timestamp) {
      //caculate the difference between last time and now
      var datetime = new Date(timestamp.executed).getTime();
      var nowtime = new Date().getTime();

      if ((nowtime - datetime) < cooltime) {
        rs = (cooltime - (nowtime - datetime)) / 1000;
      }
    }

    timestamp = timestamp || {
      id: null,
      username: username,
      command: command,

    }
    if (rs == 0) {
      var currentdate = new Date();
      timestamp.executed = currentdate.getFullYear() + "-" +
        (currentdate.getMonth() + 1) + "-" +
        currentdate.getDate() + " " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    }
    client.setTimestamp.run(timestamp);
    return rs;
  }




  if (msg === prefix + 'break' || msg === prefix + 'b' || msg === prefix + 'B') {

    let user = message.mentions.users.first() || message.author;
    let cooltime = getCooldownTime(user.username, "break");
    if (cooltime > 0) {
      let user = message.mentions.users.first() || message.author;
      message.channel.send({
        embed: {
          color: 15158332,

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
          value: "**Select the category by typing** `f!shop <category>` \n \n `Potions`\n `Healing items`\n `Pickaxe` \n `Guns`\n `Ammo` \n `Items`"

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
          value: "**Here are the list of pickaxe you can buy** \n Do `f!buy <pickaxe name>` to buy a pickaxe \n \n `f!info default` \n `f!info cliffhanger` \n `f!info ac/dc` \n `f!info plunja` \n `f!info icebreaker` \n `f!info pulseaxe`\n `f!info tataxe`\n `f!info silverfang`\n `f!info oracleaxe`\n `f!info resonator`\n `f!info marshysmasher`"

        }, ],


      }
    });
  }

  if (msg === prefix + 'info default') {

    message.channel.send("**Name:** Default pickaxe \n **Rating:** 10/100 \n **Cost:** No cost because you gain it when you start \n **Cooldown:** 5 seconds \n  **Resources:** `10`<:wood:544704700935831558>", {
      file: "https://image.fnbr.co/pickaxe/5abf70c2577d2d6afc3fa6c7/png.png"
    })
  };



  if (msg === prefix + 'info cliffhanger') {

    message.channel.send("**Name:** Cliffhanger \n **Rating:** 15/100 \n **Cost:** 300 <:VBuck:544626836332871692> \n **Cooldown:** 5 seconds \n **Resources:** `20`<:wood:544704700935831558>, `5`<:stone:544706153272180737>", {
      file: "https://image.fnbr.co/pickaxe/5ab176665f957f27504aa51b/icon.png"
    })
  };


  if (msg === prefix + 'info ac/dc') {

    message.channel.send("**Name:** AC/DC \n **Rating:** 25/100 \n **Cost:** 250 <:VBuck:544626836332871692> \n **Cooldown:** 4.5 seconds \n  **Resources:** `25`<:wood:544704700935831558>,`10`<:stone:544706153272180737>", {
      file: "https://image.fnbr.co/pickaxe/5ab15ea9a8956031d0159a25/icon.png"
    })
  };


  if (msg === prefix + 'info plunja') {

    message.channel.send("**Name:** Plunja \n **Rating:** 33/100 \n **Cost:** 650 <:VBuck:544626836332871692> \n **Cooldown:** 4 seconds \n  **Resources:** `30`<:wood:544704700935831558>,`20`<:stone:544706153272180737>", {
      file: "https://image.fnbr.co/pickaxe/5ab17bef5f957f27504aa530/icon.png"
    })
  };


  if (msg === prefix + 'info icebreaker') {

    message.channel.send("**Name:** Ice Breaker \n **Rating:** 38/100 \n **Cost:** 740 <:VBuck:544626836332871692> \n **Cooldown:** 4 seconds \n  **Resources:** `40`<:wood:544704700935831558>,`30`<:stone:544706153272180737>", {
      file: "https://skin-tracker.com/images/fnskins/159.png"
    })
  };


  if (msg === prefix + 'info pulseaxe') {

    message.channel.send("**Name:** Pulse axe \n **Rating:** 45/100 \n **Cost:** 950 <:VBuck:544626836332871692> \n **Cooldown:** 3.5 seconds \n  **Resources:** `45`<:wood:544704700935831558>,`35`<:stone:544706153272180737>, `5`<:Metal:544706407719501836>", {
      file: "https://skin-tracker.com/images/fnskins/164.png"
    })
  };
  
  
  if (msg === prefix + 'info tataxe') {

    message.channel.send("**Name:** Tat axe \n **Rating:** 50/100 \n **Cost:** 1100 <:VBuck:544626836332871692> \n **Cooldown:** 3 seconds \n  **Resources:** `50`<:wood:544704700935831558>,`40`<:stone:544706153272180737>, `10`<:Metal:544706407719501836>", {
      file: "https://skin-tracker.com/images/fnskins/213.png"
    })
  };
  
  
  if (msg === prefix + 'info silverfang') {

    message.channel.send("**Name:** Silver Fang \n **Rating:** 55/100 \n **Cost:** 1400 <:VBuck:544626836332871692> \n **Cooldown:** 3 seconds \n  **Resources:** `60`<:wood:544704700935831558>,`50`<:stone:544706153272180737>, `20`<:Metal:544706407719501836>", {
      file: "https://image.fnbr.co/pickaxe/5ab17e535f957f27504aa544/icon.png"
    })
  };
  
  
  if (msg === prefix + 'info oracleaxe') {

    message.channel.send("**Name:** Oracle axe \n **Rating:** 75/100 \n **Cost:** 1900 <:VBuck:544626836332871692> \n **Cooldown:** 2.5 seconds \n  **Resources:** `75`<:wood:544704700935831558>,`60`<:stone:544706153272180737>, `50`<:Metal:544706407719501836>, `15`<:Gold_Ingot:551953798520766490>", {
      file: "https://image.fnbr.co/pickaxe/5b1e89d2efc15524a714c656/icon.png"
    })
  };
  
  
  if (msg === prefix + 'info resonator') {

    message.channel.send("**Name:** Resonator \n **Rating:** 90/100 \n **Cost:** 2200 <:VBuck:544626836332871692> \n **Cooldown:** 2 seconds \n  **Resources:** `90`<:wood:544704700935831558>,`75`<:stone:544706153272180737>, `50`<:Metal:544706407719501836>, `30`<:Gold_Ingot:551953798520766490>", {
      file: "https://image.fnbr.co/pickaxe/5baf743fed0da913fb120be1/icon.png"
    })
  };
  
  
  
  if (msg === prefix + 'info marshysmasher') {

    message.channel.send("**Name:** Marshy smasher \n **Rating:** 100/100 \n **Cost:** 7500 <:VBuck:544626836332871692> \n **Cooldown:** 1 seconds \n  **Resources:** `110`<:wood:544704700935831558>,`90`<:stone:544706153272180737>, `75`<:Metal:544706407719501836>, `60`<:Gold_Ingot:551953798520766490>", {
      file: "https://skin-tracker.com/images/fnskins/1002.png"
    })
  };
  
  
  
  if (msg === prefix + 'shop potions') {

    let user = message.mentions.users.first() || message.author;
    message.channel.send({
      embed: {
        color: 3447003,

        fields: [{
          name: "Shop",
          value: "**Here are the list of potions you can buy** \n Do `f!buy <potion name>` to buy a pickaxe \n \n `f!info smallshield` \n `f!info shield` \n `f!info chugjug` \n `f!info slurpjuice`"

        }, ],


      }
    });
  }
  
  
  if (msg === prefix + 'info smallshield') {

    message.channel.send("**Name:** Small shield potion \n **Rating:** 30/100 \n **Shield:** Gives you `25`% of shield.", {
      file: "https://gamepedia.cursecdn.com/fortnite_gamepedia/8/81/Consumable_Small_Shield_Potion.png"
    })
  };
  
  
  if (msg === prefix + 'info shield') {

    message.channel.send("**Name:** Shield potion \n **Rating:** 60/100 \n **Shield:** Gives you `50`% of shield.", {
      file: "https://gamepedia.cursecdn.com/fortnite_gamepedia/d/d5/Shield_potion_icon.png"
    })
  };
  
  
  if (msg === prefix + 'info chugjug') {

    message.channel.send("**Name:** Chug jug \n **Rating:** 90/100 \n **Shield:** Gives you `100`% of shield. \n **Health:** Gives you `100`% of your health.", {
      file: "https://gamepedia.cursecdn.com/fortnite_gamepedia/9/96/Consumable_chug.png"
    })
  };
  
  
  if (msg === prefix + 'info slurpjuice') {

    message.channel.send("**Name:** Slurp juice \n **Rating:** 80/100 \n **Shield:** Gives you `75`% of shield. ", {
      file: "https://gamepedia.cursecdn.com/fortnite_gamepedia/8/8c/Consumable_slurp.png"
    })
  };
  
  
  if (msg === prefix + 'shop healingitems') {

    let user = message.mentions.users.first() || message.author;
    message.channel.send({
      embed: {
        color: 3447003,

        fields: [{
          name: "Shop",
          value: "**Here are the list of healing items you can buy** \n Do `f!buy <item name>` to buy an item \n \n `f!info bandages` \n `f!info medkit`"

        }, ],


      }
    });
  }
  
  
  if (msg === prefix + 'info bandages') {

    message.channel.send("**Name:** Bandages \n **Rating:** 45/100 \n **Health:** Gives you `25`% of your health.", {
      file: "https://fortniteskins.net/wp-content/uploads/2018/03/bandages-icon.png"
    })
  };
  
  
  if (msg === prefix + 'info medkit') {

    message.channel.send("**Name:** Med kit \n **Rating:** 60/100 \n **Health:** Gives you `100`% of your health.", {
      file: "https://fortniteskins.net/wp-content/uploads/2018/03/medkit.png"
    })
  };
  
  
  if (msg === prefix + 'shop guns') {

    let user = message.mentions.users.first() || message.author;
    message.channel.send({
      embed: {
        color: 3447003,

        fields: [{
          name: "Shop",
          value: "**Here are the list of guns you can buy** \n Do `f!buy <gun name>` to buy a gun \n \n **Sniper**` \n f!info surpressedsniperrifle` \n `f!info huntingrifle` \n `f!info heavysniperrifle` \n **Shotgun** \n `f!info taticalshotgun` \n `f!info pumpshotgun` \n **Pistol** \n `f!info pistol` \n `f!info scopedrevolver` \n `f!info dualpistols` \n `f!info surppressedpistol` \n `f!info handcanon` \n **SMG** \n `f!info suppressedmachinegun` \n `f!info compactsmg` \n **Infantry rifle** \n `f!info infantryrifle` \n **Assault rifle** \n `f!info assaultrifle` \n `f!info scopedassaultrifle` \n `f!info heavyassaultrifle` \n `f!info surppressedassaultrifle`\n **Others** \n `f!info minigun` \n `f!info rocketlauncher` \n `f!info grenadelauncher`"

        }, ],


      }
    });
  }




})




client.login(auth.token);
