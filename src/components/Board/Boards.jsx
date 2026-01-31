import { useContext, useState } from 'react'
import Column from './Column'
import { KanbanContext } from '../../contexts/KanbanContext'


const Boards = () => {
  const { state, dispatch } = useContext(KanbanContext);

  // form state for adding new task
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  // function to handle adding new task
  const handleAddTask=(e)=>{
    e.preventDefault();

    // Always validate before dispatch.
    if(!title.trim())return ;
    dispatch({
      // 🔹 Action name matches reducer
      type:"ADD_TASK",
      payload:{
        id:Date.now().toString(),
        title,
        description
      },
    });
    // Clear form fields after adding task
    setTitle("");
    setDescription("");

  };
  const handleDeleteTask=(id,column)=>{
    dispatch({
      type:"DELETE_TASK",
      payload:{id,column}
    });
  }
  const handleEditTask=(id, column, title, description)=>{
    dispatch({
      type:"EDIT_TASK",
      payload:{id,column,title,description}
    });
  }
  // this return function is rendering the columns and tasks on the board 
  return (
     <div className="p-6">
      {/* adding task */}
      <form onSubmit={handleAddTask} className="mb-6 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border px-3 py-2 rounded w-1/3"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border px-3 py-2 rounded w-1/3"
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Task
        </button>
      </form>
      {/* delete task and edit task */}
      <div className="flex gap-6">
        <Column
          title="Todo"
          columnKey="todo"
          tasks={state.columns.todo}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
        <Column
          title="In Progress"
          columnKey="inProgress"
          tasks={state.columns.inProgress}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />

        <Column
          title="Done"
          columnKey="done"
          tasks={state.columns.done}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  )
}

export default Boards