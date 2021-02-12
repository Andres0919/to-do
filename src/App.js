import { isEmpty, size } from "lodash";
import React, { useState } from "react";
import shortid, { isValid } from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  const validateForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(task)) {
      setError("You must enter a task");
      isValid = false;
    }

    return isValid;
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const editedTask = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editedTask);
    setTask("");
    setEditMode(false);
    setId(null);
  };

  const deleteTask = (id) => {
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  const editTask = ({ id, name }) => {
    setTask(name);
    setEditMode(true);
    setId(id);
  };

  return (
    <div className="container mt-5">
      <h1>To do</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">to do list</h4>
          {size(tasks) === 0 ? (
            <h5 className="text-center text-info">There are no tasks yet</h5>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">{editMode ? "Edit" : "Add"} task</h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter the task"
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            {error && <span className="text-danger d-block mb-2">{error}</span>}
            <button
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
