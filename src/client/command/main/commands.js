import pre from "./commandConfig.json";

function preCheck(message) {
    if (!message.content.startsWith(pre) || message.author.bot) {
        return false;
    } else {
        return true;
    }
}

function starCheck(message, channel) {
    
}

export default {preCheck, starCheck}