import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import styles from "../css/sign-in-admin.module.css";
import { GetAdmin } from "../crud/crudAdmins";
import UserContext from "../components/UserContext";

const SignInAdmin = () => {
  const [loginData, SetLoginData] = useState({
    email: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

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
        credentials = await GetAdmin(loginData.email);
      } catch (error) {
        setInvalidCredentials(true);
      }
    }
    ValidateCredentials(credentials);
    e.target.reset(); //reset form
  };

  const ValidateCredentials = (credentials) => {
    if (!credentials.deleted && loginData.password === credentials.password) {
      //Go to the home page when signed in
      history.push("/admin");
      //update the userContext with the now validated user
      setUser({ email: loginData.email, authenticated: true });
    } else {
      setInvalidCredentials(true);
    }
  };

  return (
    <section className={styles.section}>
        <h1 className={styles.title}>Admin Sign In</h1>
      <div className={styles.content}>
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
                Could not validate the email and/or password as Admin
              </h6>
            ) : null}

            <div className={styles.buttonContainer}>
              <Button
                className={styles.button}
                size="lg"
                variant="outline-secondary"
                type="submit"
              >
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignInAdmin;
