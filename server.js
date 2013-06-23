var express = require('express'),
    event = require('./routes/events');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/events', event.findAll);
app.get('/events/:id', event.findById);
app.post('/events/add', event.addEvent);
app.post('/events/addMany', event.addEvents);
app.put('/events/:id', event.updateEvent);
app.delete('/events/:id', event.deleteEvent);
 
app.listen(3000);
console.log('Listening on port 3000...');
