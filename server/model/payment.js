import {dbConnect} from "../dataBase/mongoose"

//Define a schema
var Schema = mongoose.Schema;

export default PaymentModel = () => {
    const paymentSchema = new Schema({
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

      return  dbConnect.model('paymentSchema', paymentSchema );
}