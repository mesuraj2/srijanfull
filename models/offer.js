const mongoose=require('mongoose')



const Offerschema=mongoose.Schema({
    offername:{
        type:String,
        required:true
    },
    Category:{
      type:String,
      required:true
    },
    pic:{
      type:String,
      default:"https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
  },
    Desc:{
      type:String,
      required:true
    },
    chat_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    Location: {
        type: {
          type: String
        },
        coordinates: [Number] 
      }
},{timestamps:true})
Offerschema.index({Location: '2dsphere' });


module.exports=mongoose.model('offer',Offerschema);
