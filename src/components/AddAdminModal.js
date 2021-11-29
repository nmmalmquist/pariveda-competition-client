import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { GetAdmin, PostAdmin } from "../crud/crudAdmins";

import styles from "../css/AddAdminModal.module.css";

const AddAdminModal = ({ visible, closeCallback }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [accountAlreadyExists, setAccountAlreadyExists] = useState(false);

  const handleChange = (element) => {
    setData({
      ...data,
      [element.target.name]: element.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //necessary to make sure the form will run this fetch on subsequent submits
    try {
      await GetAdmin(data.email); //no need to store the data. If the fetch works, then we know that there is already an account with that email address
      setAccountAlreadyExists(true);
    } catch (error) {
      //when an error occurs, that means the email does not exists as an account so we want to push new credentials when the email doesn't exist which means the fetch to get email produced no error
      let response = await PostAdmin(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      if (response.status === 200) {
        alert("Your account has been made. Please Sign in.");
        closeCallback();
        window.location.reload();
      } else {
        alert("There was a problem creating your account. Try again");
      }
      setAccountAlreadyExists(false);
    }
    e.target.reset(); //reset form
  };

  return (
    <Modal
      show={visible}
      onHide={closeCallback}
      backdrop="static"
      keyboard={false}
    >
      <h3 className={styles.X} onClick={closeCallback}>
        X
      </h3>
      <Modal.Header>
        <Modal.Title>Create Admin Account</Modal.Title>
      </Modal.Header>
      <Form className={styles.container} onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" type="text" placeholder="First Name" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" type="text" placeholder="Enter email" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange}/>
        </Form.Group>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Create Admin Account
          </Button>
          {accountAlreadyExists ? <h6 className={styles.error}>Sorry an account already exists with that email</h6> : null}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddAdminModal;
