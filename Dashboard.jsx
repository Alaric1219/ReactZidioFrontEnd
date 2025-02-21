import React, { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [taskComment, setTaskComment] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newComment, setNewComment] = useState("");

  const addTask = () => {
    if (taskName.trim() === "" || dueDate === "") return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      dueDate,
      priority,
      completed: false,
      comment: taskComment,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setDueDate("");
    setPriority("Medium");
    setTaskComment("");
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEditingComment = (taskId, currentComment) => {
    setEditingTaskId(taskId);
    setNewComment(currentComment || "");
  };

  const updateComment = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, comment: newComment } : task
    ));
    setEditingTaskId(null);
    setNewComment("");
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-4 px-8 fixed w-full shadow-lg">
        <h1 className="text-3xl font-bold tracking-wider text-center">
          Task Management Dashboard
        </h1>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-6 min-h-screen w-full bg-gray-900">
        {/* Task Input Section */}
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
          
          <input 
            type="text" 
            placeholder="Task Name" 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <div className="flex justify-between mt-4">
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-1/2 p-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-1/2 ml-2 p-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="High">🔥 High</option>
              <option value="Medium">⚡ Medium</option>
              <option value="Low">💧 Low</option>
            </select>
          </div>

          {/* Comment Input */}
          <textarea
            placeholder="Add a comment (optional)"
            value={taskComment}
            onChange={(e) => setTaskComment(e.target.value)}
            className="w-full mt-4 p-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          
          <button 
            onClick={addTask} 
            className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="mt-8 w-full max-w-3xl overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks added yet.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg shadow-lg flex flex-col transition-all duration-300 ${
                    task.completed ? "bg-green-700" : "bg-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{task.name}</h3>
                      <p className="text-sm text-gray-300">Due: {task.dueDate}</p>
                      <p className="text-sm font-semibold">
                        Priority: 
                        <span className={`ml-2 ${
                          task.priority === "High" ? "text-red-400" 
                          : task.priority === "Medium" ? "text-yellow-400" 
                          : "text-green-400"
                        }`}>
                          {task.priority}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Editable Comment Section */}
                  {editingTaskId === task.id ? (
                    <div className="mt-2">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      ></textarea>
                      <button
                        onClick={() => updateComment(task.id)}
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
                      >
                        Save Comment
                      </button>
                    </div>
                  ) : (
                    <p 
                      className="mt-2 text-sm italic text-gray-300 bg-gray-700 p-2 rounded-md cursor-pointer"
                      onClick={() => startEditingComment(task.id, task.comment)}
                    >
                      💬 {task.comment || "Click to add a comment"}
                    </p>
                  )}

                  <div className="flex justify-end space-x-4 mt-3">
                    <button 
                      onClick={() => toggleComplete(task.id)} 
                      className={`px-4 py-2 rounded-lg text-white font-bold ${
                        task.completed ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {task.completed ? "Undo" : "✔ Done"}
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)} 
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
