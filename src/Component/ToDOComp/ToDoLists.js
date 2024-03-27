import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const ToDoLists = (props) => {
  return (
    <>
      <div className="d-flex flex-row py-2">
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{ color: "#5d5dcb" }}
          className="fs-2 cursorPointer closebtn me-2"
          onClick={() => props.delete(props.id)}
        />
        <li style={{ color: "#5d5dcb" }} className="">
          {props.text}
        </li>
      </div>
    </>
  );
};

export default ToDoLists;
