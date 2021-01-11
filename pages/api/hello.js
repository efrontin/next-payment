// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  state:{
    type: Number,
  },
  libelle:{
    type: String,
  },
  horodatage: {
    type: Date,

  }
});

const test = {
  "amount": 1,
  "state": 1,
  "libelle": "TEST",
  "horodatage": null
}

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
        payment.create({ ...req.body }, (error, payment) => {
          if (error) {
            res.status(500).json({ error });
            connection.close();
          } else {
            res.status(200).json(payment);
            connection.close();
          }
        });
        break;

      case "GET":
        payment.find({}, "-_id -__v", (error, payment) => {
          if (error) {
            connection.close();
            res.status(500).json({ error });
          } else {
            res.status(200).json(payment);
            connection.close();
          }
        });
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