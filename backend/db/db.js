
// creating the function for connecting the database
import mongoose from "mongoose"

const Database = async() =>{
    mongoose.connect(process.env.DB_URI).then( (data)=>{
        console.log(`database Connected successfully ! ${data.connection.host}`)
    } )
}

export default Database;