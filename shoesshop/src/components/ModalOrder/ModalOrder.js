import { Modal, Button } from "react-bootstrap";
import { useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { useState } from "react";
function ModalOrder(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
        }}
      >
        {props.icon}
      </Button>
      <Modal size={props.size} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalOrder;
