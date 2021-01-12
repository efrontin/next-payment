// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mongoose = require('mongoose');

const stateEnum = new Map([
  [0, "UNKNOW"],
  [1, "PENDING"],
  [2, "ACCEPTED"],
  [3, "VALIDATED"]
])

const opts = { toJSON: { virtuals: true } };

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  state:{
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
}, opts);

paymentSchema.virtual('status').get( function(){
  return stateEnum.get(this.state);
})


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

    console.log(payment.status);
    switch (method) {

      case "POST":
        res.status(200).json("Good job, its done !!!!!")
        // payment.create({ ...req.body })
        // .then( (payment) => {
        //   res.status(200).json(payment);
        //   connection.close();
        // })
        // .catch( err => {
        //   res.status(500).json({ error });
        //   connection.close();
        // })
        break;

      // case "GET":
      //   payment.find({}, "-__v",)
      //   .then( payments => {
      //     res.status(200).json(payments);
      //     connection.close();
      //   })
      //   .catch( err => {
      //     res.status(500).json({ err });
      //     connection.close();
      //   })
      // break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};