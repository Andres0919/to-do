import { size } from "lodash";

const ToDoList = (props) => {
  const { tasks, deleteTask, editTask } = props;
  return (
    <>
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
    </>
  );
};

export default ToDoList;
