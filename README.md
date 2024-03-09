# Spotify Sorter

Visualize your current music and sort it using shortcuts to add it to multiple playlists at a time.
## Table of contents

- [Installation](#installation)
- [Roadmap](#roadmap)
- [Credits](#credits)
## Installation

> [!NOTE]
> This project require to have [Docker](https://www.docker.com/get-started/) installed and a Spotify account.


### Create an App in Spotify's Developers Dashboard.

- Go to [Spotify's Developers Dashboard](https://developer.spotify.com/dashboard) and create a new Spotify Application.

- In the **Redirect URIs** section, add the application's callback URL `http://localhost:3000/callback`.

- Accept the Spotify's Developer Terms of Service and click the 'Save' button to create the App.

- Once created, go to the 'Settings' page of the application and copy your App `CLIENT_ID` and `CLIENT_SECRET`.

> [!TIP]
> To view your client secret click the 'View client secret' text.

### Download the project.
```bash
$ git clone xxx
```

### Configure the project.

To run the project you need to add your Spotify App `CLIENT_ID` and `CLIENT_SECRET` in the `src/config.js` file.

Example for `src/config.js` file.
```js
module.exports = SPOTIFY_CLIENT_ID = '8c7e314b47d84c009f20320d6de0a936';
module.exports = SPOTIFY_CLIENT_SECRET = '015f1794891a4c79a51b2a1d7532ba4c';

module.exports = PORT = 3000;
```

> [!NOTE]
> If you want to change the port used to access the application, you need to update it in the `docker-compose.yml` file.\
> e.g. To run the application on port 6969 you need to replace `'3000:3000'` by `'6969:3000'` in the `docker-compose.yml` file.\
>Don't forget to **also update the callback URI** in the Spotify Application Dashboard using the new port number.

### Running the project.

Once configured you can run the project using Docker compose.\
**In the same directory as the `docker-compose.yml` file**, run the following command to run the container.
```bash
$ docker compose up -d --build
```
\
Once the container is started, you can access the app with this url [http://localhost:3000/](http://localhost:3000/)
## Roadmap

- Player inspired by Spotify's full screen mode.

- Feature to change the order of shortcuts.
## Credits

 - This project uses the **Michael Thelin**'s [Spotify wrapper](https://github.com/thelinmichael/spotify-web-api-node) for the Spotify Web API.