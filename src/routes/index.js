const express = require('express');
const router = express.Router();

const home = require('../controllers/home')
const image = require('../controllers/image')

module.exports = app => {
    router.get('/', home.index);
    //cuando el usuario busque el id de una imagen mostralo
    router.get('/images/:image_id', image.index);
    //el usuario podra subir imagenes atraves de un formulario
    router.post('/images', image.create);
    //dar likes con Smetodos ajax
    router.post('/images/:image_id/like', image.like);
    //hacer comentarios
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);

    app.use(router);
};
