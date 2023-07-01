const mongoose =require('mongoose')

const UserVerification=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      otp:{
        type:Number
      }
},{
    timestamps:true
})

UserVerification.index({createdAt: 1},{expireAfterSeconds: 300});

module.exports=mongoose.model('userVerifications',UserVerification);

