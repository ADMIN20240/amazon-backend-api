// Refactoring backend API without function
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const stripe = require("stripe");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;
// const stripeClient = stripe(process.env.STRIPE_KEY);

// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "success!" });
// });

// app.post("/payment/create", async (req, res) => {
//   const { total } = req.body; // Expect total amount in the request body

//   console.log("Payment Request Received for amount >>> ", total);

//   try {
//     const paymentIntent = await stripeClient.paymentIntents.create({
//       amount: total, // amount in cents
//       currency: "usd",
//     });

//     res.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
///////////////////////////////////////////////////////////////
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success!" });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // amount in cents
      currency: "usd",
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Amazon Server Running on port:3000,http://localhost:3000 ");
});
