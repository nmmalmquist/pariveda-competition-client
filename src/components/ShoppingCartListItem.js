import React, { useState, useEffect } from "react";

import styles from "../css/shopping-cart-list-item.module.css";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import logo from "../assets/logo.png";

const ShoppingCartListItem = ({ dog, onClickX }) => {
  const [url, setUrl] = useState(null);

  const GetDogPicURL = async () => {
    const thisUrl = await getDownloadURL(
      ref(storage, `dogImages/${dog.mainImageName}`)
    );
    setUrl(thisUrl);
  };
  useEffect(() => {
    GetDogPicURL();
  });

  const handleXClick = () => {
    onClickX(dog);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.listItemContainer}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={url || logo} alt="Dog pic" />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.name}>{dog.name}</h3>
          <div className={styles.details}>
            <h6 className={styles.descriptions}>Breed: {dog.breed}</h6>
            <h6 className={styles.descriptions}>Age: {dog.age}</h6>
          </div>
        </div>
        <h6 className={styles.cost}>${dog.cost}</h6>
        <h6 className={styles.X} onClick={handleXClick}>
          X
        </h6>
      </div>
    </div>
  );
};

export default ShoppingCartListItem;
