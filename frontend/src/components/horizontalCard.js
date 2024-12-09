import React from "react";
import "../css/horizontalCard.css";

function HorizontalCard({ type, amount }) {
  return (
    <div className="horizontal-card">
      <div className="emoji-section">
        <span className="emoji">💵</span>
      </div>
      <div className="content-section">
        <div className="data-set">
          {type} {amount}
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
