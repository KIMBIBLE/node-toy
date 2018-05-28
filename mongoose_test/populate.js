var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected');
});

var Schema = mongoose.Schema;

/* make schema */
var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
// Our Person model has its stories field set to an array of ObjectIds.

// The ref option is what tells Mongoose which model
// to use during population, in our case the Story model.

// All _ids we store here must be document _ids from the Story model.

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

/* compile schema to model */
var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

/* make instance of model which corresponding to collection's document */
var author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  var story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});


/* find data from mongodb */
/*
> db.people.find().pretty()
{
	"_id" : ObjectId("5b0baa7feba11a448e9faee2"),
	"stories" : [ ],
	"name" : "Ian Fleming",
	"age" : 50,
	"__v" : 0
}
> db.stories.find().pretty()
{
	"_id" : ObjectId("5b0baa7feba11a448e9faee3"),
	"fans" : [ ],
	"title" : "Casino Royale",
	"author" : ObjectId("5b0baa7feba11a448e9faee2"),
	"__v" : 0
}
> db.people.find({name:'Ian Fleming'}).pretty()
{
	"_id" : ObjectId("5b0baa7feba11a448e9faee2"),
	"stories" : [ ],
	"name" : "Ian Fleming",
	"age" : 50,
	"__v" : 0
}
> db.people.find({name:'Ian Flemin'}).pretty()
*/
