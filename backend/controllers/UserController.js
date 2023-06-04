const { json } = require("express");
const User = require("../models/UserModel");

// AÑADIR FAVORITAS Y PENDIENTES
module.exports.aniadirFavoritas = async (req, res) => {
  try {
    const { email, data } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, favoritas: [data] });
      return res.json({ message: "Añadido satisfactoriamente" });
    }

    const esFavorita = user.favoritas.some(({ id }) => id === data.id);

    if (esFavorita) {
      return res.json({ err: "Ya se añadió" });
    }

    user.favoritas.push(data);
    await user.save();

    return res.json({ message: "Añadido satisfactoriamente" });
  } catch (error) {
    return res.json({ err: "Ha habido un error al añadir" });
  }
};

module.exports.aniadirPendientes = async (req, res) => {
    try {
      const { email, data } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ email, pendientes: [data] });
        return res.json({ message: "Añadido satisfactoriamente" });
      }

      const esPendiente = user.pendientes.some(({ id }) => id === data.id);

      if (esPendiente) {
        return res.json({ err: "Ya se añadió" });
      }

      user.pendientes.push(data);
      await user.save();

      return res.json({ message: "Añadido satisfactoriamente" });
    } catch (error) {
      return res.json({ err: "Ha habido un error al añadir" });
    }
  };

//GET FAVORITAS Y PENDIENTES
module.exports.getFavoritas=async(req, res) => {
    try {
        const {email} =req.params
        const user =await User.findOne({email})
        if(user) {
            res.json ({msg:"Ok, bien!", movies: user.favoritas})
        } else {
            return res.json({msg: "Usuario no encontrado"})
        }

    } catch (err) {
        return res.json({msg: "Error"})
    }
}

module.exports.getPendientes=async(req, res) => {
  try {
      const {email} =req.params
      const user =await User.findOne({email})
      if(user) {
          res.json ({msg:"Ok, bien!", movies: user.pendientes})
      } else {
          return res.json({msg: "Usuario no encontrado"})
      }

  } catch (err) {
      return res.json({msg: "Error"})
  }
}

// ELIMINAR FAVORITA Y PENDIENTE
async function eliminarFavorita (req, res) {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.favoritas;
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);
      if (movieIndex === -1) {
        return res.status(400).json({ msg: 'Peli no encontrada' });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(user._id, { favoritas: movies }, { new: true });
      return res.json({ msg: 'Eliminada con exito', movies });
    } else {
      return res.json({ msg: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ msg: 'Error al eliminar de la lista' });
  }
}

module.exports.eliminarFavorita = eliminarFavorita;



async function eliminarPendiente(req, res) {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
      const movies = user.pendientes;
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);
      if (movieIndex === -1) {
        return res.status(400).json({ msg: 'Peli no encontrada' });
      }
      movies.splice(movieIndex, 1);
      user.pendientes = movies;
      await user.save();
      return res.json({ msg: 'Eliminada con éxito', movies });
    } else {
      return res.json({ msg: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ msg: 'Error al eliminar de la lista' });
  }
}

module.exports.eliminarPendiente = eliminarPendiente;



//CAMBIAR NOMBRE Y AVATAR
// FUNCIONA!!
module.exports.changeUserName = async (req, res) => {
  const { email } = req.params;
  const { newUserName } = req.body; // Cambiar req.params.newUserName por req.body.newUserName

  try {
    // Verificar si el usuario existe en la base de datos
    const existingUser = await User.findOne({ email });

    console.log("existingUser:", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    } else {
      console.log("usuario encontrado");
      // Actualizar el UserName del usuario
      existingUser.username = newUserName;
      await existingUser.save();

      res.status(200).json({ message: "El nombre de usuario se ha actualizado correctamente.", user: existingUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar el nombre de usuario.", error });
  }
};



module.exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario por correo electrónico.", error });
  }
};



module.exports.changeProfileImage = async (req, res) => {
  const { email, newProfileImage } = req.body;

  try {
    // Actualizar el profile_img del usuario
    const user = await User.findOneAndUpdate(
      { email },
      { profile_img: newProfileImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({
      message: "La imagen de perfil se ha actualizado correctamente.",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al cambiar la imagen de perfil.",
      error
    });
  }
};


