# **Moody**

## Table of contents

- [Introduction](#Introduction)
- [Moody](#Moody)
- [Goals of this project](#Goals-of-this-project)
- [Technologies used](#Technologies-used)
- [Server repository](#Server-repository)

## **Introduction**

Hi, my name is Andre, and this is my portfolio project, a web application App called Traveler's Diary. This is a MVP and not the final version. It is fully functional but missing some features that will be implemented in the future.

## **Moody**

The idea behind this project is as a user to do some activity based on your mood and coonect people of the same mood on the same location. The Activities are all happen at the moment no plans,they are set based on a user mood. User can see who are joining the activity, a user can then decided to join if a user like the other users joined the activity, Users joined the same activity can also chat each other. The app trackers the user location and shows activities only near user location.

## **Goals of this project**

The main goal of this project is to gain experience developing a full-stack app. And implementing the skills I have been learning the past 10 weeks. I also push my self to use different libraries and exteranl apis to test my self how comfortable I can be with new things.

- Practice full-stack development;
- Practice the use of external API's
- Learn new technologies
- Implement a developer's approach by creating and following User stories and wireframes which can be found here:
  - [ User stories](https://github.com/users/Maki44/projects/1)
  - [Database Models](https://dbdiagram.io/d/6222179354f9ad109a5df884?raw=true)

## **Technologies used**

**Back end**

- Express
- REST
- Sequelize
- Postgres
- NodeJS

**Front end**

- Javascript
- React
- Redux
- Axios
- Geocode-Geolocation

**External API's**

- [GoogleNearBySearch API](https://maps.googleapis.com/maps/api/place/nearbysearch)
- [GoogleGeocode](https://maps.googleapis.com/maps/api/geocode)

## **Server repository**

The back-end was built in express and it is a REST a API. The database is built using Postgres and Sequelize. You can find the back-end's repository [HERE](https://github.com/Maki44/Make-friends-backend)

## **Setup**

- **Server setup**

  - clone the repository;
  - cd into the project directory
  - on first run, run the script `npm run initialize`, this will run `npm i && npm run resetDB && npm run start`;
  - afterwards simply run `npm run start` which will run the script `npx nodemon index.js` or `node index.js`
  - server runs on port 4000 by default

- **Client setup**
  - clone the repository;
  - cd into the project directory;
  - on first run, run the script `npm run initialize`, this will run `npm install && react-scripts start`;
  - afterwards first run just run the script `npm run start` to start development;
  - client runs on localhost:3000 by default;

:exclamation: You will need to create your own google API key and add in env file.
