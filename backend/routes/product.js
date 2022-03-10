let express = require("express");

let Product = require("../controllers/product");

let multipart = require("connect-multiparty");

let path = multipart({cargas : "./uploads/imgproduct" });

let api = express.Router();

api.post("/product/registrarProduct", path ,Product.registrarProduct);
api.get("/product/:id", Product.obtenerProduct);
api.get("/product/:name?", Product.listaProduct);
api.post("/product/:name?", Product.listaProduct);
api.put("/product/editarProduct/:id", path , Product.editarProduct);
api.delete("/product/eliminarProduct/:id",   Product.eliminarProduct);
api.get("/product/img/:img", Product.obtenerImage);





module.exports = api;