
const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Quotes=require('./dbrelated//quotes.js');
const cookieParser=require('cookie-parser');
const authenticate=require('./middleware//authenticate.js');
const {body,validationResult}=require('express-validator');

const app=express();
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("welcome to quotes database");
})
app.post('/',(req,res)=>{
    const user=req.body;
    const token=jwt.sign(user,'77777');
    res.cookie('jwt',token,{maxAge:3600000,httpOnly:true});
    res.json({message:"loggedin"});
})

app.get('/quotes',authenticateToken,async(req,res)=>{
    const data= await Quotes.find({});
    res.json(data);
    
})
app.post('/Write',rules(),validate,async(req,res)=>{
    console.log(req.body);
     const quote=await Quotes.create(req.body);
     res.send("quote added");

})
app.delete('/RemoveQuote',async(req,res)=>{
    const deleted=await Quotes.deleteOne(req.body);
    res.send("quote removed!");
})
mongoose.connect('mongodb+srv://admin:root@cluster0.kwlzyeo.mongodb.net/qUotes?retryWrites=true&w=majority&appName=Cluster0')
.then(
app.listen(3002,()=>{
    console.log("listening at 3002");
}));
function authenticateToken(req,res,next){
    const token=req.cookies.jwt;
    if(!token){
        return res.status(403).send("Invalid Token");
        }
    jwt.verify(token,'77777',(err,data)=>{

      if(err){
        return res.status(403).send("Invalid Token");
      }
      
        req.username=data;
        next();
    })

}
function rules(){
    return [
        body('quote').isString().withMessage('Quote should be string')
        
    ];
 
}
function validate(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
