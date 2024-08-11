const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

// Define the schema and model
const entrySchema = new mongoose.Schema({
  Category: { type: String, required: true },
  Amount: { type: Number, required: true },
  Info: { type: String, required: true },
  Date: { type: Date, required: true }
});

const Entry = mongoose.model('Entry', entrySchema);

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/Money', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to Database"))
  .catch(err => console.error("Error connecting to the Database:", err));

app.post("/add", async (req, res) => {
  try {
    const { category_select, amount_input, info, date_input } = req.body;

    if (!category_select || !amount_input || !info || !date_input) {
      return res.status(400).send("Missing required fields");
    }

    const entry = new Entry({
      Category: category_select,
      Amount: parseFloat(amount_input), // Ensure amount is a number
      Info: info,
      Date: new Date(date_input) // Ensure date_input is a valid date string
    });

    await entry.save();
    console.log("Record Inserted Successfully");
    res.status(200).send("Record Inserted Successfully");
  } catch (err) {
    console.error("Error inserting record:", err);
    res.status(500).send("Error inserting record");
  }
});

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": '*'
  });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5001, () => {
  console.log("Listening on port 5001");
});
