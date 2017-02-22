import * as restify from 'restify';
import * as builder from 'botbuilder';

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening to ${server.url}`);
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
        session.dialogData.name = results.response;
        session.send(`Hello ${session.dialogData.name}`);
        session.beginDialog('/askAge', session.dialogData.name);
    },
     (session) => {
         session.endDialog('Goodbye !');
    }
]);
bot.dialog('/askAge', [
    (session, args, next) => {
        session.dialogData.name = args || {};
        builder.Prompts.text(session, `${session.dialogData.name} how old are you ?`);
    },
    (session, results) => {
        session.send(`${session.dialogData.name} you're ${results.response}`);
        session.endDialog();
    }
]);
