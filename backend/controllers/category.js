// Importamos el modelo categoria
let Category = require("../models/category");

// Registramos categoria POST
const registrarCategory = (req, res) => {
  // obtenemos los datos del JSON
  let params = req.body;
  // Creamos nueva instancia de categoria
  let category = new Category();
  // guardamos los datos del req en la coleccion
  category.title = params.title;
  category.description = params.description;
  // save - guardamos la info en mongoDB
  category.save((err, saveCategory) => {
    // si llega un error desde el servidor de mongo
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (saveCategory) {
        res.status(200).send({ category: saveCategory });
      } else {
        res.status(401).send({ mensaje: "No se pudo registrar la categoria" });
      }
    }
  });
};

// Buscar categorias
const buscarCategory = (req, res) => {
  // obtenemos el id de la categoria
  let id = req.params["id"];
  // buscamos la categoria por el ID
  Category.findById({ _id: id }, (err, datosCategory) => {
    // si hay error al conectar con mongo
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosCategory) {
        res.status(200).send({ category: datosCategory });
      } else {
        res.status(401).send({ mensaje: "La categoria no existe" });
      }
    }
  });
};

// Listar categorias con o sin filtro
const listaCategory = (req, res) => {
  // si tenemos filtro nombre lo guardamos
  let title = req.params["title"];
  // Busqueda de las categorias
  Category.find({ title: new RegExp(title, "i") }, (err, datosCategory) => {
    // si hay error al conectar con mongo
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosCategory) {
        res.status(200).send({ category: datosCategory });
      } else {
        res.status(401).send({ mensaje: "No hay categorias" });
      }
    }
  });
};

// Editar categoria.
const editarCategory = (req, res) => {
  // obtenemos el id de la categoria
  let id = req.params["id"];
  // Obtenemos los datos que llegan de la API
  let params = req.body;
  // buscar la categoria por ID, y editarla
  Category.findByIdAndUpdate(
    { _id: id },
    { title: params.title, description: params.description },
    (err, datosCategory) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosCategory) {
          res.status(200).send({ category: datosCategory });
        } else {
          res.status(401).send({ mensaje: "La categoría no se pudo editar" });
        }
      }
    }
  );
};

// Eliminamos una categoria
const eliminarCategory = (req, res) => {
  // obtener el id de la categoria
  let id = req.params["id"];
  // Eliminamos la categoria por el ID
  Category.findByIdAndDelete({ _id: id }, (err, datosCategory) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosCategory) {
        res.status(200).send({ category: datosCategory });
      } else {
        res.status(401).send({ mensaje: "La categoría no se pudo eliminar" });
      }
    }
  });
};

module.exports = {
  registrarCategory,
  buscarCategory,
  listaCategory,
  editarCategory,
  eliminarCategory,
};
