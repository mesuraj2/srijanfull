const express =require('express');
const fetchuser = require('./fetchuser');
const router =express.Router()
const Note =require('./models/chat')

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    const notes=await Note.find({user:req.user.id})
    res.json(notes);
})

router.post('/addnote',fetchuser, async (req,res)=>{
    const {title,desc}=req.body;
    const note=new Note({
        title,desc,user:req.user.id
    })
    const savenote=await note.save();
    res.send(savenote);
})


// router.get('/:id',(req,res)=>{
//     res.send(req.params.id);
// })

module.exports=router