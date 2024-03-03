const { readUserConfig } = require('../utils/user_config');

module.exports = async (req, res) => {
    const userId = req.query.user;
    if (!userId) {
        res.sendStatus(400);
        return;
    }

    try {
        const userConfig = await readUserConfig(userId);

        res.type('json');
        res.json(userConfig);
    } catch (error) {
        if (error.code == 'ENOENT') {
            res.sendStatus(404);
        } else {
            console.log(`Error getting user config for user ${userId} `, error.code);

            res.statusMessage = "Error";
            res.sendStatus(500);
        }
    }

};