require('../config');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = USER_DISPLAY_NAME = undefined;
module.exports = USER_ID = undefined;
module.exports = USER_AVATAR = undefined;

module.exports = spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: `http://localhost:${PORT}/callback`
});