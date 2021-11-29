import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import logo from "../assets/logo.png";
import styles from "../css/create-account.module.css";
import { GetCustomer, PostCustomer } from "../crud/crudCustomers";

const CreateCustomerAccount = () => {
  const [loginData, SetLoginData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const [accountAlreadyExists, setAccountAlreadyExists] = useState(false);

  const handleChange = (element) => {
    SetLoginData({
      ...loginData,
      [element.target.name]: element.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //necessary to make sure the form will run this fetch on subsequent submits
    try {
      await GetCustomer(loginData.email); //no need to store the data. If the fetch works, then we know that there is already an account with that email address
      setAccountAlreadyExists(true);
    } catch (error) {
      //when an error occurs, that means the email already exists as an account so we want to push new credentials when the email doesn't exist which means the fetch to get email produced no error
      let response = await PostCustomer(
        loginData.firstName,
        loginData.lastName,
        loginData.birthdate,
        loginData.email,
        loginData.password
      );
      if (response.status === 200) {
        alert("Your account has been made. Please Sign in.");
        history.push("/loginCustomer");
      } else {
        alert("There was a problem creating your account. Try again");
      }
      setAccountAlreadyExists(false);
    }
    e.target.reset(); //reset form
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <div>
            <img src={logo} className={styles.logo} alt="logo" />
          </div>
          <h1 className={styles.title}>Create Your Account</h1>
          <div className={styles.signInContainer}>
            <Form onSubmit={handleSubmit}>
              <div className={styles.formContainer}>
                <div className={styles.leftInputContainer}>
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label className={styles.label}>First Name</Form.Label>
                    <Form.Control
                      className={styles.inputBox}
                      name="firstName"
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label className={styles.label}>Last Name</Form.Label>
                    <Form.Control
                      className={styles.inputBox}
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBirthdate">
                    <Form.Label className={styles.label}>Birthdate</Form.Label>
                    <Form.Control
                      className={styles.inputBox}
                      name="birthdate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.rightInputContainer}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className={styles.label}>
                      Email address
                    </Form.Label>
                    <Form.Control
                      className={styles.inputBox}
                      name="email"
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className={styles.label}>Password</Form.Label>
                    <Form.Control
                      className={styles.inputBox}
                      name="password"
                      onChange={handleChange}
                      type="password"
                      rows={1}
                      placeholder="Password"
                    />
                  </Form.Group>
                </div>
              </div>
              {accountAlreadyExists ? (
                <h6 className={styles.errorMessage}>
                  {" "}
                  That email is already associated with an account.
                </h6>
              ) : null}
              <Link className={styles.loginButton} to="/login">
                Back to Login
              </Link>
              <div className={styles.buttonContainer}>
                <Button size="lg" variant="outline-secondary" type="submit">
                  Create Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreateCustomerAccount;
