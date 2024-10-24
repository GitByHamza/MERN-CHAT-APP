import jwt from 'jsonwebtoken'
import User from '../models/user.Model.js'

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Found"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({error:"Token Invalid"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({error:"User Not Found"})
        }

        req.user = user

        next() //it will proceded to next function in the route call
    } catch (error) {
        res.status(500).json({error:"Error in Protect Route"})
    }
}

export default protectRoute