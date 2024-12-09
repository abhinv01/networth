const mongoose = require("mongoose");
const Transaction = require("./models/transaction");
const Asset = require("./models/Asset");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const customUserId = new mongoose.Types.ObjectId("6755bb8161787742edcc1c44");

const seedData = async () => {
  try {
    // await Transaction.deleteMany();
    // await Asset.deleteMany();

    await Transaction.insertMany([
      {
        userId: customUserId,
        type: "income",
        amount: 570,
        date: new Date("2024-11-01T00:00:00Z"),
      },
      {
        userId: customUserId,
        type: "expense",
        amount: 199,
        date: new Date("2024-12-03T00:00:00Z"),
      },
      {
        userId: customUserId,
        type: "income",
        amount: 345,
        date: new Date("2024-12-03T00:00:00Z"),
      },
    ]);

    // await Asset.insertMany([
    //   { userId: customUserId, assetType: "Stocks", value: 1000 },
    //   { userId: customUserId, assetType: "Real Estate", value: 5000 },
    //   { userId: customUserId, assetType: "Bank Accounts", value: 9000 },
    // ]);

    console.log("Dummy data inserted!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error during seeding data:", error);
    mongoose.connection.close();
  }
};

seedData();
