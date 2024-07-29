
// Sending Token in cookies that the we can easily Cheack that we can ensure that the only admin can access this perticular Routes


const sendToken = (admin ,  statusCode , res , message)=>{

    const token = admin.CreateToken();

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure:true,
        samesite:"none"
    }

    res.status(statusCode).cookie('AdminToken' , token , options).json({
        success:true,
        message:`Admin ${message} successfully`,
        admin,
        token
    })
}

export default sendToken;