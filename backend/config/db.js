import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    //key as first arg, options as second
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`.cyan);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);

    //process.exit(1) node exits with failure
    process.exit(1);
  }
};

export default connectDB;
