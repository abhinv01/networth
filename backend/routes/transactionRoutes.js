const express = require("express");
const router = express.Router();
const { jwtValidation } = require("../middlewares/auth");
const Transaction = require("../models/transaction");

// Get recent transactions
router.get("/recent", jwtValidation, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get("/custom-range", jwtValidation, async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     // Check if both startDate and endDate are provided
//     if (!startDate || !endDate) {
//       return res
//         .status(400)
//         .json({ message: "Please provide both startDate and endDate" });
//     }

//     // Convert the string dates into Date objects
//     const start = new Date(
//       Date.UTC(
//         new Date(startDate).getUTCFullYear(),
//         new Date(startDate).getUTCMonth(),
//         new Date(startDate).getUTCDate()
//       )
//     );
//     const end = new Date(
//       Date.UTC(
//         new Date(endDate).getUTCFullYear(),
//         new Date(endDate).getUTCMonth(),
//         new Date(endDate).getUTCDate(),
//         23,
//         59,
//         59,
//         999
//       )
//     );
//     const customDate = new Date(Date.UTC(2024, 11, 3)); // December is month 11 (0-indexed)

//     start.setHours(0, 0, 0, 0);
//     end.setHours(23, 59, 59, 999);

//     // Validate if the dates are valid
//     if (isNaN(start) || isNaN(end)) {
//       return res.status(400).json({
//         message: "Invalid date format. Please use a valid date string",
//       });
//     }

//     console.log("startDate", start, end, start > customDate);

//     // Query for transactions within the custom date range
//     const transactions = await Transaction.find({
//       userId: req.user.id,
//       date: { $gte: start, $lte: end },
//     });

//     // Return the filtered transactions
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/custom-range", jwtValidation, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Check if both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Please provide both startDate and endDate" });
    }

    // Convert string dates into Date objects and normalize to UTC midnight
    const start = new Date(startDate);
    const end = new Date(endDate);
    const customDate = new Date(Date.UTC(2024, 11, 3)); // December is month 11 (0-indexed)

    // Normalize to UTC midnight for start date and just before midnight for end date
    start.setUTCHours(0, 0, 0, 0); // set start date to 00:00 UTC
    end.setUTCHours(23, 59, 59, 999); // set end date to 23:59:59 UTC

    // Validate if the dates are valid
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        message: "Invalid date format. Please use a valid date string",
      });
    }

    // console.log("startDate:", start, "endDate:", end, start < customDate);

    // Query for transactions within the custom date range
    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    });

    // Return the filtered transactions
    res.json(transactions);
  } catch (err) {
    console.error(err); // log the error for debugging
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
