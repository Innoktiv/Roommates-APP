const axios = require('axios'); // Axios for external API calls
const uuid = require('uuid');

const crearRoommate = async () => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const data = response.data.results[0];

        return {
        id: uuid.v4(), // Generate a unique ID
        nombre: `${data.name.title} ${data.name.first} ${data.name.last}`,
        correo: data.email,
        // + propiedades de roommate 
        };
    } catch (err) {
        console.error('Error al obtener usuario aleatorio:', err);
        throw new Error('Error creando roommate');
    }
};

module.exports = { crearRoommate };
