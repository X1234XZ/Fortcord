	const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
        var prefix = 'f!'
     var msg = message.content;
	 
	 

     if (msg === prefix + 'help') {

	 message.channel.send(' Want to learn about commands? Need help? Visit http://fortcord.com/index.php/commands/ \n \n Plus, you can discover the whole website with all info about the bot!!! \n If you have any questions, contact me by mail using  **xxgamerxx.ca@gmail.com** or on discord using \n **!!![BetterThanYou]!!!#1466**. \n \n *If you want to donate tap* `f!donate` *and it will give you the donate link.*');
		 
	
		 
     }
	 
	 if (msg === prefix + 'donate') {

	 message.channel.send(' Want to donate? No problem, go on this link and buy the pack you want! \n \n https://donatebot.io/checkout/539435332198858753 \n Enjoy! \n \n **Contact me if there is any problems.*');
		 
	
		 
     }
});

client.login('NTM2NTk0ODMxNjQ5Mjc1OTI0.Dy_c1w.T07pqYjt3qUQg8MSGErMiDBGKmU');

