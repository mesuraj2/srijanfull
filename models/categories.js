const mongoose =require('mongoose')

const CategoriesSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:'https://i.imgur.com/Aj4fGtv.png'
    },
    description:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

module.exports=mongoose.model('categories',CategoriesSchema);