require('../services/spotify');

module.exports = async (req, res) => {
    // console.log('request to `callback` endpoint');
    const code = req.query.code;

    spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);

            // Set user global variables
            spotifyApi.getMe()
                .then(function (data) {
                    const user = data.body;
                    // console.log(user);
                    USER_DISPLAY_NAME = user.display_name;
                    USER_ID = user.id;
                    USER_AVATAR = user.images[0].url;

                    res.redirect('/');
                });
        },
        function (err) {
            res.send(err);
        }
    );
};