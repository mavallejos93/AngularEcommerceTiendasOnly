// Import variable from models subido
let User = require("../models/user");
// Declare variable to import ecnrypted password lib
let bcrypt = require("bcrypt-nodejs");
// Import JWT
let jwt = require("../libs/jwt");

// Function to register a user
const registerUser = (req, res) => {
  // Pull the parameters from the json Body (incoming API)
  let params = req.body;
  // Use the user model (but must be clean)
  let user = new User();
  // validate password in order to ecnrypt
  if (
    params.names &&
    params.lastName &&
    params.age &&
    params.email &&
    params.pass &&
    params.role &&
    params.address &&
    params.phoneNumber
  ) {
    // Use the bcrypt in order to encrypt the password
    bcrypt.hash(params.pass, null, null, function (err, hash) {
      // If it encrypts the Hash worked
      if (hash) {
        user.names = params.names;
        user.lastName = params.lastName;
        user.age = params.age;
        user.email = params.email;
        user.pass = hash;
        user.role = params.role;
        user.address = params.address;
        user.phoneNumber = params.phoneNumber;
        // Send the model to register with Mongo
        user.save((err, savedUser) => {
          if (err) {
            //if there is an error
            res.status(500).send({ err: "The User was not registered" });
          } else {
            res.status(200).send({ user: savedUser });
          }
        });
      } else {
        // Give response to the incoming ecrypt error if it happens
        res
          .status(400)
          .send({ err: "Could not encrypt password, Did not register user" });
      }
    });
  } else {
    // Validate the incoming json data
    res.status(405).send({ err: "Field are missing!" });
  }
};

// Login
const login = (req, res) => {
  // Incoming parameter variable
  let params = req.body;
  // Search for User in DB

  User.findOne({ email: params.email }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Server Error" });
    } else {
      if (userData) {
        bcrypt.compare(params.pass, userData.pass, (err, confirm) => {
          if (confirm) {
            if (params.getToken) {
              res.status(200).send({
                jwt: jwt.createToken(userData),
                user: userData,
              });
            } else {
              res.status(200).send({ User: userData, message: "No Token" });
            }
          } else {
            res
              .status(401)
              .send({ message: "Email or Password incorrect" });
          }
        });
      } else {
        res.status(401).send({ message: "Email or Password incorrect" });
      }
    }
  });
};

const listUser = (req, res) => {
  // Cargamos todos los datos de la coleccion usuario
  User.find((err, userData) => {
    if (userData) {
      res.status(200).send({ user: userData });
    }
  });
};

const getUser = (req, res) => {
  // id del usuario
  let id = req.params["id"];
  // Buscamos usuario
  User.findById(id, (err, userData) => {
    if (userData) {
      res.status(200).send({ user: userData });
    } else {
      res.status(403).send({ message: "No se encontro ningun registro" });
    }
  });
};

const editUser = (req, res) => {
  // Obtener id del usuario enviado en request
  let id = req.params["id"];
  // Obtenemos todos los parametos
  let params = req.body;
  // Buscamos el Usuario para editarlo
  if (params.pass) {
    bcrypt.hash(params.pass, null, null, (err, hash) => {
      if (hash) {
        User.findByIdAndUpdate(
          id,
          {
            names: params.names,
            lastName: params.lastName,
            age: params.age,
            email: params.email,
            pass: hash,
            role: params.role,
            address: params.address,
            phoneNumber: params.phoneNumber,
          },
          (err, userData) => {
            if (userData) {
              res.status(200).send({ User: userData });
            } else {
              res.status(501).send({ message: "El usuario no se pudo editar" });
            }
          }
        );
      }
    });
  } else {
    {
      User.findByIdAndUpdate(
        id,
        {
          names: params.names,
          lastName: params.lastName,
          age: params.age,
          email: params.email,
          role: params.role,
          address: params.address,
          phoneNumber: params.phoneNumber,
        },
        (err, userData) => {
          if (userData) {
            res.status(200).send({ User: userData });
          } else {
            res.status(501).send({ message: "El usuario no se pudo editar" });
          }
        }
      );
    }
  }
};

const deleteUser = (req, res) => {
  // obtener el id del usuario
  let id = req.params["id"];
  // Eliminamos el usuario por el ID
  User.findByIdAndDelete({ _id: id }, (err, userData) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (userData) {
        res.status(200).send({ Usuario: userData });
      } else {
        res.status(401).send({ mensaje: "El usuario no se pudo eliminar" });
      }
    }
  });
};

// Export module
module.exports = {
  registerUser,
  login,
  listUser,
  getUser,
  editUser,
  deleteUser,
};
