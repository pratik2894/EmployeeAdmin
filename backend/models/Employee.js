import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'
const  EmployeeSchema = mongoose.Schema({

    first:{
        type:String,
        require:[true , "Please Enter the name of employee"]
    },
    last:{
        type:String,
        require:[true , "Please Enter the last name"]
    },
    email:{
        type:String,
        require:[true , "Please Enter the email "]
    },
    mobile:{
        type:Number,
        require:[true , "Please Enter the mobile number"]
    },
    Designation:{
        type:String,
        require:[true , "Please Enter the Designation"]
    },
    gender:{
        type:"String",
        require:true
    },
    course:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        default:"https://thumbs.dreamstime.com/z/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg?ct=jpeg"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

EmployeeSchema.plugin(paginate);

const Employee = mongoose.model('Employee' , EmployeeSchema);
export default Employee;