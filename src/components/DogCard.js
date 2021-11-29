import React, { useState, useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

import styles from "../css/dog-card.module.css";
import { storage } from "../firebase";
import { ref, getDownloadURL} from "firebase/storage";


const DogCard = ({ dogData}) => {
  const [url, setUrl] = useState(null)

  const GetDogPicURL = async() => {
    try {
      const thisUrl =  await getDownloadURL(ref(storage, `dogImages/${dogData.mainImageName}`))
      setUrl(thisUrl);
      
    } catch (error) {
      setUrl(null);
    }
  }
  useEffect(() => {
    GetDogPicURL()
  })

  return (
    <Link to={{pathname: `/details/${dogData.id}`, state: dogData}}>
      <div className={styles.makeTouchable}>
        <Card style={{ width: "18rem" }}>
          <div style={{ height: "250px" }}>
            <Card.Img
              style={{ height: "100%", objectFit: "cover" }}
              variant="top"
              src={url || logo}
            />
          </div>
          <Card.Body>
            <Card.Title>{dogData.name}</Card.Title>
          </Card.Body> 
          <ListGroup key={1} className="list-group-flush">
            <ListGroupItem style={{ height: "60px" }}>
              <span className={styles.listItemTitle}>Breed:</span> {dogData.breed}
            </ListGroupItem>
            <ListGroupItem key={2} style={{ height: "50px" }}>
              <span className={styles.listItemTitle}>Age:</span> {dogData.age} Years old
            </ListGroupItem>
            <ListGroupItem key={3} style={{ height: "50px" }}>
              <span className={styles.listItemTitle}>Cost:</span>{" "}
              <span className={styles.cost}>${dogData.cost}</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    </Link>
  );
};

export default DogCard;
