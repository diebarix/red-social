const mongoose = require('mongoose');

//Destructuring: se refiere a que no accedera a todo el objeto sino a cierta parte de ese objeto
const {database} = require('./keys');

//usa el metodo connect para conectarse a la base de datos, objeto database atributo URI
mongoose.connect(database.URI, )
    .then(db => console.log ('DB is connected'))
    .catch(err => console.error(err));