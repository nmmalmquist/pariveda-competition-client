import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteItemModal = ({visible, callbackClose, DeleteItem}) => {
  return (
      <Modal
        show={visible}
        onHide={callbackClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callbackClose}>
            Close
          </Button>
          <Button variant="danger" onClick={DeleteItem}>Delete</Button>
        </Modal.Footer>
      </Modal>
  );
}
 
export default DeleteItemModal;