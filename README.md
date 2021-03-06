# Note keeper API

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7d392b3d56da43dc9a908d8dcd4e5548)](https://app.codacy.com/manual/Regent76/note-keeper?utm_source=github.com&utm_medium=referral&utm_content=Regent76/note-keeper&utm_campaign=Badge_Grade_Dashboard)

Server API for Note keeper web application
Working with notes (Node.js, ExpressJS, MongoDB)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/44d82974b18c4ced8bd55dd2658b8f1f)](https://www.codacy.com/manual/Regent76/note-keeper?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Regent76/note-keeper&amp;utm_campaign=Badge_Grade)
## Getting Started

This is the BACKEND application written in Node.js ecosystem.
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

    -  Git version > 2.21.0
    -  Node.js > v8.16.0
    -  Npm > 6.4.x
    -  Nodemon > 2.0.x
    -  MongoDB server > 3.x

## Installing

Clone the project:
```bash
    $ git clone https://github.com/Regent76/note-keeper.git
```

Enter projects root dir:
```bash
    $ cd note-keeper
```

Install dependencies:
```bash
    $ npm install
```

Create .env:
```text
    APP_JWT_KEY=THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING
    APP_MONGO_SRV_URI=mongodb+srv://<Login>:<Password>@cluster0-hc90e.mongodb.net/notekeeper?retryWrites=true&w=majority
    APP_PARAMS_PER_PAGE=20
```
    
## Running

Run the application:
```bash
    $ nodemon server.js
```
    
## Develop

Dev if the server is running by:

```bash
    $ npm run start:dev
```

## Testing

Test with Postman, etc.. if the server is running by:

```bash
    $ curl -i http://localhost:5000
```
## Testing Mocha

Run Mocha tests:
```bash
    $ npm run test
```