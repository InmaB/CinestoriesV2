const {   getFavoritas,  eliminarFavorita, changeProfileImage,
    getPendientes, getUserByEmail, changeUserName,
    eliminarPendiente,
    crearUsuario,
    aniadirFavorita,
    aniadirPendiente,
     } = require("../controllers/UserController")

const router=require("express").Router()

router.post("/aniadirFav", aniadirFavorita)
router.post("/aniadirPendientes", aniadirPendiente)
router.get("/favoritas/:email", getFavoritas)
router.get("/pendientes/:email", getPendientes)
router.delete("/eliminarFav", eliminarFavorita)
router.delete("/eliminarPendiente", eliminarPendiente)
router.put("/changeUserName/:email", changeUserName);
router.put("/changeProfileImage/:email", changeProfileImage);
router.get("/getUserByEmail/:email", getUserByEmail);
router.post('/crearUsuario', crearUsuario);

module.exports=router