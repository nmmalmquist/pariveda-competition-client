import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";

import styles from "../css/contact-page.module.css";

const Contact = () => {
  const [emailData, SetEmailData] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const handleChange = (element) => {
    SetEmailData({
      ...emailData,
      [element.target.name]: element.target.value.trim(),
    });
  };

  //emailJS is the service I am using for sending emails. I just send emails to myself with a business email.
  //e are represents the form, the emailJS API the takes the values in the form imputs and send the email in a template i have set up with my EmailJS account
  const SendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vujkfip', 'template_mmn5pbo', e.target, 'user_5scnx2R4vxN6waHW3iEDO')
      .then((result) => {
          console.log(result.text);
          alert("Thank you for sending us an email")
      }, (error) => {
          console.log(error.text);
          alert("There was an error sending your message. Try again.")
      });
      e.target.reset();
      
  };


  return (
    <section className={styles.section}>
      <Container className={styles.formContainer}>
        <Form onSubmit={SendEmail}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmailSubject">
            <Form.Label>Subject line</Form.Label>
            <Form.Control
              name="subject"
              onChange={handleChange}
              as="textarea"
              rows={1}
              placeholder="Subject"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmailBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              name="body"
              onChange={handleChange}
              as="textarea"
              rows={5}
              placeholder="Email body"
            />
          </Form.Group>
          <div className={styles.buttonContainer}>
            <Button
              size="lg"
              variant="outline-secondary"
              type="submit"
            >
              Send Email
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default Contact;
