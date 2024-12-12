# Restaurant api real-time orders | Websocket | NodeJS

This api is consumed by [Restaurant web app](https://github.com/luismiguel0406/restaurant-web-app) and contains:
- `Websocket:` using Socket.io to update the orders status in realtime, issuing values to frontend app for update it.
- `Redis Database - Cache:` implementation for persistent during disconnection from client app, that ensure to store events that cannot be sent on it.

  Source data from [themealdb](https://www.themealdb.com/), api for development purposes
  

## How to run
- Run `npm install` and after `npm run dev`
- Visit in your browser: `http://localhost:3000`
