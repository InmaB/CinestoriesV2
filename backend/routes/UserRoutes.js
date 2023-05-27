const { aniadirFavoritas, aniadirPendientes, getFavoritas, aniadirComentario, eliminarComentario, eliminarFavoritas, removeFromLikedMovies } = require("../controllers/UserController")

const router=require("express").Router()

router.post("/aniadirFav", aniadirFavoritas)
router.post("/aniadirPendientes", aniadirPendientes)
router.get("/favoritas/:email", getFavoritas)
router.put("/eliminarFav", eliminarFavoritas)
router.post("/aniadirComentario", aniadirComentario)
router.put("/deleteComentarios", eliminarComentario)
router.delete("/remove", removeFromLikedMovies)

module.exports=router