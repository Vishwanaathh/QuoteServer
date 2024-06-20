const mongoose=require('mongoose');
const schema= new mongoose.Schema({
    quote:{
        type:String
    }
});
const Quotes=mongoose.model('Quote',schema);
module.exports=Quotes;