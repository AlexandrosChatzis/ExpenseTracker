const express = require("express");
const Expense = require("../models/Expense");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({
      user_id: req.query.user_id,
      date: `${req.query.year}-${req.query.month}`
    }).sort([["date_created", -1]]);

    res.json(expenses);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", (req, res) => {
  //console.log(req.body);
  const expense = new Expense({
    user_id: req.body.user_id,
    etiology: req.body.etiology,
    type: req.body.type,
    ammount: req.body.ammount,
    date: req.body.date
  });

  expense
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.json(expense);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removeExpense = await Expense.deleteOne({ _id: req.params.id });
    res.json({ message: "removed" });
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateExpense = await Expense.updateOne(
      { _id: req.params.id },
      {
        $set: {
          etiology: req.body.etiology,
          ammount: req.body.ammount,
          type: req.body.type
        }
      }
    ).then(data => {
      res.json(data);
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
