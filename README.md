# Socket.io Sample Application

![](assets/sockets.gif)

## Step 1: Get the app up and running

```
npm install
nodemon
```

Open http://localhost:3000/ in 3 or 4 different windows, then click through the app and see how it works.

In particular, look into:

- `public/javascripts/app.js`
- `lib/io.js`

## Step 2: Add custom messages

Right now there are hardcoded messages being sent from Angular.  Add a text boxes and alter both the client-side and server-side code to use these user-defined messages.

## Step 3 (optional): Store messages in a db

Store each message, along with the associated room, in a database, and display those messages on page load.

- Would you send them all down via sockets or AJAX?
- How would you deal with the fact that there might be a gap between page load and when the sockets connect?
