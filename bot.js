	const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
        var prefix = 'f!'
     var msg = message.content;
	 
	 

     if (msg === prefix + 'help') {

         message.channel.send(' Want to learn about commands? Need help? Visit https://fortcord.com \n \n <strong>Plus, you can discover the whole website with all info about the bot!!!</strong> \n If you have any questions, contact me by mail using  xxgamerxx.ca@gmail.com');
		 
	
		 
     }
});

client.login('NTM2NTk0ODMxNjQ5Mjc1OTI0.Dy_c1w.T07pqYjt3qUQg8MSGErMiDBGKmU');

