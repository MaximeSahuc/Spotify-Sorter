const { saveUserConfig } = require('../utils/user_config');

module.exports = async (req, res) => {
    const userId = req.body.user;
    const userConfig = req.body.config;

    try {
        saveUserConfig(userId, userConfig);
        res.sendStatus(200);
    } catch (error) {
        console.error(`Failed to save for user ${userId}`, error);
        res.sendStatus(500);
    }

};