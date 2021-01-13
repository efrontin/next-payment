// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
      body,
      method,
    } = req;
    console.log(new Date(body.transactionDate * 1000));
    switch (method) {

      case "POST":
        payment.findByIdAndUpdate(
          body._id,
          {
            status: body.status,
            transactionDate: new Date(body.transactionDate * 1000)
          },
        )
        .then( payment => {
          console.log(body);
          console.log(payment);

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