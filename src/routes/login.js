require('../services/spotify');

module.exports = async (req, res) => {
    // console.log('request to `login` endpoint');
    var scopes = ['user-read-private', 'user-read-currently-playing', 'playlist-read-private', 'playlist-modify-public', 'playlist-modify-private', 'user-library-modify'];

    var responseType = 'token';

    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(
        scopes,
        responseType
    );

    res.redirect(authorizeURL);
};