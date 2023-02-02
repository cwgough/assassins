# Assassins: The Game
Copyright Chris Gough 2023

## About the app

This is a simple web app built using the MERN stack. At the moment, it can only be run locally, so if you'd like to test it out yourself, you'll have to first clone this repo.

> Assassins: The Game requires several dependencies in order to run locally. A full list, as well as installation instructions, are provided below.

Eventually, the app will be hosted on Heroku or something. See [ToDo](/ToDo.md) for a full list of remaining developer tasks.

**Note**: The login page ([localhost:3000](http://localhost:3000)) currently does nothing. Once you've initialized a list of players, navigate to [localhost:3000/<player-name>](http://localhost:3000/example) to view current progress.

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

 ## "Playing" the Game

Because the administrative functionality hasn't been built yet, developers will need to enter a list of players manually by making a request to the server. If you don't already have [Postman](https://www.postman.com/downloads/), I highly recommend installing it to make the following process a lot easier.

To initialize a list of players, make a POST request to [http://localhost:8000/assassins/initialize]() with a JSON object containing a list of player names in the request body. Format it like so:
```
{ "playerList": ["John", "Paul", "Jorge", "Ben"] }
```
Once the players are initialized, the game begins and players can start killing each other. Since there's no authentication, you can simply enter the name of the player you'd like to play as

Once the game has concluded, or if you wish to reset the players, make a DELETE request to [http://localhost:8000/assassins/clear](). Make sure you re-initialize the player list if you wish to play again!

ssh -i .ssh/assassins-aws-key.pem ec2-user@ec2-54-157-163-189.compute-1.amazonaws.com 