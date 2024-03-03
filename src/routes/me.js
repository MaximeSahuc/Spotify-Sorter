require('../services/spotify');

module.exports = async (req, res) => {
    // console.log('request to `me` endpoint');
    if (!USER_DISPLAY_NAME) {
        res.status(401);
        res.send('need to login first');
        return;
    }

    spotifyApi.getMyCurrentPlayingTrack()
        .then(function (data) {
            const track = data.body.item;

            var artists = '';
            var nowPlaying = {};
            if (track) {
                for (let index = 0; index < track.artists.length; index++) {
                    const artist = track.artists[index].name;
                    artists += artist + (index < track.artists.length - 1 ? ', ' : '');
                }

                nowPlaying = {
                    name: track.name,
                    id: track.id,
                    artists: artists,
                    image: track.album.images[0].url
                }
            }

            res.type('json')
            res.json(
                {
                    username: USER_DISPLAY_NAME,
                    id: USER_ID,
                    avatar: USER_AVATAR,
                    now_playing: nowPlaying
                }
            );

        }, function (err) {
            if (err.statusCode == 401) {
                res.status(401);
                res.send('need to login first');
            } else {
                res.send(err);
            }
        });
};