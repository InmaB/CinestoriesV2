// const User =require ("../models/UserModel")

// module.exports.aniadirFavoritas=async (req, res) =>{
//     try {
// const {email,data}=req.body;
// const user=await User.findOne({email})
// if(user) {
//     const {favoritas} =user;
//     const esFavorita=favoritas.find(({id})=> (id ===data.id))
//     if(!esFavorita) {
//         await User.findByIdAndUpdate(user._id, {
//             favoritas: [...favoritas, data],
//           },
//           { new: true })


//     }else return res.json({err:"Ya se añadió"})
// } else await User.create ({email, favoritas:[data]});
// return res.json ({err:"Añadido satisfactoriamente"})

//     }catch(error) {
// return res.json({err:"Ha habido un error para añadir"})
//     }
// }

const { json } = require("express");
const User = require("../models/UserModel");

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


// module.exports.aniadirPendientes=async (req, res) =>{
//     try {
// const {email,data}=req.body;
// const user=await User.findOne({email})
// if(user) {
//     const {pendientes} =user;
//     const esPendiente=pendientes.find(({id})=> (id ===data.id))
//     if(!esPendiente) {
//         await User.findByIdAndUpdate (user._id, {
//             pendientes: [...pendientes, data],
//         },
//         {new:true})
//     }else return res.json({err:"Ya se añadió"})
// } else await User.create ({email, pendientes:[data]});
// return res.json ({err:"Añadido satisfactoriamente"})

//     }catch(error) {
// return res.json({err:"Ha habido un error para añadir"})
//     }
// }

module.exports.getFavoritas=async(req, res) => {
    try {
        const {email} =req.params
        const user =await User.findOne({email})
        if(user) {
            res.json ({msg:"success", movies: user.favoritas})
        } else {
            return res.json({msg: "User with given email not found"})
        }

    } catch (err) {
        return res.json({msg: "Eror fetching movie"})
    }
}

module.exports.eliminarFavoritas=async(req,res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const {favoritas}=user
            const movieIndex=favoritas.findIndex(({ id }) => id === movieId)

        }

        if(!movieIndex) res.status(400).send({msg:"movie not found"})
        favoritas.splice(movieIndex,1)

        await User.findByIdAndUpdate(
            user._id,
            {
                favoritas
            },
            {new:true}
        )
        return res.json({msg:"pelicula borrada", movies:favoritas})

    } catch (err) {
return res.json({msg:"error eliminando pelicula"})
    }
}

///COMENTARIOS
module.exports.aniadirComentario = async (req, res) => {
  try {
    const { email, comentario } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ err: "Usuario no encontrado" });
    }

    user.comentarios.push(comentario);
    await user.save();

    return res.json({ message: "Comentario añadido satisfactoriamente" });
  } catch (error) {
    return res.json({ err: "Ha habido un error al añadir el comentario" });
  }
};

module.exports.eliminarComentario = async (req, res) => {
  try {
    const { email, comentarioId } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ err: "Usuario no encontrado" });
    }

    const { comentarios } = user;
    const comentarioIndex = comentarios.findIndex(({ id }) => id === comentarioId);

    if (comentarioIndex === -1) {
      return res.status(400).send({ err: "Comentario no encontrado" });
    }

    comentarios.splice(comentarioIndex, 1);
    await user.save();

    return res.json({ message: "Comentario eliminado satisfactoriamente" });
  } catch (error) {
    return res.json({ err: "Ha habido un error al eliminar el comentario" });
  }
};
