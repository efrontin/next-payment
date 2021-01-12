// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

const mongoose = require('mongoose');

const statusEnum = new Map([
  [0, "UNKNOW"],
  [1, "PENDING"],
  [2, "ACCEPTED"],
  [3, "VALIDATED"]
])

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
        payment.create({ ...req.body })
        .then( (payment) => {
          console.log(payment);
          res.status(200).json(payment);
          axios.post("https://localhost:5000/Payment", {
            ...payment
          })
          connection.close();
        })
        .catch( (err) => {
          console.log(err);
          res.status(500).json({ err });
          connection.close();
        })
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