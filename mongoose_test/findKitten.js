// findKitten.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

var kittySchema = mongoose.Schema({
  name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

Kitten.find({ name: /^fluff/ }, function(err, kitten){
    if(err) return HandleError(err);
    console.log(kitten);
});

Kitten.find({}, function(err, kitten){
    if(err) return HandleError(err);
    console.log(kitten);
});
