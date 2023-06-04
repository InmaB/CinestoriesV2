const { aniadirFavoritas, aniadirPendientes, getFavoritas,  eliminarFavorita, changeUserName, changeProfileImage,
    getUserByEmail,
    getPendientes,
    eliminarPendiente} = require("../controllers/UserController")

const router=require("express").Router()


router.post("/aniadirFav", aniadirFavoritas)
router.post("/aniadirPendientes", aniadirPendientes)
router.get("/favoritas/:email", getFavoritas)
router.get("/pendientes/:email", getPendientes)
router.delete("/eliminarFav", eliminarFavorita)
router.delete("/eliminarPendiente", eliminarPendiente)


router.put("/changeUserName/:email", changeUserName);

router.get("/getUserByEmail/:email", getUserByEmail);


// Ruta para cambiar el profile_img
router.put("/changeProfileImage/:email", changeProfileImage);

module.exports=router