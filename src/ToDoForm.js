const ToDoForm = (props) => {
  const { editMode, saveTask, addTask, setTask, task, error } = props;
  return (
    <>
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
            editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"
          }
          type="submit"
        >
          {editMode ? "Edit" : "Add"}
        </button>
      </form>
    </>
  );
};

export default ToDoForm;
