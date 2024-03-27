import React, { useState } from "react";
import "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const TodoInput = () => {
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    console.log("Task is Added: ", task);
    localStorage.setItem("Task", task);
    setTask("");
  };
  let adddedTask = localStorage.getItem("Task");
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <>
      <div className="container ">
        <div className="row d-flex flex-row align-center text-center justify-content-center fs-3">
          <div className="col-lg-5 col-md-7 col-sm-8 mt-5">
            <div className="todo_ip_block  ">
              <h1 className="above_text text-align-start mt-4">Todo App</h1>
              <div className="todo_content">
                <div className="d-flex gap-3 mb-3">
                  <input
                    className="todo_input "
                    placeholder="Add Your new task here..."
                    value={task}
                    onChange={handleChange}
                  />
                  <div className="">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ color: "#5d5dcb" }}
                      onClick={handleAdd}
                      className="cursorPointer fs-1"
                    />
                  </div>
                </div>
                {/* <ol className="mt-4">{<li className="" style={{color: "#5d5dcb",}}>{<>{adddedTask}</>}</li>}</ol> */}
                <ol>
                  {items.map((itemValue) => {
                    return <li>{itemValue}</li>;
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoInput;
