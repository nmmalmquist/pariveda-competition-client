import React, { useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {useHistory} from "react-router-dom";

import CartContext from "./CartContext";
import ShoppingCartListItem from "./ShoppingCartListItem";
import TotalCostListItem from "./TotalCostListItem";


const ShoppingCartModal = ({ visible, closeCallback }) => {
  const { cart, setCart } = useContext(CartContext);
  const history = useHistory();

  let costTotal = 0;
  if(cart != null)
  {
    for(var i = 0; i < cart.length; i++)
    {
      costTotal += cart[i].cost
    }
  }

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("shoppingCart")) !== null) {
      setCart(JSON.parse(sessionStorage.getItem("shoppingCart")));
    }
  },[setCart]);

  const GoToCheckout = () => {
      closeCallback();
      history.push("/purchase")
  }

  const RemoveFromCart = (dog) => {
    //Removes the dog from cartContext, when the X button on the list item is pressed
    setCart(cart.filter((item) => item.id !== dog.id));
    sessionStorage.setItem("shoppingCart", JSON.stringify([...cart, dog]));
    
    };

  return (
    <Modal
      show={visible}
      onHide={closeCallback}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!(cart === null) ? (
          cart.map((item) => <ShoppingCartListItem key={item.id} dog={item} onClickX={RemoveFromCart}/>)
        ) : (
          <h4>The puppy cart is empty...Whoof!</h4>
        )}
        <TotalCostListItem amount={costTotal} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={closeCallback}>
          Close
        </Button>
        <Button variant="secondary" onClick={GoToCheckout}>Proceed to Checkout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShoppingCartModal;
