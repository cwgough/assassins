# Assassins: The Game
Copyright Chris Gough 2023 | cwilliam.gough@gmail.com

## About the app

This is a simple web app built using the MERN stack and deployed using [Render.com](https://render.com/). The deployed application is available [here](https://pct-assassins.onrender.com/). The following instructions are for local deployment only.

> Assassins: The Game requires several dependencies in order to run locally. A full list, as well as installation instructions, are provided below.

This app is a work in progress. See [ToDo](/ToDo.md) for a full list of remaining developer tasks.

**Note**: The live website is not currently configured for gameplay, so registering a new user and subsequently logging in will display a message indicating that your player has been assassinated. There does not yet exist administrative functionality to initialize a new game, so if you wish to play, please get in touch.

## Local Installation and Setup

Once you've cloned the repo, you'll need to install a few dependencies. From the backend folder, enter the following:
 ```
 npm i body-parser concurrently cors express mongoose
 ```
 This will install the methods required to run the server. `concurrently` is used to run the server with the front-end. Next, install `nodemon` as a development dependency.
 ```
 npm i -g nodemon
 ```
 This allows the server to automatically restart after changes are made. 

 Once the dependencies have been installed, enter `npm run dev` to launch the application.

 ## Playing the Game

Because the administrative functionality has not been built yet, I will have to delete all old players to start a new game. Once this has been done, new players can register and sign in. Until the game has been initialized (which, again, only I can do), logged-in users will see a message indicating that they have been assassinated. After initialization, however, the logged-in user will see the name of their target, along with a button labeled "Confirm Kill." When they "kill" their target, the target will have to confirm that they have, in fact, been eliminated (to prevent cheating). Eliminated players are out of the game, and the assassin will receive a new targett.
