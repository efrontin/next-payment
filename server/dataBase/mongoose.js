//Set up mongoose connection
var mongoose = require('mongoose');

let dbConnection;

export function dbConnect(){
    var mongoDB = 'mongodb://localhost/paymentDB';
    mongoose.connect(mongoDB,
        {
            useNewUrlParser: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
          }
    );
    dbConnection = mongoose.connection;
    dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return dbConnection;
}

export const dbClose = () => {
    dbConnection.close()
}

// export default dbConnect;