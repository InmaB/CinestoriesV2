const mongoose=require ("mongoose")

const userScheme = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true,
        max:50
    },

    favoritas: Array,
    pendientes:Array,
    comentarios:Array,

});

module.exports =mongoose.model("users", userScheme)