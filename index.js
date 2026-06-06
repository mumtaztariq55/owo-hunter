const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// The corrected User ID for the OwO bot
const OWO_BOT_ID = "408785106942164992"; 

client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // 1. Check if the message came from the OwO bot
    // 2. Check if the message contains the word "human"
    if (message.author.id === OWO_BOT_ID && message.content.toLowerCase().includes('human')) {
        try {
            // Find the OwO bot inside your specific server
            const member = await message.guild.members.fetch(OWO_BOT_ID);
            
            if (member && member.kickable) {
                await member.kick('Triggered human captcha check.');
                await message.channel.send('🚨 **OwO Bot has been kicked** for sending a message containing "human"!');
            } else {
                await message.channel.send('⚠️ I see the "human" message, but I lack permissions to kick the OwO bot. Drag my role higher!');
            }
        } catch (error) {
            console.error('Failed to kick:', error);
        }
    }
});

// Safely loads your bot token from Render's settings
client.login(process.env.DISCORD_TOKEN);
