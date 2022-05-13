const path = require('path');
//vemos lo que esta pidiendo el usuario
const morgan = require('morgan');
//subir imagenes desde un formulario al servidor
const multer = require('multer')
const express = require("express");
//maneja errores
const errorHandler = require('errorhandler');
//conecta handlebars con express
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const routes = require('../routes/index')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

module.exports = app => {

    //settings
    app.set('port', process.env.PORT || 3001 );
    app.set('views', path.join(__dirname, '../views'));
    //configuracion de express-handlebars
    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', '.hbs');
    
    //middlewares
    //informacion de la peticiones del usuario
    app.use(morgan('dev'));
    //colocar imagenes a esa direccion donde se suban ___________________solo guardara UNA imagen
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'))
    //recibe datos de formularios
    app.use(express.urlencoded({extended: false}))
    //manejo de likes, para entender los objetos enviado en ajax
    app.use(express.json())

    //routes
    //funciones de preprocesado
    routes(app)
    
    //static files, (Son archivos que no cambian)
    app.use('/public', express.static(path.join(__dirname, '../public')))
    //error handlers
    if ('development' === app.get('env')){
        app.use(errorHandler);
    }

    return app
    
}