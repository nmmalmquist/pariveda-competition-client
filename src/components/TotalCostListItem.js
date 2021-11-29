import React from "react";

import styles from "../css/shopping-cart-list-item.module.css";

const TotalCostListItem = ({ amount }) => {
  return (
    <div className={styles.totalCostContainer}>
      <h2>Total</h2>
      <div className={styles.totalCostNumberContainer}>
        <h2 className={styles.totalCost}>${amount}.00</h2>
      </div>
    </div>
  );
};

export default TotalCostListItem;
