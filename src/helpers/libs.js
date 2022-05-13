const helpers = {};
//creamos numero aleatorios
helpers.randomNumber = () => {
    const possible = 'abdefghiklmnopqrstubwxyz'
    let randomNumber = 0;
    for (let i = 0; i < 6; i++) {
        //charAt selecciona un caracter del resultado de la operacion de seleccionar un numero aleatorio con la cantidad de possible
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber;
}
module.exports = helpers;