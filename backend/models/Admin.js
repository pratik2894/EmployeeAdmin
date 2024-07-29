import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please enter name"]
    },
    email:{
        type:String,
        require:[true,"Please Enter email"]
    },
    Password:{
        type:String,
        require:[true, "Please Enter password"]
    },
    Image:{
        type:String,
    }

})

// Schema method for creatng the token 

AdminSchema.methods.CreateToken =  function()
{
    const generatingToken =  jwt.sign({id:this._id}, process.env.SECRETE , {
        expiresIn:process.env.EXPIRES_IN 
    })
    return generatingToken;
}

const Admin  = mongoose.model('Admin' , AdminSchema);
export default Admin

