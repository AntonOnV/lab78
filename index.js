import process from 'node:process';
import TelegramBot from 'node-telegram-bot-api';
import { logger } from './logger.js';
import { charCounter } from './metrics.js';


const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const text = msg.text;
    let res = "Such command doesn't exist";
    if (text.startsWith("/log")) {
        const split = text.split(" ");
        const message = split
            .filter((val, i) => i != 0)
            .join(" ");

        await logger.emit('message', {id: msg.message_id, message: message});
        charCounter.inc(message.length);
        res = `Message '${message}' was logged`
    }
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, res);
});
