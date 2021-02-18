import { isEmpty } from "lodash";
import React, { useState, useEffect } from "react";
import {
  addDocument,
  deleteDocument,
  getColletion,
  updateDocument,
} from "./actions";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getColletion("task");
      if (result.statusResponse) {
        setTasks(result.data);
      }
    })();
  }, []);

  const validateForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(task)) {
      setError("You must enter a task");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const result = await addDocument("task", { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const newTask = {
      id: result.data.id,
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const saveTask = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const result = await updateDocument("task", id, { name: task });
    if (!result.statusResponse) {
      setError(result.error);
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

  const deleteTask = async (id) => {
    const result = await deleteDocument("task", id);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

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
          <ToDoList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
        </div>
        <div className="col-4">
          <ToDoForm
            editMode={editMode}
            saveTask={saveTask}
            addTask={addTask}
            setTask={setTask}
            task={task}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
