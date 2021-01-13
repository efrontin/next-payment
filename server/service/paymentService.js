import { PaymentModel } from "../model/payment";

saveOne = async (payment) => {
    const savedPayment = await PaymentModel.create({ payment });
    return savedPayment;
}

getAll = async () => {
    const allPayment = await PaymentModel.find({},  "-__v");
    return allPayment;
}

findOneAndUpdate = async (id, payment) => {
    const updatedPayment = await payment.findByIdAndUpdate(
        id,
        {
          status: body.status,
          transactionDate: new Date(body.transactionDate * 1000)
        },
      );

      return updatedPayment;
}

export default{
    saveOne,
    getAll,
    findOneAndUpdate
    
}