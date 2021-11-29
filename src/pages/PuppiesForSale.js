import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import DogCard from "../components/DogCard.js";
import styles from "../css/rent-sale-page.module.css";
import { GetDogsForBuy } from "../crud/crudDogs.js";
import LoadingAnimation from "../components/LoadingAnimation.js";

const PuppiesForSale = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  //gets called on first render b/c of the empty []
  useEffect(() => {
    loadDogs();
  }, []);

  //The setLoading method is what determines of the loading animiation will render based on how long it takes to get data from api.
  const loadDogs = async () => {
    setLoading(true);
    const data = await GetDogsForBuy(); //method that actual calls to the api
    setDogs(data);
    setLoading(false);
  };

  const nonDeletedDogs = dogs.filter((item) => item.deleted === false)

  return (
    <section className={styles.section}>
      <Container className={styles.titleContainer}>
        <h1>Puppies For Sale</h1>
      </Container>
      {loading ? <LoadingAnimation height={300} width={500} /> : null}

      {!loading ? <Container className={styles.cardListContainer}>
        {nonDeletedDogs.map((dog) => (
          <DogCard key={dog.id} dogData={dog} />
        ))}
      </Container> : null}
    </section>
  );
};

export default PuppiesForSale;
