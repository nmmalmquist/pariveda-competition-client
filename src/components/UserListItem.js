import React from "react";

import styles from "../css/UserListItem.module.css";

const UserListItem = ({ user, onClickX }) => {

const handleXClick = () =>{
  onClickX(user)
}

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.name}>
          <span>{user.firstName} </span>
          <span>{user.lastName}</span>
        </div>
        <span>{user.email}</span>
      </div>
      <h6 className={styles.X} onClick={handleXClick}>X</h6>
    </div>
  );
};

export default UserListItem;
