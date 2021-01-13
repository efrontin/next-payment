var mongoose = require('mongoose');
//Define a schema

var Schema = mongoose.Schema;

let paymentSchema = new Schema({
    id: {
        type: Number,
        _someId: Schema.Types.ObjectId,
    },
    amount: {
        type: Number,
        required: true
    },
    status:{
        type: Number,
        enum: [0, 1, 2, 3],
        default: 1,
    },
    label:{
        type: String,
        default: ""
    },
    transactionDate: {
        type: Date,
        default: null 
    }
});

let paymentModel =  mongoose.models['paymentSchema'] || mongoose.model('paymentSchema', paymentSchema )

// return  mongoose.model('paymentSchema', paymentSchema );

export default paymentModel;