const ctrl = {};
/* import {Image} from "../models" */
const {Image} = require('../models')

const sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res) => {
    
    const images = await Image.find().sort({timestamp: -1})
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel)
    /* console.log(viewModel.sidebar.comments[0].image) */
    res.render('index', viewModel);
};

module.exports = ctrl;