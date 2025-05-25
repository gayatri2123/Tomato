import mongoose from "mongoose";
 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gayu:gayu123@cluster0.qnfnp4c.mongodb.net/food-del').then(()=>console.log("db connected"));
}