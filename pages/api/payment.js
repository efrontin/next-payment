import axios from 'axios';
import * as https from "https";
import payment from "../../server/service/paymentService"

export default async (req, res) => {

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {

    const {
      method,
    } = req;

    switch (method) {
      case "POST":
        const savedData = await payment.saveOne({ ...req.body })

        try {
          

          const serviceBankResp = await axios.post('https://localhost:5001/Payment',
            JSON.stringify(savedData),
              { headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }, httpsAgent}
          )

          res.status(200).json(serviceBankResp);
          payment.dbClose()

        } catch (e) {
          console.log(e);
          res.status(500).json( {e} );
          payment.dbClose()
        }
        break;

      case "GET":
        payment.getAll({}, "-__v")
        .then( payments => {
          console.log(payment);
          res.status(200).json(payments);
          payment.dbClose()
        })
        .catch( (err) => {
          res.status(500).json({ err });
          payment.dbClose()
        })
      break;

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

  } catch (e) {
    payment.dbClose()
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};