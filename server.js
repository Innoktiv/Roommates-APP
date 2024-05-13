const express = require('express');
const fs = require('fs-extra');
const { crearRoommate } = require('./roommate');
const {
  obtenerGastos,
  crearGasto,
  modificarGasto,
  eliminarGasto,
  obtenerRoommates,
} = require('./gasto');
const { enviarCorreoNuevoGasto } = require('./emails'); // Opcional
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta para obtener el HTML
app.get('/', (req, res) => {
  fs.readFile('./Apoyo Desafío - Roommates/index.html', 'utf8', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al cargar el HTML');
      return;
    }
    res.send(html);
  });
});

// Ruta para crear un roommate
app.post('/roommate', async (req, res) => {
  try {
    const nuevoRoommate = await crearRoommate();
    await fs.writeJson('./roommates.json', [...obtenerRoommates(), nuevoRoommate]);
    res.status(201).json(nuevoRoommate);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear roommate');
  }
});

// Rutas para gestionar gastos
app.get('/gastos', obtenerGastos);
app.post('/gasto', crearGasto);
app.put('/gasto', modificarGasto);
app.delete('/gasto', eliminarGasto);

// Ruta para obtener roommates
app.get('/roommates', obtenerRoommates);

// Enviar correo electrónico con nuevo gasto (opcional)
app.post('/gasto', async (req, res, next) => {})
