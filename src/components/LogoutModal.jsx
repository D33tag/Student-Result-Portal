import { Modal, Button } from 'react-bootstrap'

function LogoutModal({ show, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>No</Button>
        <Button variant="danger" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LogoutModal
