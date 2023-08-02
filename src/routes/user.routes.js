const { Router } = require("express");
const { createUser, loginUser, allUsers} = require("../controllers/users.controller");
const {
  loginUserValidator,
  registerUserValidator,
} = require("../validators/users.validators");
const authenticate = require("../middlewares/auth.middleware");

// primero importen lo nativo node
// de librerias express, express-validator

// importo mis archivos, modulos

const router = Router();

// ? que campos debo validar
// ? que deberia validar por cada campo

router.post("/users", registerUserValidator, createUser); //

router.post("/login", loginUserValidator, loginUser);

router.get("/users", authenticate, allUsers);

// proteger este endpoint - ruta
router.get("/users", authenticate, (req, res) => {
  console.log(req);
  res.send("users");
});

module.exports = router;

// "1234" -> bcryp() -> 04c56e389764dfg43034kgl67435 (hash)

// //! 04c56e389764dfg43034kgl67435 --> dehash() --> "1234"

// para que no sea reversible
// podemos hashear un texto
// pero no podemos deshashearlo

// * Existen tablas que tienen las palabras que originan un hash

// Para evitar esto usamos algo llamado salt
// Son digitos aleatorios que se agreagan con la contraseña
// puede ser al principio o puede ser al final
// para que no sea reversible

// "root" + "salt"
// 1238462183476root
// root230986452183746

// 2 round

// 04c56e389764dfg43034kgl67435 --> hashear
