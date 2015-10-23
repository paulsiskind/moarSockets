Step 1:

```
npm install --save socket.io
```

Step 2:

Attach the socket in `bin/www`

```
var listener = server.listen(port);
var io = require('socket.io')(listener);

io.on('connection', function(socket){
  console.log('a user connected');
});
```

Step 3:

Make a connection

```
script(src="/socket.io/socket.io.js")
script.
  var socket = io();
```
