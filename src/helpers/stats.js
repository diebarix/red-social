const { Comment, Image } = require('../models');

async function imageCounter() {
    //este metodo se encargar de contar el total de las imagenes
    return await Image.countDocuments()
}
async function commentsCounter() {
    return await Comment.countDocuments()

}
async function imageTotalViewsCounter() {
    //.aggregate va a tomar cada imagen de Image
    const result = await Image.aggregate([
        {
        $group: {
        "_id": '1',
        //$views hace referencia a la propiedad vista de cada imagen
        //las va a ir sumando y acumulando en viewsTotal
        "viewsTotal": {"$sum": '$views'}
    }}])
    let viewsTotal = 0;
    if (result.length > 0) {
        viewsTotal += result[0].viewsTotal;
    }
    //[{_id: '1', viewsTotal: '30'}]
    // result retorna un arreglo y le estamos diciendo que queremos el primer arreglo a su propiedad views total
    return result[0].viewsTotal
}
async function LikesTotalCounter() {
    //$group toma un objeto como parametro
    const result = await Image.aggregate([{
        $group: {
            "_id": '1',
            "likesTotal": {"$sum": '$likes'}
        }
    }])
    return result[0].likesTotal
}
module.exports = async () => {
    //Promise.all, puede ejecutar una enorme cantidad de funciones y ejecutarla al mismo tiempo, en paralelo
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        LikesTotalCounter()
    ])
    //va a devolver otro arreglo con los resultado de cada funcion
    //cada posicion del arreglo hara referencia a su valor de la funcion
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3],
    }
}