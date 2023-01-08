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
