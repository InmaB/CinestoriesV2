const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes=require("./routes/UserRoutes")
const app = express();

// Habilita CORS (permite solicitudes de cualquier dominio)
app.use(cors());
app.use(express.json());


// Conexión a la bbdd
mongoose.connect("mongodb://localhost:27017/cinestories", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB conectada");
});


// Rutas de usuario
app.use("/api/user", userRoutes)


// Iniciar servidor
app.listen(5000, () => {
  console.log("Servidor habilitado en el puerto 5000");
});
