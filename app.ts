import * as restify from 'restify';
import * as builder from 'botbuilder';

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);

//=========================================================
// Bots Dialogs
//=========================================================
bot.dialog('/', [
    (session) => {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    (session, results) => {
        session.send('Hello %s!', results.response);
    }
]);
