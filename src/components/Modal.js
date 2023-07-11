const Modal = ({ children, state }) => {
  if (state) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "visible";
  }
  return (
    state && (
      <div className="modal-backdrop">
        <div className="modal">{children}</div>
      </div>
    )
  );
};

export default Modal;
