import React, { useState } from "react";
import "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./ToDoLists";
import ToDoLists from "./ToDoLists";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoInput = (props) => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleAdd = () => {
    if (task.trim() !== "") {
      console.log("Task is Added: ", task);
      setList((oldItem) => {
        return [...oldItem, task];
      });
      localStorage.setItem("Task", [...list, setTask]);
      setTask("");
    } else {
      console.log("please enter a task first");
      toast.error("please enter a non-empty task");
    }
  };

  const handleRemove = (id) => {
    console.log("Task is deleted");
    setList((oldItem) => {
      return oldItem.filter((itemValue, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
      <ToastContainer />
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
                      className="cursorPointer addbtn fs-1"
                    />
                  </div>
                </div>
                <div>
                  <ol>
                    {list.map((itemValue, index) => {
                      return (
                        <ToDoLists
                          text={itemValue}
                          delete={handleRemove}
                          key={index}
                          id={index}
                        />
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoInput;
