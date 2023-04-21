const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
// mongodb://127.0.0.1:27017/recipe-app
// mongodb://localhost:27017
const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

const pizzaPepperoni = {
  title: 'Pepperoni Pizza',
  level: 'Easy Peasy',
  cuisine: 'Italian',
  ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni']
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(pizzaPepperoni)
  })
  .then((responseFromDatabase) => {
    console.log(responseFromDatabase)
    return Recipe.insertMany(data)
  })
  .then((responseFromDatabase) => {
    console.log(responseFromDatabase)
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then((responseFromDatabase) => {
    console.log("updated the db:", responseFromDatabase)
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then((responseFromDatabase) => {
    console.log("deleted: ", responseFromDatabase)
    return mongoose.connection.close()
  })
  .then (() => {
    console.log("closed connection")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
