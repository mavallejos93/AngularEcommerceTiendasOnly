let Product = require("../models/product");
let fs = require("fs");
let path = require("path");
let moment = require("moment");

const registrarProduct = (req, res) => {
    //obtenemos los datos del json
    let params = req.body;
    //creamos nueva instacia de categoria
    let product = new Product();

    if (params.name &&
        params.description &&
        params.cost &&
        params.price &&
        params.color &&
        params.idcategory &&
        params.type &&
        params.stock
        
    ) {
        let imagePath = req.files.image.path;
        let nameImg = moment().unix();
        let rutaServer = "./uploads/imgproduct/" + nameImg + path.extname(imagePath);
        fs.createReadStream(imagePath).pipe(fs.createWriteStream(rutaServer));
        let dbImg = nameImg + path.extname(imagePath).toLowerCase();
    
        product.name = params.name;
        product.description = params.description;
        product.image = dbImg;
        product.cost = params.cost;
        product.price = params.price;
        product.color = params.color;
        product.idcategory = params.idcategory;
        product.type = params.type;
        product.stock = params.stock;
        
        product.save((err, dataProduct) => {
            //si llega un error desde el servidor de mongo
            if (err) {//porque solo es true
                res.status(500).send({mensaje: "error al conectar al servidor"});
            } else {
                if (dataProduct) {
                    res.status(200).send({product: dataProduct});
                } else {
                    res.status(401).send({mensaje: "no se puedo registrar la producto"})
                }
            }
        });
        
    } else {
        res.status(401).send({mensaje: "faltan algunos de los datos"})
    }
};
    

    
    




  
  const obtenerProduct = (req, res) => {
    //obtenemos el id de la categoria
    let id = req.params["id"];
    //buscamos la categoria por el id
    Product.findById({_id:id}, (err, dataProduct) => {
        //si hay error al conectar momgo
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (dataProduct) {
            res.status(200).send({product: dataProduct});
           } else {
            res.status(401).send({mensaje: "el producto no existe"});
           } 
        }
    });
};

const listaProduct = (req, res) => {
    //si tenemos filtro nombre lo guardamos
    let name = req.params["name"];
      //let params = req.body;

    //busqueda de las categorias
    Product.find({name : new RegExp(name, "i")},(err, dataProduct) => {
        //si hay error al conectar mongo
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (dataProduct) {
            res.status(200).send({product: dataProduct});
           } else {
            res.status(401).send({mensaje: "No hay productos"});
           } 
        }
    });
};

const editarProduct = (req, res) => {
  console.log(req.body);
    let params = req.body;
    let id = req.params["id"];
    let img = req.params["img"];

    if (
        params.name &&
        params.description &&
        params.cost &&
        params.price &&
        params.color &&
        params.idcategory &&
        params.type &&
        params.stock
        
      ) {
         
        // Ruta donde quedara la imagen en el proyecto
        let imagePath = req.files.image.path;
        // Generamos un codigo para las imagenes
        let nameImg = moment().unix();
        // creamos variable de la nueva ruta
        var rutaServer =
          "./uploads/imgproduct/" + nameImg + path.extname(imagePath);
        
        fs.createReadStream(imagePath).pipe(fs.createWriteStream(rutaServer));
        
        let bdImg = nameImg + path.extname(imagePath);
        console.log(params);
        console.log(bdImg);
        Product.findByIdAndUpdate(
          { _id: id },
          {
            name: params.name,
            description: params.description,
            image: bdImg,
            cost: params.cost,
            price: params.price,
            color: params.color,
            idcategory: params.idcategory,
            type: params.type,
            stock:params.stock,
          },
          (err, dataProduct) => {
            console.log(dataProduct)
            if (err) {
              res.status(500).send({ message: "Error en el servidor" });
            } else {
              if (dataProduct) {
                res.status(200).send({ product: dataProduct });
              } else {
                res.status(403).send({ message: "No se edito el producto" });
              }
            }
          }
        );
      } else {
        res.status(401).send({ mensaje: "Falto alguno de los campos" });
      }
    };

    






const eliminarProduct = (req, res) => {
    //obtener el id de la categoria
    let id = req.params["id"];
    //eliminamos la categoria por el id
    Product.findByIdAndDelete({ _id: id },  (err, dataProduct) => {
        if (err) {
            res.status(500).send({mensaje: "error al conectar al servidor"});
        } else {
           if (dataProduct) {
            fs.unlink("./uploads/imgproduct/" + dataProduct.image, (err) => {
                if (err) throw err;
              });   
            res.status(200).send({product: dataProduct});
           } else {
            res.status(401).send({mensaje: "el producto no se pudo eliminar"});
           } 
        }
    });
};




const obtenerImage = (req, res) => {
  //Obtenemos la imagen
  let img = req.params["img"];
  // Validamos que sea diferente de null
  if (img != "null") {
    // La buscamos en la ruta
    let pathImg = "./uploads/imgproduct/" + img;
    res.status(200).sendFile(path.resolve(pathImg));
  } else {
    // agregamos cualquier imagen defauld en caso tal de no encontrar la imagen real
    let pathImg = "./uploads/imgproduct/default.png";
    res.status(200).sendFile(path.resolve(pathImg));
  }
};



  module.exports = {
    registrarProduct,
    obtenerProduct,
    listaProduct,
    editarProduct,
    eliminarProduct,
    obtenerImage
  }
