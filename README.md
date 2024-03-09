# Spotify Sorter

Visualize your current music and sort it using shortcuts to add it to multiple playlists at once.


## Table of contents

- [Installation](#installation)
- [Roadmap](#roadmap)
- [Credits](#credits)


## Installation

> [!NOTE]
> This project require having [Docker](https://www.docker.com/get-started/) installed and a Spotify account.

### Create an App in Spotify's Developer Dashboard

- Go to [Spotify's Developer Dashboard](https://developer.spotify.com/dashboard) and create a new App.

- In the **Redirect URIs** section, add the application's callback URL: `http://localhost:3000/callback`.

- Accept Spotify's Developer Terms of Service and click the 'Save' button to create the App.

- Once created, go to the 'Settings' page of the App and copy your App `CLIENT_ID` and `CLIENT_SECRET`.

> [!TIP]
> To view your client secret, click the 'View client secret' text.

### Download the project
```bash
$ git clone git@github.com:MaximeSahuc/Spotify-Sorter.git
```

### Configure the project

To run the project, you need to add your Spotify App CLIENT_ID and CLIENT_SECRET to the .env file.

The .env file should look like this:
```
SPOTIFY_CLIENT_ID=REPLACE_WITH_YOUR_APP_CLIENT_ID
SPOTIFY_CLIENT_SECRET=REPLACE_WITH_YOUR_APP_CLIENT_SECRET
PORT=3000
```

> [!NOTE]
> If you want to change the port used to access the application, you need to update it in the `.env` file.\
> Don't forget to **also update the callback URI** in the Spotify Application Dashboard using the new port number.

### Running the project

Once configured, you can run the project using Docker Compose.\
**In the same directory as the `docker-compose.yml` file**, run the following command to run the container.
```bash
$ docker compose up -d --build
```
\
Once the container is started, you can access the app with this URL: [http://localhost:3000/](http://localhost:3000/)


## Roadmap

- Player inspired by Spotify's full-screen mode.

- Feature to change the order of shortcuts.


## Credits

 - This project uses **Michael Thelin**'s [Spotify wrapper](https://github.com/thelinmichael/spotify-web-api-node) for the Spotify Web API.