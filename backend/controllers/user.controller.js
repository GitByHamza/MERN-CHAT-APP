import User from "../models/user.Model.js"


export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id

        const allUsers = await User.find().select("-password")

        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({error:"INTERNAL SERVER ERROR IN getUsersForSidebar"})
    }
}