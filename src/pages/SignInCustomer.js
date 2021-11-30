import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import styles from "../css/sign-in-customer.module.css";
import logo from "../assets/logo.png";
import { GetCustomer } from "../crud/crudCustomers";
import UserContext from "../components/UserContext";

const SignInCustomer = () => {
  const [loginData, SetLoginData] = useState({
    email: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (element) => {
    SetLoginData({
      ...loginData,
      [element.target.name]: element.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //necessary to make sure the form will run this fetch on subsequent submits
    let credentials = {};
    if (loginData.email !== "") {
      try {
        credentials = await GetCustomer(loginData.email);
      } catch (error) {
        setInvalidCredentials(true);
      }
    }
    ValidateCredentials(credentials);
    e.target.reset(); //reset form
  };

  const ValidateCredentials = (credentials) => {
    if (!credentials.deleted && loginData.password === credentials.password) {
      //update the userContext and cookies with the now validated user
      setUser({ email: loginData.email, password: loginData.password });
      sessionStorage.setItem("customer", JSON.stringify(loginData));
      //Go to the home page or purchase page depending if a shopping cart is active on sign in
      if (sessionStorage.getItem("shoppingCart")) {
        history.push("/purchase");
      } else {
        history.push("/");
      }
      //update the userContext with the now validated user
      setUser({ email: loginData.email, password: loginData.password });
      sessionStorage.setItem("customer", JSON.stringify(loginData));
    } else {
      setInvalidCredentials(true);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <img onClick={()=>{history.push("/")}} src={logo} className={styles.logo} alt="logo" />
        <div className={styles.signInContainer}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className={styles.label}>Email address</Form.Label>
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
            {invalidCredentials ? (
              <h6 className={styles.invalidCredentials}>
                Could not validate the email and/or password
              </h6>
            ) : null}
            <Link className={styles.createAccount} to="/create">
              Create an account
            </Link>
            <div className={styles.buttonContainer}>
              <Button size="lg" variant="outline-secondary" type="submit">
                Log in
              </Button>
            </div>
          </Form>
          <Link className={styles.adminLink} to="/loginAdmin">
            Admin sign in?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignInCustomer;
