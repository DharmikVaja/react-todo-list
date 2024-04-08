import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

const ToDoLists = (props) => {
  return (
    <>
      <div className="d-flex flex-row py-2 align-items-center ">
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{ color: "#5d5dcb" }}
          className="fs-2 cursorPointer closebtn me-2"
          onClick={() => props.delete(props.id)}
        />
        <li style={{ color: "#5d5dcb" }} className="">
          {props.text}
        </li>
        {/* <FontAwesomeIcon
          icon={faPenToSquare}
          className="fs-3 cursorPointer updatebtn ms-2"
          style={{ color: "#5d5dcb" }}
          onClick={() => props.update(props.id)}
        /> */}
      </div>
    </>
  );
};

export default ToDoLists;
