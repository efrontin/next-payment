import axios from 'axios';
import * as https from "https";
import dbConnect from "../../server/dataBase/mongoose"
import {PaymentModel} from "../../server/service/paymentService"

export default async (req, res) => {

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    const payment = PaymentModel

    const {
      method,
    } = req;

    switch (method) {
      case "POST":
        const savedData = await payment.save({ ...req.body })

        try {
          const serviceBankResp = await axios.post('https://localhost:5001/Payment',
            JSON.stringify(savedData),
              { headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }, httpsAgent}
          )
          res.status(200).json(serviceBankResp);
        } catch (e) {
          res.status(500).json("une erreur est survenu", { e });
        }
        break;

      case "GET":
        payment.getAll({}, "-__v",)
        .then( payments => {
          res.status(200).json(payments);
          connection.close();
        })
        .catch( (err) => {
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