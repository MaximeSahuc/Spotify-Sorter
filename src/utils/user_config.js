const fs = require('fs');
const fsa = require('fs').promises;
const path = require('path');

const configDir = '/app/config';

async function saveUserConfig(userId, userConfig) {
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }

    const userConfigPath = path.join(configDir, `${userId}.json`);

    const jsonData = JSON.stringify(userConfig, null, 2);

    try {
        await fsa.writeFile(userConfigPath, jsonData); // Needs the promise-based API
        console.log(`Saved config for user ${userId}`);
    } catch (error) {
        throw error;
    }
}

async function readUserConfig(userId) {
    const userConfigPath = path.join(configDir, `${userId}.json`);

    try {
        const data = await fsa.readFile(userConfigPath, 'utf8'); // Needs the promise-based API
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

module.exports = { saveUserConfig, readUserConfig };