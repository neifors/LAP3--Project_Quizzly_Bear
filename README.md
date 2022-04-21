# QUIZZLY BEARS APP
## Who's the smartest Teddy?

# Table of Contents

- Who we are
- Purpose of our app
- Installation & Usage
- Deployment
- Technologies
- Database Schema
- Routes
- Testing
- How it looks


# **Who we are**

We are currently a tech trainees at futureproof. This project group is composed by:

[Andrew](https://github.com/nottnottloop), [Isabel](https://github.com/neifors), [Orla](https://github.com/orlasinclair) and [Tom](https://github.com/Graingertom)


# **Purpose of our app**

Quizzly Bears is a quiz game suitable for all.

#### What is exactly a quiz game?

A quiz is a form of game or mind sport in which players attempt to answer questions correctly about a certain or variety of subjects. Quizzes can be used as a brief assessment in education and similar fields to measure growth in knowledge, abilities, or skills. 

#### Learning while enjoying...

We don't think there is a better way to learn than playing this amazing game where you will be able to choose between many categories and also choose a level of difficulty giving you an opportunity to challenge yourself.

#### ENJOY IT!


# **Installation & Usage**

### Installation

- Clone the repo
- Open terminal and navigate to the `LAP3--Project_Quizzly_Bear` folder

### Local Usage (Client)

- Go to `clien` folder
- Run `npm install` to install all the dependencies
- Run `npm run dev`
- You should get the browser opening and displaying the client automatically
- In the case you don't, manually open the browser and navigate to http://localhost:8080

### You can't run the server locally because it needs some enviroment variables which must be secret for security reasons

# **Deployment**

### API

- Server app and Mongodb database have been deployed using the same platform: [Azure](https://azure.microsoft.com/en-gb/)
- It was a really nice experience to use Azure because of how easy it was. Just followed [this guide](https://dev.to/bjhaid_93/deploy-a-node-js-express-mongodb-api-to-azure-app-service-via-visual-studio-code-58ln) and everything was deployed and connected
- This is the link to our API: [Quizzly Bears Server Side](https://quizzlybears.azurewebsites.net/)

### Client

- Our React app has been deployed using [Netlify](https://www.netlify.com/)
- This is the link to our Client: [Quizzly Bears App](https://quizzly-bear.netlify.app/)

# **Technologies**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Docker](https://docker.com/)
- [Jest](https://jestjs.io/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)

# **Database Schema**

- `users`

#### Users schema example:

```json
{
	"_id" : ObjectId("62612211cf3af46986045e50"),
	"username" : "123456",
	"password" : "$2a$10$Kk5udO8kzfG39ejUtf03SOvGGz4caDtuLZsR27FIVFyh2Qx.Tlf/u",
	"score" : 0
}
```


# **Routes**

![Routes table](https://i.ibb.co/xY4D6HW/2022-04-21-2.png)


# **Testing**

## Client

## Server

- Tests are running into a Docker enviroment.
- To build up this enviroment we used the files bellow:

`bash _scripts/startTest.sh`

- Starts api & db services
- Runs db migrations
- Attaches to api container and triggers full test run
- No ports mapped to local host 

`bash _scripts/teardown.sh`

- Stops all running services
- Removes containers
- Removes volumes


![Server COVERAGE](https://i.ibb.co/pQwc4Vz/2022-04-20-5.png)

# **Wins & Challenges**

## Wins

## Challenges

# **How it looks**

![Homepage](https://i.ibb.co/25Hpzny/2022-04-21-3.png) ![Login form](https://i.ibb.co/6JPcmhc/2022-04-21-4.png) ![Register form](https://i.ibb.co/cJkHN9C/2022-04-21-5.png)
