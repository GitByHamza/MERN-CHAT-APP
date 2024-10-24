import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,);
        console.log("MONGO DB CONNECTED");
    } catch (error) {
        console.log("ERROR CONNECTING TO MONGO DB: ", error.message);
    }
};

export default connect;
