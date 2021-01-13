// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import * as https from "https";

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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

export default async (req, res) => {

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const connection = await mongoose.createConnection(
    "mongodb://localhost/paymentDB",
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    }
  );

  try {
    const payment = connection.model("PaymentSchema", paymentSchema);
    const {
      method,
    } = req;

    switch (method) {
      case "POST":

        const savedData = await payment.create({ ...req.body, amount: req.body.amount * 100 })

        try {
          const serviceBankResp = await axios.post('https://localhost:5001/Payment',
            JSON.stringify(savedData),
              { headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }, httpsAgent}
              )
          //console.log("response", serviceBankResp);
          const acceptedPayment = await payment.create({ ...serviceBankResp })
          res.status(200).json(acceptedPayment);
        } catch (e) {
          console.log("erreur", e)
        }
        break;

      case "GET":
        payment.find({}, "-__v",)
        .then( payments => {
          res.status(200).json(payments);
          connection.close();
        })
        .catch( (err, error) => {
          res.status(500).json({ err });
          connection.close();
        })
      break;

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};