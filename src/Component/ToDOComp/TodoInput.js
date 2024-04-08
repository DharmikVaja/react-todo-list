import React, { useEffect, useState } from "react";
import "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./ToDoLists";
import ToDoLists from "./ToDoLists";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdManageSearch } from "react-icons/md";
import { TbTrashXFilled } from "react-icons/tb";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const TodoInput = (props) => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchedTask, setSearchedTask] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setList(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAdd = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: task,
      };
      setList((oldList) => [...oldList, newTask]);
      setTask("");
    } else {
      toast.error("Please enter a non-empty task");
    }
  };

  const handleUpdateTask = (id) => {
    const updatedText = document.getElementById("updateTaskInput").value.trim();

    if (updatedText !== "") {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));

      const updatedTasks = storedTasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: updatedText };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setList(updatedTasks);

      handleClose2();
    } else {
      toast.error("Please enter a non-empty task");
    }
  };

  const handleRemove = (id) => {
    setList((oldList) => oldList.filter((task) => task.id !== id));
  };
  //

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleUpdate = () => {
    handleShow2();
  };
  //

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleSearchTask = (e) => {
    setSearchedTask(e.target.value);
  };
  const handleRemoveAll = () => {
    setModalShow(false);
    setTask("");
    setList([]);
    localStorage.removeItem("tasks");
    toast("All tasks have been removed successfully!");
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row d-flex flex-row align-center text-center justify-content-center fs-3">
          <div className="col-lg-5 col-md-7 col-sm-8 mt-5">
            <div className="todo_ip_block">
              <h1 className="above_text text-align-start mt-4">Todo App</h1>
              <div className="todo_content">
                <div className="d-flex flex-row pb-3 ">
                  <MdManageSearch
                    icon={faCirclePlus}
                    style={{ color: "#5d5dcb" }}
                    onClick={handleSearch}
                    className="cursorPointer searchbtn fs-3 me-2"
                  />
                  {showSearch ? (
                    <>
                      <input
                        placeholder="search tasks"
                        aria-label="Small"
                        onChange={handleSearchTask}
                        aria-describedby="inputGroup-sizing-sm "
                        className="fs-6 w-50 rounded-1 search_input px-2 form-control"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="d-flex ms-auto">
                    <span className="clear_all pe-2 d-flex">
                      <TbTrashXFilled
                        className="ms-auto fs-4 cursorPointer remove_all"
                        style={{ color: "rgb(218, 47, 47)" }}
                        onClick={() => setModalShow(true)}
                      />
                    </span>
                    {/* REMOVE ALL */}
                    <Modal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      size="sm"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title
                          id="contained-modal-title-vcenter"
                          className="fs-6"
                        >
                          Do you want to remove all the tasks??
                        </Modal.Title>
                      </Modal.Header>

                      <Modal.Footer>
                        <Button onClick={handleRemoveAll} variant="danger">
                          Remove
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/*  */}
                    <Modal
                      show={show2}
                      onHide={handleClose2}
                      className="update_modal"
                      size="sm"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <Form.Control
                              type="email"
                              id="updateTaskInput"
                              placeholder="Update the task:"
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                          cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleUpdateTask(task.id)}
                        >
                          Save Task
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/*  */}
                  </div>
                </div>
                <div className="d-flex gap-3 mb-3 form-floating align-items-center">
                  <input
                    className="form-control todo_input"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={task}
                    onChange={handleChange}
                  />
                  <label for="floatingInput fs-4">
                    Add Your new task here...
                  </label>

                  <div className="">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ color: "#5d5dcb" }}
                      onClick={handleAdd}
                      className="cursorPointer addbtn fs-1"
                    />
                  </div>
                </div>
                {/*  */}
                <div className="todo_lists_content">
                  <ol>
                    {list
                      .filter((task) => {
                        return searchedTask.toLowerCase() === ""
                          ? task
                          : task.text.toLowerCase().includes(searchedTask);
                      })

                      .map((task) => (
                        <ToDoLists
                          key={task.id}
                          id={task.id}
                          text={task.text}
                          delete={handleRemove}
                          update={handleUpdate}
                        />
                      ))}
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
