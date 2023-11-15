import mongoose from "mongoose";
import colors from "colors";
const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.CONNCETIONSTRING);
        console.log(`connected to MongosDb ${connection.connection.name}`.bgMagenta.white)
    } catch (error) {
        console.log("error while connecting to Db".bgRed.white)
    }
}


export default connectDb;