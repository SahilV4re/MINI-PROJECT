const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();
const port = 3000;

app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// instance.orders.create({
//   amount: 50000,
//   currency: "INR",
//   receipt: "receipt#1",
//   notes: {
//     key1: "value3",
//     key2: "value2",
//   },
// });

app.post("/order", (req, res) => {
  console.log(req.body);
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };

  instance.orders.create(options, (err, order) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    return res.status(200).json(order);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
