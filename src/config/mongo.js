import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default mongoose;