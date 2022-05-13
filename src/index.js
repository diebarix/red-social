const express = require('express');

const config = require('./server/config');

//base de datos
require ('./database');
const app = config(express());


//empieza el servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
});