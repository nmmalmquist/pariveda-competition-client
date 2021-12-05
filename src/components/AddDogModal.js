import React, { useState } from "react";
import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { PostDog, GetMostRecentDog } from "../crud/crudDogs";

import styles from "../css/AddDogModal.module.css";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

const AddDogModal = ({ visible, closeCallback }) => {
  const [data, setData] = useState({
    breed: "",
    age: "",
    cost: "",
    name: "",
    description: "",
    saleType: "",
    mainImage: "",
    image1: "",
    image2: "",
    image3: "",
  });

  //when image state is changed, it needs to be saved to saved a little differently than regular intergers or text
  const handleChange = (element) => {
    if (
      element.target.name === "mainImage" ||
      element.target.name === "image1" ||
      element.target.name === "image2" ||
      element.target.name === "image3"
    ) {
      setData({
        ...data,
        [element.target.name]: element.target.files[0],
      });
    } else {
      setData({
        ...data,
        [element.target.name]: element.target.value.trim(),
      });
    }
  };

  //Changes for when the dropdown box changes value for sale type
  const handleSaleTypeRentChange = () => {
    setData({
      ...data,
      saleType: "Rent",
    });
  };
  const handleSaleTypeBuyChange = () => {
    setData({
      ...data,
      saleType: "Buy",
    });
  };

  //Three api calls happen here. First it will send the non-image dog data to the MySQL DB, then it will API GET the dog just sent.
  //This is done to get the ID of the dog just created, so we can name the images appropriately.
  //lastly, the images are named using the id from the GET api call and then POST API call to firebase storage.
  const handleSubmit = async (e) => {
    e.preventDefault(); //necessary to make sure the form will run this fetch on subsequent submits

    //send data to mysql server, notice that the pictures are not saved to the MySQL server.
    let postSQLresponse = await PostDog(
      data.breed,
      data.age,
      data.cost,
      data.name,
      data.description,
      data.saleType
    );

    if (postSQLresponse.status === 200) {
      const fireBaseResponse = await UploadImages();
      if (fireBaseResponse === "SUCCESS") {
        alert(`Dog (${data.name}) has been created`);
        closeCallback();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert(
          "dog data submited to MySQL but Pictures could not be uploaded to firebase."
        );
      }
    } else {
      alert(`There was a problem submiting dog, ${data.name}, to MySQL`);
    }
    setData({
      breed: "",
      age: "",
      cost: "",
      name: "",
      description: "",
      saleType: "",
      mainImage: "",
      image1: "",
      image2: "",
      image3: "",
    });
    e.target.reset(); //reset form
  };

  //uploading using firebase, GETS the dog submitted from handleSubmit through API to get the ID and name images accordingly.
  const UploadImages = async () => {
    try {
      //will get the dog that was just submitted because we need the id from it to name the images.
      let mostRecentDog = await GetMostRecentDog();

      if (data.mainImage !== "") {
        const storageRef = ref(
          storage,
          `dogImages/dog-pic-main-${mostRecentDog.id}.jpg`
        );
        await uploadBytes(storageRef, data.mainImage);
        console.log("uploaded");
      }
      if (data.image1 !== "") {
        const storageRef = ref(
          storage,
          `dogImages/dog-pic-image1-${mostRecentDog.id}.jpg`
        );
        await uploadBytes(storageRef, data.image1);
        console.log("uploaded");
      }
      if (data.image2 !== "") {
        const storageRef = ref(
          storage,
          `dogImages/dog-pic-image2-${mostRecentDog.id}.jpg`
        );
        await uploadBytes(storageRef, data.image2);
        console.log("uploaded");
      }
      if (data.image3 !== "") {
        const storageRef = ref(
          storage,
          `dogImages/dog-pic-image3-${mostRecentDog.id}.jpg`
        );
        await uploadBytes(storageRef, data.image3);
        console.log("uploaded");
      }
      return "SUCCESS";
    } catch (error) {
      return "ERROR";
    }
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
        <Modal.Title>Create A New Dog</Modal.Title>
      </Modal.Header>
      <Form className={styles.container} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="name of dog"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            type="number"
            placeholder="age"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBreed">
          <Form.Label>Breed</Form.Label>
          <Form.Control
            name="breed"
            type="text"
            placeholder="Breed"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSaleType">
          <Form.Label>Sale type</Form.Label>
          <DropdownButton
            align="start"
            title={data.saleType ? data.saleType : "Choose Type"}
            id="dropdown-saleType"
          >
            <Dropdown.Item eventKey="1" onClick={handleSaleTypeRentChange}>
              Rent
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={handleSaleTypeBuyChange}>
              Buy
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            name="cost"
            type="number"
            min="1"
            step="any"
            placeholder="$"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMainImage">
          <Form.Label>Main Image</Form.Label>
          <div className={styles.imageGroupContainer}>
            <Form.Control
              name="mainImage"
              type="file"
              accept=".jpg"
              onChange={handleChange}
            />
            {data.mainImage ? (
              <img
                className={styles.image}
                src={URL.createObjectURL(data.mainImage)}
                alt="dogPic"
              />
            ) : null}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImage1">
          <Form.Label>Image 1</Form.Label>
          <div className={styles.imageGroupContainer}>
            <Form.Control
              name="image1"
              type="file"
              accept=".jpg"
              onChange={handleChange}
            />
            {data.image1 ? (
              <img
                className={styles.image}
                src={URL.createObjectURL(data.image1)}
                alt="dogPic1"
              />
            ) : null}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImage2">
          <Form.Label>Image 2</Form.Label>
          <div className={styles.imageGroupContainer}>
            <Form.Control
              name="image2"
              type="file"
              accept=".jpg"
              onChange={handleChange}
            />
            {data.image2 ? (
              <img
                className={styles.image}
                src={URL.createObjectURL(data.image2)}
                alt="dogPic2"
              />
            ) : null}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImage3">
          <Form.Label>Image 3</Form.Label>
          <div className={styles.imageGroupContainer}>
            <Form.Control
              name="image3"
              type="file"
              accept=".jpg"
              onChange={handleChange}
            />
            {data.image3 ? (
              <img
                className={styles.image}
                src={URL.createObjectURL(data.image3)}
                alt="dogPic3"
              />
            ) : null}
          </div>
        </Form.Group>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Post Dog
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddDogModal;
