import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

// Use Wrangler secrets to securely store your keys
const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

// Initialize stock values
let AmazonStock = 227, 
    AppleStock = 242, 
    MicrosoftStock = 343, 
    NvidiaStock = 142, 
    AlphabetStock = 176;

// Update stock prices every 10 seconds
setInterval(updatePrices, 10000);
function updatePrices() {
  AmazonStock = AmazonStock + (Math.floor(Math.random() * (AmazonStock * 0.15)) + 1) - (Math.floor(Math.random() * (AmazonStock * 0.15)) + 1);
  AppleStock = AppleStock + (Math.floor(Math.random() * (AppleStock * 0.15)) + 1) - (Math.floor(Math.random() * (AppleStock * 0.15)) + 1);
  MicrosoftStock = MicrosoftStock + (Math.floor(Math.random() * (MicrosoftStock * 0.15)) + 1) - (Math.floor(Math.random() * (MicrosoftStock * 0.15)) + 1);
  NvidiaStock = NvidiaStock + (Math.floor(Math.random() * (NvidiaStock * 0.15)) + 1) - (Math.floor(Math.random() * (NvidiaStock * 0.15)) + 1);
  AlphabetStock = AlphabetStock + (Math.floor(Math.random() * (AlphabetStock * 0.15)) + 1) - (Math.floor(Math.random() * (AlphabetStock * 0.15)) + 1);
}

// Define the stock items and their prices
const shop = {
  "Amazon": { cost: AmazonStock },
  "Apple": { cost: AppleStock },
  "Microsoft": { cost: MicrosoftStock },
  "Nvidia": { cost: NvidiaStock },
  "Alphabet": { cost: AlphabetStock },
};

// Register commands and events
async function registerCommandsAndEvents() {
  try {
    // Register slash commands (example for Discord)
    await rest.put(Routes.applicationCommands('YOUR_APP_ID'), {
      body: [
        {
          name: 'ping',
          description: 'Replies with Pong!',
        },
        // Add more commands as needed
      ],
    });

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error('Error registering application commands:', error);
  }

  // Handling events
  // Since Cloudflare Workers don't support `fs` and file reading, you need to define events explicitly
  // Example:
  self.addEventListener('fetch', (event) => {
    event.respondWith(new Response('Pong!'));
  });
}

registerCommandsAndEvents();

// Handle the Worker response logic
addEventListener('fetch', (event) => {
  event.respondWith(new Response('Hello from Cloudflare Worker!'));
});
