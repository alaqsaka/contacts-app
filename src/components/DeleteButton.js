import React from "react";
import PropTypes from "prop-types";
import { RiDeleteBin2Line } from "react-icons/ri";

function DeleteButton({ id, onDelete }) {
  return (
    <button className="contact-item__delete" onClick={() => onDelete(id)}>
      <RiDeleteBin2Line />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
