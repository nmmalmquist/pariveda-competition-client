import React, { useContext, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import styles from "../css/purchase-page.module.css";
import ShoppingCartListItem from "../components/ShoppingCartListItem";
import CartContext from "../components/CartContext";
import TotalCostListItem from "../components/TotalCostListItem";
import PurchaseForm from "../components/PurchaseForm";
import { PostPurchase } from "../crud/crudPurchase";
import { DeleteDog } from "../crud/crudDogs";

const PurchasePage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  let costTotal = 0;
  if (cart != null) {
    for (var i = 0; i < cart.length; i++) {
      costTotal += cart[i].cost;
    }
  }
 //On every render, will check to see if a customer is logged in, if not, it will make a person sign in
  const customerUser = JSON.parse(sessionStorage.getItem("customer"))
  if (customerUser === null || customerUser["email"] === "")
  {
    history.push("/loginCustomer")
  }

  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const RemoveFromCart = (dog) => {
    //Removes the dog from cartContext, when the X button on the list item is pressed
    setCart(cart.filter((item) => item.id !== dog.id));
    sessionStorage.setItem("shoppingCart", JSON.stringify([...cart, dog]));
    
    };

  const handleCompletePurchase = async (purchaseData) => {
    try {
      //add purchase to sql DB
      await PostPurchase(
        purchaseData.firstName,
        purchaseData.lastName,
        purchaseData.email,
        purchaseData.phoneNumber,
        costTotal
      );
      for (var i = 0; i < cart.length; i++) {
        try {
          //Set the deleted property in sql of the dogs that were just bought to true (soft deletion)
          await DeleteDog(cart[i].id);
        } catch (error) {
          console.log(
            `Could not remove (${cart[i].id}, ${cart[i].name}) could not be removed from SQL database`
          );
        }
      }
      //set cart to nothing
      sessionStorage.setItem("shoppingCart", null);
      setCart([]);

      alert("Your purchase has been complete");
      history.push("/");
    } catch (error) {
      alert("ERROR: Your purchase was not complete");
    }
  };

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <h1 className={styles.title}>All Dogs in cart:</h1>

        {!(cart.length === 0) ? (
          <div className={styles.fullCartContainer}>
            {cart.map((item) => (
              <ShoppingCartListItem key={item.id} dog={item} onClickX={RemoveFromCart}/>
            ))}
            <div className={styles.totalCostContainer}>
              <TotalCostListItem amount={costTotal} />
            </div>
            <Button
              onClick={showModal}
              className={styles.buyButton}
              variant="secondary"
            >
              Buy Now
            </Button>
          </div>
        ) : (
          <h2>There are no dogs in the cart...Whoof</h2>
        )}
      </Container>
      <PurchaseForm
        visible={isModalVisible}
        closeCallback={closeModal}
        submit={handleCompletePurchase}
      />
    </section>
  );
};

export default PurchasePage;
