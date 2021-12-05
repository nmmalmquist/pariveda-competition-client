import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminAddButton from "../components/AdminAddButton";
import {useHistory} from "react-router-dom";

import styles from "../css/AdminHome.module.css";
import ShoppingCartListItem from "../components/ShoppingCartListItem";
import { GetAllDogs, DeleteDog } from "../crud/crudDogs";
import UserListItem from "../components/UserListItem";
import { GetAllCustomers, DeleteCustomer } from "../crud/crudCustomers";
import { GetAllAdmins, DeleteAdmin } from "../crud/crudAdmins";
import DeleteItemModal from "../components/DeleteItemModal";
import AddAdminModal from "../components/AddAdminModal";
import AddDogModal from "../components/AddDogModal";

const AdminHome = () => {
  const [dogs, setDogs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showAddDogModal, setShowAddDogModal] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const history = useHistory();
  let maxDogId = 0;

  //Checks to see if an admin is logged in or not everytime a re-render happens. If not, then it will kick out of admin page
  const adminUser = JSON.parse(sessionStorage.getItem("admin"))
  if (adminUser === null || adminUser["email"] === "")
  {
    history.push("/loginAdmin")
  }


  //gets called on first render b/c of the empty []
  useEffect(() => {
    loadDogs();
    loadUsers();
  }, []);

  const loadDogs = async () => {
    const data = await GetAllDogs(); //method that actual calls to the api
    setDogs(data);
  };
  const loadUsers = async () => {
    const customers = await GetAllCustomers(); //method that actual calls to the api
    setCustomers(customers);
    const admins = await GetAllAdmins(); //method that actual calls to the api
    setAdmins(admins);
  };

  //Will be run every time screen re-renders, and will give the undeleted items
  const nonDeletedDogsForSale = dogs.filter(
    (item) => item.deleted === false && item.saleType === "Buy"
  );
  const nonDeletedDogsForRent = dogs.filter(
    (item) => item.deleted === false && item.saleType === "Rent"
  );
  const nonDeletedCustomers = customers.filter(
    (item) => item.deleted === false
  );
  const nonDeletedAdmins = admins.filter((item) => item.deleted === false);

  const handleAskToDeleteDog = (dog) => {
    setShowDeleteAlert(true);
    setActiveItem({...dog, table: "dogs"});
  }
  const handleAskToDeleteCustomer = (customer) => {
    setShowDeleteAlert(true);
    setActiveItem({...customer, table: "customers"});
  }
  const handleAskToDeleteAdmin = (admin) => {
    setShowDeleteAlert(true);
    setActiveItem({...admin, table: "admins"});
  }

  const CloseDeleteItemModal = () => {
    setShowDeleteAlert(false)
    setActiveItem({})
  }

  const handleActualDeleteItem = () =>{
    if(activeItem.table === "dogs"){
      DeleteDog(activeItem.id)
    }
    else if (activeItem.table === "customers")
    {
      DeleteCustomer(activeItem.id)
    }
    else if (activeItem.table === "admins")
    {
      DeleteAdmin(activeItem.id)
    }
    setShowDeleteAlert(false);
    setActiveItem({})
    setTimeout(()=>{window.location.reload()}, 1000)
  }

  const handleAddCustomer = () => {
    history.push("/create")
  }
  const handleAddAdmin = () => {
    setShowAddAdminModal(true)
  }

  const handleCloseAddAdminModal = () =>{
    setShowAddAdminModal(false)
  }
  const handleCloseAddDogModal = () =>{
    setShowAddDogModal(false)
  }
  const handleShowAddDogModal = () =>{
    setShowAddDogModal(true)
  }

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Master Editing Page</h1>
        <Row>
          <Col xs={6} className={styles.column}>
            <div className={styles.addButton}>
              <AdminAddButton text="+Add Dog" onClick={handleShowAddDogModal}/>
            </div>
          </Col>
          <Col xs={3} className={styles.addButton}>
            <div className={styles.addButton}>
              <AdminAddButton text="+Add Customer" onClick={handleAddCustomer}/>
            </div>
          </Col>
          <Col xs={3} className={styles.addButton}>
            <div className={styles.addButton}>
              <AdminAddButton text="+Add Admin" onClick={handleAddAdmin}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.headers}>Puppies for Sale</Col>
          <Col className={styles.headers}>Dogs for Rent</Col>
          <Col className={styles.headers}>Active Customer Users</Col>
          <Col className={styles.headers}>Admin Users</Col>
        </Row>
        <Row>
          <Col className={styles.List}>
            {nonDeletedDogsForSale.map((dog) => (
              <div className={styles.listItemContainer}>
                <ShoppingCartListItem dog={dog} onClickX={handleAskToDeleteDog} />
              </div>
            ))}
          </Col>
          <Col className={styles.List}>
            {nonDeletedDogsForRent.map((dog) => (
              <div className={styles.listItemContainer}>
                <ShoppingCartListItem dog={dog} onClickX={handleAskToDeleteDog}/>
              </div>
            ))}
          </Col>
          <Col className={styles.List}>
            {nonDeletedCustomers.map((user) => (
              <div className={styles.listItemContainer}>
                <UserListItem onClickX={handleAskToDeleteCustomer} user={user}  />
              </div>
            ))}
          </Col>
          <Col className={styles.List}>
            {nonDeletedAdmins.map((user) => (
              <div className={styles.listItemContainer}>
                <UserListItem onClickX={handleAskToDeleteAdmin} user={user}  />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <DeleteItemModal visible={showDeleteAlert} callbackClose={CloseDeleteItemModal} DeleteItem={handleActualDeleteItem}/>
      <AddAdminModal visible={showAddAdminModal} closeCallback={handleCloseAddAdminModal}/>
      <AddDogModal visible={showAddDogModal} closeCallback={handleCloseAddDogModal} maxId={maxDogId}/>
    </section>
  );
};

export default AdminHome;
