const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes=require("./routes/UserRoutes")
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cinestories", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB conectada");
});

app.use("/api/user", userRoutes)

app.listen(5000, () => {
  console.log("Servidor habilitado en el puerto 5000");
});
