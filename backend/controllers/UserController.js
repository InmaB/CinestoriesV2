const { json } = require("express");
const User = require("../models/UserModel");

// CREAR USUARIO
// Crear un usuario en MongoDB
module.exports.crearUsuario = async (req, res) => {
  const { email, password} = req.body;

  try {
    // Crear el usuario con email y password
    const user = new User({ email, password });
    await user.save();
    res.status(200).json({ message: "Usuario creado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario.", error });
  }
};

// AÑADIR A LISTAS DE FAVORTIAS Y PENDIENTES
// Añadir a lista favorita
async function aniadirFavorita(req, res) {
  try {
    const { email, data } = req.body;
    // Se encuentra el usuario por email
    let user = await User.findOne({ email });

    if (!user) {
      // Si el usuario no existe, se crea un nuevo usuario con el email y se agrega la película como favorita
      user = await User.create({ email, favoritas: [data] });
      return res.json({ message: "Añadido satisfactoriamente" });
    }

    // Se verifica si la película se encuentra en favoritas
    const esFavorita = user.favoritas.some((movie) => movie.id === data.id);

    if (esFavorita) {
      // Si la película ya está en la lista, devuelve un mensaje
      return res.json({ err: "Ya se añadió" });
    }

    // Si la película no está en la lista, se agrega a la lista de favoritas del usuario
    user.favoritas.push(data);
    await User.findByIdAndUpdate(user._id, { favoritas: user.favoritas }, { new: true });

    return res.json({ message: "Añadido satisfactoriamente", favoritas: user.favoritas });
  } catch (error) {
    console.error(error);
    return res.json({ err: "Ha habido un error al añadir" });
  }
}

// Se exporta la función aniadirFavorita como controlador llamado aniadirFavorita
module.exports.aniadirFavorita = aniadirFavorita;


// Añadir a lista pendientes
async function aniadirPendiente(req, res) {
  try {
    const { email, data } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, pendientes: [data] });
      return res.json({ message: "Añadido satisfactoriamente" });
    }

    const esPendiente = user.pendientes.some((movie) => movie.id === data.id);

    if (esPendiente) {
      return res.json({ err: "Ya se añadió" });
    }

    user.pendientes.push(data);
    await User.findByIdAndUpdate(user._id, { pendientes: user.pendientes }, { new: true });

    return res.json({ message: "Añadido satisfactoriamente", pendientes: user.pendientes });
  } catch (error) {
    console.error(error);
    return res.json({ err: "Ha habido un error al añadir" });
  }
}

module.exports.aniadirPendiente = aniadirPendiente;


//GET FAVORITAS Y PENDIENTES
// Get Lista Favoritas
module.exports.getFavoritas=async(req, res) => {
    try {
        const {email} =req.params
        // Se busca al usuario por el email
        const user =await User.findOne({email})
        if(user) {
          // Si se encuentra devuelve la lista de favoritas
            res.json ({msg:"Ok, bien!", movies: user.favoritas})
        } else {
            return res.json({msg: "Usuario no encontrado"})
        }
    } catch (err) {
        return res.json({msg: "Error"})
    }
}


// Get Lista Pendientes
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
// ELiminar de la lista de Favoritas
async function eliminarFavorita (req, res) {
  try {
    const { email, movieId } = req.body;
    // Se busca al usuario por el email
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.favoritas;
      // Se busca el índice de la película en la lista de favoritas del usuario
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);
      // Si no está
      if (movieIndex === -1) {
        return res.status(400).json({ msg: 'Peli no encontrada' });
      }
      // Se elimina la película
      movies.splice(movieIndex, 1);
      // Se actualiza
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


// ELiminar de la lista de Pendientes
async function eliminarPendiente(req, res) {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const movies = user.pendientes;
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);
      if (movieIndex === -1) {
        return res.status(400).json({ msg: 'Peli no encontrada' });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(user._id, { pendientes: movies }, { new: true });
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


// CAMBIAR USERNAME
module.exports.changeUserName = async (req, res) => {
  const { email } = req.params;
  const { newUserName } = req.body; // Cambiar req.params.newUserName por req.body.newUserName

  try {
    // Comprueba si el usuario existe en la base de datos
    const existingUser = await User.findOne({ email });

    console.log("existingUser:", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    } else {
      console.log("usuario encontrado");
      // Actualiza el UserName del usuario
      existingUser.username = newUserName;
      await existingUser.save();

      res.status(200).json({ message: "El nombre de usuario se ha actualizado correctamente.", user: existingUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar el nombre de usuario.", error });
  }
};


// GET EL NOMBRE DE USUARIO POR EL EMAIL
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


// CAMBIAR EL AVATAR
module.exports.changeProfileImage = async (req, res) => {
  const { email } = req.params;
  const { newProfileImage } = req.body;

  try {
    // Actualiza el profile_img del usuario
    // { new: true } devuelve el usuario actualizado después de la actualización
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






