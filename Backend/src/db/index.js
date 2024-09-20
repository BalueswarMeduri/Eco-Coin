import mongoose from "mongoose";

export const CONNECTDB = async() => {
    try {
        const connectionInstance = await  mongoose.connect(process.env.MONGO_URI);
        console.log("\n MONGODB CONNECTED !! ",connectionInstance.connection.host)
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR : ",error);
        process.exit(1)
    }
}