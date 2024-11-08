require('dotenv').config();
const mongoose = require('mongoose');

// Install and Set Up Mongoose
// https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Model
const Schema = mongoose.Schema

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
    let dogukanPerson = new Person({ name: 'Dogukan', age: 26, favoriteFoods: ['Sushi', 'Burger'] });

    dogukanPerson.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    })
};


// Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
        if (err) return console.error(err);
        done(null, data);
    })
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
        if(err) return console.error(err);
        done(null, data);
    })
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, data) => {
        if(err) return console.error(err);
        done(null, data);
    });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
        if(err) return console.error(err);
        done(null, data);
    });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    Person.findById(personId, (err, data) => {
        if(err) return console.error(err);
        data.favoriteFoods.push(foodToAdd);
        data.save((err, data) => {
            if(err) return console.error(err);
            done(null, data);
        });
    });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
        if(err) return console.error(err);
        done(null, data);
    });
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
        if(err) return console.error(err);
        done(null, data);
    });
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
