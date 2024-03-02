require('../config');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = USER_DISPLAY_NAME = undefined;
module.exports = USER_ID = undefined;
module.exports = USER_AVATAR = undefined;

module.exports = spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: `http://localhost:${PORT}/callback`
});