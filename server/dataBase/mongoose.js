//Set up mongoose connection
var mongoose = require('mongoose');

export default dbConnect = () => {
    var mongoDB = 'mongodb://localhost/paymentDB';
    mongoose.connect(mongoDB,
        {
            useNewUrlParser: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
          }
    );
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return db;
}

