var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('events', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'events' database");
        db.collection('events', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'events' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving event: ' + id);
    db.collection('events', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addEvent = function(req, res) {
    var event = req.body;
    console.log('Adding event: ' + JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.insert(event, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.addEvents = function(req, res) {
    var events = req.body;
    console.log('Adding events: ' + JSON.stringify(events));
    db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) {
	    if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


 
exports.updateEvent = function(req, res) {
    var id = req.params.id;
    var event = req.body;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collectio1n.update({'_id':new BSON.ObjectID(id)}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(event);
            }
        });
    });
}
 
exports.deleteEvent = function(req, res) {
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    db.collection('events', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
var populateDB = function() {
 
    var events = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) {});
    });
 
};