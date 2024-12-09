import React, { useEffect } from "react";
import "../css/home.css";
import Chart from "../components/Chart";
import HorizontalCard from "../components/horizontalCard";

function Home() {
  useEffect(() => {}, []);

  const formattedINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(1224563);

  const Assets = [
    { type: "Banks", amount: "10,500" },
    { type: "Invest", amount: "10,500" },
    { type: "Insurance", amount: "10,500" },
    { type: "stocks", amount: "10,500" },
    { type: "Banks", amount: "10,500" },
    { type: "Banks", amount: "10,500" },
  ];

  const recentTran = [
    { name: "Amazon", amount: "10,500" },
    { name: "netflix", amount: "10,500" },
    { name: "salary", amount: "10,500" },
    { name: "dividend", amount: "10,500" },
    { name: "swiggy", amount: "10,500" },
  ];
  return (
    <div className="home-container">
      <div class="home-card-top card" style={{ margin: "1rem 0.3rem" }}>
        <div class="emoji left">{localStorage.getItem("name").slice(0, 2)}</div>
        <div class="emoji center">Networth</div>
        <div class="emoji right">NW-Logo</div>
      </div>
      <div class="home-card-info-cotainer card">
        <div class="home-card-name">
          {"Hello " + localStorage.getItem("name")}
        </div>
        <div class="home-card-info">
          Your current{" "}
          <span style={{ color: "hsl(211.7, 42.4%, 49%)" }}>Networth </span>
          is
        </div>
        <div class="home-card-amount ">{formattedINR}</div>
        <div class="home-card-note">
          {" "}
          💡 Your networth is updated every 24 hours
        </div>
      </div>
      <div className="card" style={{ height: "40vh" }}>
        <Chart></Chart>
      </div>
      <div className="card" style={{ padding: "10px" }}>
        <div className="heading-inside-card">
          <span style={{ color: "#5765e9", fontWeight: 700 }}>Assets</span>
          <span style={{ color: "#5765e9", fontWeight: 700 }}>
            see more {">>"}
          </span>
        </div>
        <div
          className="grid-column-2"
          style={{ minHeight: "40vh", padding: "1px" }}
        >
          {Assets.map((ele, ind) => (
            <HorizontalCard
              key={ind}
              type={ele.type}
              amount={ele.amount}
            ></HorizontalCard>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: "10px" }}>
        <div className="heading-inside-card">
          <span style={{ color: "#5765e9", fontWeight: 700 }}>
            Recent Transactions
          </span>
          <span style={{ color: "#5765e9", fontWeight: 700 }}>
            see more {">>"}
          </span>
        </div>
        {recentTran.map((ele, ind) => {
          return (
            <div key={ind} className="home-transaction-row">
              <div className="home-transaction-row-name">{ele.name}</div>
              <div className="home-transaction-row-amount">{ele.amount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
