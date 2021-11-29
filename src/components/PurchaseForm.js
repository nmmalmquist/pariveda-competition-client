import React, { useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";



import styles from "../css/purchase-form.module.css";

const PurchaseForm = ({ visible, closeCallback, submit }) => {
  
  const [data, SetData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (element) => {
    SetData({
      ...data,
      [element.target.name]: element.target.value.trim(),
    });
  };

  const handleSubmit = () => {
    submit(data);
  };

  return (
    <Modal
      show={visible}
      onHide={closeCallback}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Purchase Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className={styles.inputBox}
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className={styles.inputBox}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className={styles.inputBox}
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className={styles.inputBox}
              name="phoneNumber"
              onChange={handleChange}
              type="tel"
              maxLength="12"
              rows={1}
              placeholder="(222) 222-2222"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={closeCallback}>
          Return to cart
        </Button>
        <Button onClick={handleSubmit} variant="secondary">
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseForm;
