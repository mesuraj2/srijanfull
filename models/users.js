const mongoose =require('mongoose')

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean,
        default:false
    },
    pic:{
        type:String,
        default:"https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
    }
},{
    timestamps:true
})


module.exports=mongoose.model('user',UserSchema);

