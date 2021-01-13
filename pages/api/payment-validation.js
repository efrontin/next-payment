import payment from "../../server/service/paymentService"

export default async (req, res) => {
  const {
    body,
    method,
  } = req;

  try {
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
          payment.dbClose()
        } )
        .catch( err => res.status(400).json(err, 'Une erreur est survenue'))
        break;

      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }

  } catch (e) {
    payment.dbClose()
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};