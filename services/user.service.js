const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendEmail } = require('../email/user.email');

module.exports.signUp = async (req,res)=>{
    
     const {name,email,password,age} =req.body;
     const user =await userModel.findOne({email});
     if(user){
        res.json({message:'email already exists'});
     }else {
        bcrypt.hash(password, 4, async (err, hash)=>{
            await userModel.insertMany({name,email,password:hash,age});
            let token = jwt.sign({email},'verifyEmail');
            sendEmail({email,token,message:'hello '});
        res.json({message:'success'});
        });
       
     }
}
module.exports.signIn = async ( req,res)=>{
    const {email,password} = req.body;
    let user =await userModel.findOne({email});
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            let token = jwt.sign({userId:user._id,name:user.name,emailConfirm:user.emailConfirm},
                'knowledge@@123NodeSaraha');

                if(user.emailConfirm==true){
                    
                    res.json({message:'login',token});
                }else{
                    res.json({message:'verify your email'});
                }
        }else {
            res.json({message:'password incorrect'});
        }
    }
    else{

        res.json({message:"Account doesn't exists"});
    }
}

module.exports.emailVerify = async (req,res)=>{
    const {token} = req.params;
    jwt.verify(token,'verifyEmail',async (err,decoded)=>{

        if(err){res.json(err);}
        else{
            let user = await userModel.findOne({email:decoded.email});
            if(user){
                await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm:true});
                res.json({message:'done verify your email'});
            }else{
                res.json({message:'user not found'});
            }
        }
    })
  

}