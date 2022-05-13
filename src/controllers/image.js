const path = require('path');
const {randomNumber} = require('../helpers/libs');
//nos permite manejar archivos pero con async y await
const fs = require ('fs-extra');
const md5 = require('md5')
const ctrl = {};
const {Image, Comment} = require('../models')
const sidebar = require('..//helpers/sidebar')

ctrl.index = async (req,res) => {
    let viewModel = {image: {}, comments: {}}
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        //el ._id viene del id de la propia imagen
        //la imagen tiene una propiedad _id
        const comments = await Comment.find({image_id: image._id})
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel)
        console.log(image);
        console.log(image.title);
        /* console.log(image.uniqueId) */
        res.render('image', viewModel )
    } else {
        res.redirect('/')
    }

}

ctrl.create =  (req, res) => {
    const saveimage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename: imgUrl})
        if (images.length > 0) {
            saveimage()
        } else {
            console.log(imgUrl);
            console.log(req.file);
            /* console.log(uniqueId) */
            const imageTempPath = req.file.path;
            //obtengo la extension de originalname y la convierto en minuscula
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();
            //ruta donde voy a colocar la imagen
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                })
                //almacena la informacion
                const imageSaved = await newImg.save();
                res.redirect('/images/' + imageSaved)
            } else {
                await fs.unlink(imageTempPath)
                res.status(500).json({error: 'only images are allowed'})
            }
        }
    }
    saveimage();
}

ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    if (image) {
        image.likes = image.likes + 1;
        await image.save();
        console.log(image)
        console.log('pepe')
        res.json({likes: image.likes})
    } else {
        res.status(500).json({error: 'Internal Error'})
    }
};
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    if (image) {
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id;
        console.log(newComment);
        //con .save se guarda en la base de datos
        await newComment.save();
        //al usar esta funcion redirect le envia que la direccion a donde lo vamos a enviar es en este caso ahi mismo
        res.redirect('/images/' + image.uniqueId);
    }else {
        res.redirect('/')
    }
}
ctrl.remove = async (req, res) => {
    //con esto encuentro el id
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    
    if (image) {
        //unlink remueve un dato a partir de una direccion que yo le de
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        //deleteOne solo elimina algunos
        await Comment.deleteOne({image_id: image._id})
        //remueve el dato de la misma imagen
        await image.remove()
        res.json(true)
    }
}
module.exports = ctrl;