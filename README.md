# ICTPRG549 - Apply intermediate object-oriented language skills 2022

Created by Michael Hermann
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Contents

- Description
- Installation instructions
- Run Application
- Run Unit Tests
- Usage Guide
- Further Help

## Description

You have been asked to re-develop the Two-up game (Link to assessment page for ICTPRG437). This project could be coded using JavaFX and Visual Studio Code. You are free to discuss your choice of language with your assessor when you gather the program requirements. The game will be based on the toss of two coins. The company you work for is keen to support its workers who work on Anzac Day. To that end they have decided to offer them a two-up game to play on Anzac Day. It is a game of chance, and no betting will be permitted. The game will be played at lunchtime on the day and the person who has won the most games at the end of the break will be given a meal voucher. You are to research Two-up and its origins and the rules of the game. Create a graphical user interface (GUI) for the game that is customisable for each player.

- When the coins are tossed an animation of two spinning coins will be displayed.
- User name and password required.
- Connection to an online MySQL database required.
- Transactional integrity must be kept.
- Create a leader ladder

## Installation instructions

1. Check Node `npm -v` (If not found install node/newest version)
2. Install Angular Client `npm install -g @angular/cli`
3. Install Node Packages `npm i`
4. Add Install Angular Material `ng add @angular/material`

## Run Application

Ensure there are 2 seperate terminal windows open
In first terminal ensure directory is the game folder TwoUp2.
Use `cd api` to navigate to backend folder in the second terminal.

To run database `node server.js`, database should start listening on port 5000. Messgaes reading 'Server is running on port 5000' and 'Connection to database established' should be displayed in the console
To run application `ng serve -o`, Navigate to `http://localhost:4200/`.

If connected to database, the users and game results will both be stored with the myAQL database in seperate tables.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Usage guide

1. Run application
2. Register a username and password
3. Login using the username and password
4. Click fishing rod to begin game
5. Fish image and choice buttons should appear
6. Click choice buttons
7. Score and count updates
8. Game screen resets
9. Click rod to continue playing
10. Click bucket to view count of kept fish
11. Click 'X' button to end the game
12. View game results on end game screen
13. Select 'PLay Again' to play another round
14. Select 'End Game' to end the session and be navigated back to the login page

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
