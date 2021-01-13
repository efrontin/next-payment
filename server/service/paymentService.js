import {dbClose} from "../dataBase/mongoose"
import paymentModel from '../model/payment'

const payment = {
    saveOne: async (payment) => {
        try{
            const savedPayment = await paymentModel.create({ ...payment });
            return savedPayment;
        }catch(err){
            console.log(err);
        }
    },
    
    getAll: async () => {
        try{
            const allPayment = await paymentModel.find({},  "-__v");
            return allPayment;
        }catch(err) {
            console.log(err);
        }
    },
    
    findOneAndUpdate: async (id, payment) => {
        try{
            const updatedPayment = await paymentModel.findByIdAndUpdate(
                id,
                {
                  status: payment,
                  transactionDate: new Date(payment.transactionDate * 1000)
                },
              );
              return updatedPayment;
        }catch(err){
            console.log(err);
        }
        
    },

    dbClose: () => dbClose
}

export default payment