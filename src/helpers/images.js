const { Image } = require('../models');

module.exports = {

        //no se escribe la palabra clave function ya que esta dentro de un objeto
    //y se puede utilizar directamente declarando el metodo
        async popular() {
        const images = await Image.find()
        //va a encontrar la 9 imagenes mas populares
            .limit(6)
            //va a ordenar de las mas populares a las menos populares
            .sort({likes: -1})
            return images;
    }

}