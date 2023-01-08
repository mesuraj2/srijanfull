const jwt = require('jsonwebtoken');

const SECRET_KEY="Suraj_kumar"

const fetchuser = (req,res,next)=>{

    const token=req.header('auth-token');
    if(!token){
        res.send({error:'please authenticate first'})
    }

    try {
    const data =jwt.verify(token,SECRET_KEY);
    // console.log(data.user)
    req.user=data.user;

    next();
} catch (error) {
    res.send({error:'please authenticate first'})
}
}
module.exports=fetchuser;