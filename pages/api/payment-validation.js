// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {PaymentModel} from "../../server/service/paymentService"

export default async (req, res) => {

  try {
    const payment = PaymentModel;
    const {
      body,
      method,
    } = req;
 
    switch (method) {

      case "POST":
        payment.findOneAndUpdate(
          body._id,
          {
            status: body.status,
            transactionDate: new Date(body.transactionDate * 1000)
          },
        )
        .then( payment => {
          res.status(202).json("success")
          connection.close();

        } )
        .catch( err => res.status(400).json(err, 'Une erreur est survenue'))
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};