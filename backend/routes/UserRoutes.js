const { aniadirFavoritas, aniadirPendientes, getFavoritas, eliminarFavoritas, aniadirComentario, eliminarComentario, eliminarFav } = require("../controllers/UserController")

const router=require("express").Router()

router.post("/aniadirFav", aniadirFavoritas)
router.post("/aniadirPendientes", aniadirPendientes)
router.get("/favoritas/:email", getFavoritas)
router.put("/eliminarFav", eliminarFavoritas)
router.post("/aniadirComentario", aniadirComentario)
router.put("/deleteComentarios", eliminarComentario)

module.exports=router