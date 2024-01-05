import mongoose from 'mongoose';

let isConnected = false;

export default connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDb is already connected');
        return
    }
    try {
    } catch (error) {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "todoGarisea",
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        isConnected = true;

        console.log("MongoDb  is connected");
    }
}