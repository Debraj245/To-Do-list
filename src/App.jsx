import { useState } from "react";
import Navbar from "./component/Navbar";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const handleAdd = () => {
    const trimmed = todo.trim();
    if (trimmed === "") return;
    setTodos([...todos, { id: uuidv4(), todo: trimmed, isCompleted: false }]);
    setTodo("");
  };

  const handleEdit = (index) => {
    const newTodo = prompt("Edit todo:", todos[index].todo);
    if (newTodo !== null && newTodo.trim() !== "") {
      const updated = [...todos];
      updated[index].todo = newTodo.trim();
      setTodos(updated);
    }
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const handleToggle = (index) => {
    const updated = [...todos];
    updated[index].isCompleted = !updated[index].isCompleted;
    setTodos(updated);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleShowFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-bright bg-rose-600 min-h-[80vh] w-1/2">
      <h1 className="font-semibold text-white text-center tetx-xl">iTask -manage your todos at one place</h1>
        <div className="addTodo my-5 space-y-2">
          <h2 className="text-white text-lg font-bold">Add Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full border border-gray-800 p-1 rounded-full"
          />
          <button
            onClick={handleAdd}
            className=" bg-blue-500 hover:bg-sky-500 p-2 py-1 text-sm font-bold text-white rounded-full w-full"
          >
            Add
          </button>
        </div>

        <h2 className="text-white text-lg font-bold">Your Todos</h2>
        <div className="todos space-y-2">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={handleShowFinished}
              id="showFinished"
            />
            <label htmlFor="showFinished" className="text-white text-sm font-medium">
              Show Finished
            </label>
            <div className="h-[1px] bg-black opacity-65"></div>
          </div>

          {todos.length === 0 && <div className="text-white m-5">No Todos To Show</div>}
          {todos
            .filter((item) => showFinished || !item.isCompleted)
            .map((item, index) => (
              <div
                key={item.id}
                className="todo flex items-center justify-between bg-white p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(index)}
                  className="mr-2"
                />
                <div
                  className={`cursor-pointer flex-1 ${
                    item.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  {item.todo}
                </div>
                <div className="buttons flex">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                   <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 hover:bg-red-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
