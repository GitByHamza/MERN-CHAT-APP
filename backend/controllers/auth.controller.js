import User from '../models/user.Model.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

export const login = async (req,res)=>{
    try {
        const { username,password } = req.body

        const isUser = await User.findOne({username})
        const isPass = await bcrypt.compare(password,isUser?.password || "")

        if(!isUser){
            return res.status(400).json({error:"User not found! Please Sign up first"})
        }else if(!isPass){
            return res.status(400).json({error:"Password incorrect"})

        }
        generateToken(isUser._id,res)

        res.status(201).json({
            _id:isUser._id,
            fullname : isUser.fullname,
            username : isUser.username,
            profilePic : isUser.profilePic,
        })

        
    } catch (error) {
        
    }
}
export const signUp = async (req,res)=>{
    try {
        const { fullname,username,password,confirmPassword,gender } = req.body

        if(password !== confirmPassword){
            return res.status(400).json({error:"PASSWORDS DON'T MATCH"})
        }

        const user = await User.findOne({username})

        if(user){
            res.status(400).json({error:"USER ALREADY EXIST"})
        }

        const boy_PP = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girl_PP = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password,salt) 
        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male' ? boy_PP : girl_PP
        })
        
        if(newUser){
            await newUser.save()    
            generateToken(newUser._id,res)
            res.status(201).json({
                _id:newUser._id,
                fullname : newUser.fullname,
                username : newUser.username,
                profilePic : newUser.profilePic,
            })
        }else{
            return res.status(401).json({error:"Error in adding a new user"})
        }
    } catch (error) {
        console.log("ERROR INN ADDING USER",error.message);
        
        res.status(500).json("ERROR INN ADDING USER : ",error.message)
    }
}

export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{ maxAge : 0 })
        res.status(200).json({message : "Logged out Successfully"})
    } catch (error) {
        console.log("ERROR LOGGING OUT",error.message);
        
        res.status(500).json("ERROR LOGGING OUT : ",error.message)
    }
}