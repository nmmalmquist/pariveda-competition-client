import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { GetDog } from "../crud/crudDogs";
import LoadingAnimation from "../components/LoadingAnimation";
import MyCarousel from "../components/MyCarousel";
import styles from "../css/description-page.module.css";
import BuyButton from "../components/BuyButton";
import {ObjectIsEmpty} from "../utility/utility.js";
import CartContext from "../components/CartContext";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import logo from "../assets/logo.png";


const DogDescription = () => {
  const [dog, setDog] = useState({});
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const [dogInCart, setDogInCart] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  //grabs the current url to get the id of the dog we are trying to hit
  const GetDogIdFromURL = () => {
    const id = window.location.href.split("/").pop();
    return id;
  };

  useEffect(() => {
    //for getting the id of the dog, so it can hit backend with ID
    const dogId = GetDogIdFromURL();
    loadDog(dogId);
  }, []);

  useEffect(() => {
    //on load and anytime the states change, check if dog already in cart
    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === dog.id) {
          setDogInCart(true);
          return;
        }
      }
    }
    setDogInCart(false);
  }, [cart, dog]);

  const loadDog = async (dogId) => {
    setLoading(true);
    const dogData = await GetDog(dogId);
    setDog(dogData);
    setLoading(false);
  };

  const GetDogPicURL = async () => {
    let urls = [logo];
    if (!ObjectIsEmpty(dog)) {
      try {
        const thisMainUrl = await getDownloadURL(
          ref(storage, `dogImages/${dog.mainImageName}`)
        );
        urls = [...urls, thisMainUrl];
      } catch (error) {}
      try {
        const thisImage1Url = await getDownloadURL(
          ref(storage, `dogImages/${dog.image1Name}`)
        );
        urls = [...urls, thisImage1Url];
      } catch (error) {}
      try {
        const thisImage2Url = await getDownloadURL(
          ref(storage, `dogImages/${dog.image2Name}`)
        );
        urls = [...urls, thisImage2Url];
      } catch (error) {}
      try {
        const thisImage3Url = await getDownloadURL(
          ref(storage, `dogImages/${dog.image3Name}`)
        );
        urls = [...urls, thisImage3Url];
      } catch (error) {}

      //removes the logo place holder that is put in place for loading
      urls = urls.filter((item) => item !== logo)
    }

    setImageUrls(urls);
  };

  useEffect(() => {
    GetDogPicURL();
  }, [dog]);


  const handleAddToCart = () => {
    //adds to the cartContext once the add to cart button is pressed
    if (cart != null) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === dog.id) {
          alert("Dog is already in the cart");
          return;
        }
      }
    }

    setCart([...cart, dog]);
    sessionStorage.setItem("shoppingCart", JSON.stringify([...cart, dog]));
    setDogInCart(true);
  };
  const handleRemoveFromCart = () => {
    //Removes the dog from cartContext
    setCart(cart.filter((item) => item.id !== dog.id));
    sessionStorage.setItem("shoppingCart", JSON.stringify([...cart, dog]));
    setDogInCart(false);
  };

  //WILL NOT RENDER until the dog state has a value
  return (
    <section className={styles.section}>
      {loading ? <LoadingAnimation height={300} width={500} /> : null}
      {!ObjectIsEmpty(dog) ? (
        <Container className={styles.infoContainer}>
          <div className="row">
            <div className={`col ${styles.leftCol}`}>
              <div className={styles.carouselContainer}>
                <MyCarousel imageLinks={imageUrls} />
              </div>
            </div>
            <div className="col">
              <div className={styles.textContainer}>
                <h1>{dog.name} wants to play with you!</h1>
                <div className={styles.details}>
                  <ul>
                    <li>
                      <span style={{ fontWeight: "bold" }}>Breed:</span>
                      {"  "}
                      {dog.breed}
                    </li>
                    <li>
                      {"  "}
                      <span style={{ fontWeight: "bold" }}>Age:</span> {dog.age}
                    </li>
                    <li>
                      {"  "}
                      <span style={{ fontWeight: "bold" }}>Cost:</span>
                      {"  "}${dog.cost}
                    </li>
                  </ul>
                  <span style={{ fontWeight: "bold" }}>Description:</span>
                  <p>{dog.description}</p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {!dogInCart ? (
                  <BuyButton
                    text={"Add " + dog.name + " to cart"}
                    onClick={handleAddToCart}
                  />
                ) : (
                  <h6
                    className={styles.removeButton}
                    onClick={handleRemoveFromCart}
                  >
                    X remove from cart
                  </h6>
                )}
              </div>
            </div>
          </div>
        </Container>
      ) : null}
    </section>
  );
};

export default DogDescription;
