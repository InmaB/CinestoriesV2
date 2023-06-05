// const mongoose=require ("mongoose")

// const userScheme = new mongoose.Schema({
//     email: {
//         type:String,
//         required:true,
//         unique:true,
//         max:50
//     },

//     favoritas: Array,
//     pendientes:Array,
//     comentarios:Array,

// });

// module.exports =mongoose.model("users", userScheme)


const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },

  username: {
    type: String,
    required: true,
    unique: true,
    max: 20,
    default: "Usuario"
  },

  profile_img: {
    profile_img: {
      type: [String],
      default: [0], // Puedes establecer un valor predeterminado si es necesario
    },
  },

  favoritas: {
    type: Array,
    default: []
  },

  pendientes: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("users", userScheme);

