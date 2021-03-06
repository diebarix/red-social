//se coloca en mayuscula por que voy a importar un modelo de datos
const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async function (viewModel) {
    const results = await Promise.all([
        /* Stats(), */
    Images.popular(),
    Comments.newest()]);

    viewModel.sidebar = {
        /* stats: results[0], */
        popular: results[0],
        comments: results[1]
    }
    return viewModel
}