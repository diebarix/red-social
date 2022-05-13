const mongoose = require('mongoose');
//permite crear un nuevo esquema de la base de datos
const {Schema} = mongoose;
const path = require('path');
//voy diciendo que datos quiero de cada unidades
const imageShema = new Schema({
    title: {type: String},
    description: {type:String},
    filename: {type:String},
    views: {type:Number, default:0},
    likes: {type:Number, default:0},
    timestamp: {type:Date, default:Date.now}
});

//es una variable virtual que se va a crear cuando obtengamos un dato y no esta almacenada en la base de datos 
imageShema.virtual('uniqueId').get(function (){
        //remplaza la extension de filename por vacio, esto significa que la elimina
        return this.filename.replace(path.extname(this.filename), '');
    });

//creo el modelo que tendra las imagenes y se lo digo a mongoose
module.exports = mongoose.model('Image', imageShema );