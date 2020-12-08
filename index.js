import { getConfig, getList } from './reader.js';
import MailClient from './email.js';

const config = getConfig();

init(getList(), new MailClient(config.api_key));

async function init(players, mailClient) {
    console.log("Shuffling...");

    var shuffleResult = getShuffledPlayers(players);
    console.log("Done shuffling");
    if (config.printMatches) {
        console.log(shuffleResult.data);
    }

    if (!shuffleResult.success && !config.sendOnShuffleFail) {
        console.log(`Not sending mails. To send anyway on shuffle fail, enable 'sendOnShuffleFail' in config`);
        return;
    }
    if (!shuffleResult.success && config.sendOnShuffleFail) {
        console.log(`Shuffle failed but 'sendOnShuffleFail' is enabled. Sending mails\r\n`);
    }

    await sendMails(shuffleResult.data, mailClient);
    console.log("Finished");
}

function getShuffledPlayers(players) {
    var shuffled = players;
    var count = 0;
    var success = true;
    while (hasCoupleMatches(shuffled)) {
        console.log("Has couple matches, reshuffling");
        shuffled = shuffleArray(players);
        count += 1;

        if (count > config.shuffleAttempts) {
            console.log(`Could not shuffle with exclusion rules after ${count} tries.`);
            success = false;
            break;
        }
    }
    return {success: success, data: shuffled};
}

async function sendMails(players, mailClient) {
    for (var i = 0; i < players.length; i++) {
        var upper = i + 1 >= players.length ? 0 : i + 1;

        if (config.printMatches) {
            console.log(`${players[i].name} Gifts -> ${players[upper].name}`);
        }

        if (!config.sendMails) {
            continue;
        }

        const msg = {
            to: players[i].email,
            from: config.from,
            subject: config.subject,
            html: getMessage(players[upper]),
        };

        try {
            console.log("Sending mail: " + (i + 1));
            await mailClient.sendMail(msg);
        } catch (e) {
            console.log("Failed to send mail")
            console.error(e);
        }
    }
    if (!config.sendMails) {
        console.log(`\r\nMails not sent. Enable 'sendMails' in config to send mails`);
    }

}

function getMessage(player) {
    return config.message.replace(/{\w+}/g, placeholder =>
        player[placeholder.substring(1, placeholder.length - 1)] || placeholder,
    );
}

function hasCoupleMatches(players) {
    var match = false;

    for (var i = 0; i < players.length; i++) {
        var upper = i + 1 >= players.length ? 0 : i + 1;
        if (players[i].group == "") {
            continue;
        }
        if (players[i].group == players[upper].group) {
            match = true;
            break;
        }
    }
    return match;
}

function shuffleArray(array) {
    return array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

