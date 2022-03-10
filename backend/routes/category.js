
let express = require("express");
// importamos el controlador de categoria
let Category = require("../controllers/category");

// Creamos la api para controlar las rutas
let api = express.Router();

// Rutas de la API
api.post("/category/registrarCategory", Category.registrarCategory);
api.get("/category/:id", Category.buscarCategory);
api.get("/category/", Category.listaCategory);
api.post("/category/:title?", Category.listaCategory);
api.put("/category/editarCategory/:id", Category.editarCategory);
api.delete("/category/eliminarCategory/:id", Category.eliminarCategory);

// Exportamos el modulocategory/registrarCategory
module.exports = api;
