var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected');
});

var usersSchema = mongoose.Schema({
    user_id : String,
    age : Number,
    status : String
})

var Users = mongoose.model('Users', usersSchema);

var user1 = new Users({
    user_id : 'bbkim',
    age : 27,
    status : 'F'
});

var user2 = new Users({
    user_id : 'jotun',
    age : 3,
    status : 'A'
});

user1.save(function (err, user1) {
    if (err) return console.error(err);
    console.log('saved1');
});

user2.save(function (err, user2) {
    if (err) return console.error(err);
    console.log('saved2');
});
