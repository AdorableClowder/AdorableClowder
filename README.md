# Skillit

Skillit is a skill-sharing platform that facilitates matchmaking between passionate learners and teachers.  

## Team

  - __Product Owner__: Michael Arnold
  - __Scrum Master__: Justin Thareja
  - __Development Team Members__: Sarah Yu, Austin Worachet

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)


## Requirements

- Node 0.10.x
- MYSQL 5.x
- npm 2.10.x
- bower 1.4.x

## Development
### Getting Started
<b>Step 1:</b> Fork the repo to your own github profile

<b>Step 2:</b> Clone your fork to a local directory on your computer
```sh
$ git clone https://github.com/YOUR_USERNAME/AdorableClowder.git
```

<b>Step 3:</b> Open a new terminal window and navigate to your clone of AdorableClowder

<b>Step 4:</b> Install Dependencies
```sh
$ npm install
$ bower install
```
<b>Step 5:</b> Open a new terminal window to start mySQL and log in
```sh
$ mysql.server start
$ mysql -u root
```
<b>Step 6:</b> Create a local database called 'clowderdb' from within mySQL
```sh
mysql> CREATE DATABASE clowderdb;
```
<b>Step 7:</b> Start the server 

```sh
$ node server.js
```
<b>Step 8:</b> Navigate to localhost:1337 in your browser and start hacking!

### Client/Server Architecture
<!-- client server archetcture diagram -->
### Database Architecture
To access the database
<!-- db schema -->
<!-- a /u clowderdb sql command to access directly -->

### Roadmap

View the project roadmap [here](https://github.com/AdorableClowder/AdorableClowder/issues)


## Contributing

see [docs/CONTRIBUTING.md](https://github.com/AdorableClowder/AdorableClowder/blob/master/docs/_CONTRIBUTING.md) for contribution guidelines.
