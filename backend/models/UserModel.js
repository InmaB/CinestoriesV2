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
      default: [0], // lo inicializo en la posición 0
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

