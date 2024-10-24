import jwt from 'jsonwebtoken'

const generateToken = (userId,res)=>{
    const Token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:'15d'
    })
    res.cookie("jwt",Token,{
        maxAge : 15 * 24 * 60 * 60 * 1000,//In MILLI-SECONDS
        httpOnly : true,//prevent XSS attacks cross-site scripting attacks
        sameSite : 'strict',//CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !== "developement"
    })
}
export default generateToken