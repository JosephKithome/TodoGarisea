import mongoose from 'mongoose';

let isConnected = false;

const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDb is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "todoGarisea",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDb;
