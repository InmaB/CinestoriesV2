const { aniadirFavoritas, aniadirPendientes, getFavoritas,  eliminarFavorita, changeProfileImage,
    getPendientes, getUserByEmail, changeUserName,
    eliminarPendiente,
    crearUsuario} = require("../controllers/UserController")

const router=require("express").Router()

router.post("/aniadirFav", aniadirFavoritas)
router.post("/aniadirPendientes", aniadirPendientes)
router.get("/favoritas/:email", getFavoritas)
router.get("/pendientes/:email", getPendientes)
router.delete("/eliminarFav", eliminarFavorita)
router.delete("/eliminarPendiente", eliminarPendiente)
router.put("/changeUserName/:email", changeUserName);
router.put("/changeProfileImage/:email", changeProfileImage);
router.get("/getUserByEmail/:email", getUserByEmail);
router.post('/crearUsuario', crearUsuario);

module.exports=router