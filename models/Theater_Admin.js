const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const UserSchema=new mongoose.Schema({

    email:{
        type:String,
        required:[true,"provide an email"],
        unique:true,
        match:[
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ]
    },
    password:{
        type:String,
        required:[true,"provide a password"],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next();
    } 
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire=Date.now()+10*60*1000
    return resetToken
}

const User=mongoose.model('User',UserSchema)

module.exports=User