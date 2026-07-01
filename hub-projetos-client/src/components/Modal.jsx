import "./Modal.css";

function Modal({ titulo, onClose, children }) {
  return (
    <div id="modal-overlay">
      <div id="modal">
        <h2>{titulo}</h2>
        {children}
        </div>
    </div>
  );
}

export default Modal;