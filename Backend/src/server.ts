import app from './app';
import env from './util/validateEnv'
import mongoose from 'mongoose';

const port = env.PORT;

mongoose.connect(env.MONGODB_URL).then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
        console.log(`Server on ${env.PORT}`);
    });   
}).catch(err => console.log(err.message));
