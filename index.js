const fs = require('fs');
const Discord = require("discord.js");
const Eco = require("quick.eco");

require('dotenv').config(); // Make sure this is called if using .env

const client = new Discord.Client({ 
  intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages], 
  allowedMentions: { parse: [] } 
});

client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
client.config = require("./botConfig");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.shop = {
  Amazon: { cost: 227 },
  Apple: { cost: 242 },
  Microsoft: { cost: 343 },
  Nvidia: { cost: 142 },
  Alphabet: { cost: 176 }
};

function updatePrices() {
  for (let stock in client.shop) {
    let current = client.shop[stock].cost;
    let change = Math.floor(Math.random() * (current * 0.15)) + 1;
    let newPrice = current + change - Math.floor(Math.random() * (current * 0.15)) + 1;
    client.shop[stock].cost = Math.max(newPrice, 1); // prevent negative prices
  }
}

setInterval(updatePrices, 10000);

// Load Events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.filter(f => f.endsWith(".js")).forEach(f => {
    const event = require(`./events/${f}`);
    const eventName = f.split(".")[0];
    console.log(`Registering event
