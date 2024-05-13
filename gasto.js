const fs = require('fs-extra');
const path = require('path');

const obtenerGastos = async () => {
    try {
        const gastosData = await fs.readJson(path.join(__dirname, 'gastos.json'));
        return gastosData;
    } catch (err) {
        console.error('Error al obtener gastos:', err);
        return []; // Retorna array vacio en caso de error
    }
};

const crearGasto = async (req, res) => {
    try {
            const nuevoGasto = req.body; // info de gastos
            if (!nuevoGasto || !nuevoGasto.descripcion || !nuevoGasto.monto || !nuevoGasto.roommateId) {
            throw new Error('Datos de gasto incompletos');
        }

        const gastos = await obtenerGastos();
        const nuevoGastoId = uuid.v4(); // Crea ID por gasto
        gastos.push({
            id: nuevoGastoId,
            ...nuevoGasto, // Spread the expense data
            fecha: new Date().toISOString(), // Agrega timestamp
        });

        await fs.writeJson(path.join(__dirname, 'gastos.json'), gastos);
        
        // Recalcular cuentas y enviar correo electrónico (opcional)
        // Implementar lógica para recalcular las cuentas de los roommates
        // Enviar correo electrónico a los roommates con la información del nuevo gasto (opcional)

        res.status(201).json({
        message: 'Gasto creado exitosamente',
        gasto: nuevoGasto,
        });
    } catch (err) {
        console.error('Error al crear gasto:', err);
        res.status(400).send('Error al crear gasto');
    }
    };

    const modificarGasto = async (req, res) => {
    try {
        const gastoModificado = req.body;
        if (!gastoModificado || !gastoModificado.id || !gastoModificado.descripcion || !gastoModificado.monto || !gastoModificado.roommateId) {
        throw new Error('Datos de gasto incompletos');
        }

        const gastos = await obtenerGastos();
        const indiceGasto = gastos.findIndex(gasto => gasto.id === gastoModificado.id);
        if (indiceGasto === -1) {
        throw new Error('Gasto no encontrado');
        }

        gastos[indiceGasto] = gastoModificado; // Update gastos
        await fs.writeJson(path.join(__dirname, 'gastos.json'), gastos);

        res.status(200).json({
        message: 'Gasto modificado exitosamente',
        gasto: gastoModificado,
        });
    } catch (err) {
        console.error('Error al modificar gasto:', err);
        res.status(400).send('Error al modificar gasto');
    }
    };

    const eliminarGasto = async (req, res) => {
    try {
        const gastoId = req.query.id; // Si ID se pasa como parametro query
        if (!gastoId) {
        throw new Error('ID de gasto no proporcionado');
        }

        const gastos = await obtenerGastos();
        const indiceGasto = gastos.findIndex(gasto => gasto.id === gastoId);
        if (indiceGasto === -1) {
        throw new Error('Gasto no encontrado');
        }

        gastos.splice(indiceGasto, 1); // Remueve gasto del array
        await fs.writeJson(path.join(__dirname, 'gastos.json'), gastos);

        res.status(200).json({
        message: 'Gasto eliminado exitosamente',
        gastoId,
        });
    } catch (err) {
        console.error('Error al eliminar gasto:', err);
        res.status(400).send('Error al eliminar gasto');
    }
    };

    const obtenerRoommates = async () => {
    try {
        const roommatesData = await fs.readJson(path.join(__dirname, 'roommates.json'));
        return roommatesData;
    } catch (err) {
        console.error('Error al obtener roommates:', err);
        return []; // Retorna array vacio en caso de error
    }
    };

    module.exports = {}
    
