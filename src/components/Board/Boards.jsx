import { useContext, useState } from 'react'
import Column from './Column'
import { KanbanContext } from '../../contexts/KanbanContext'
import { DragDropContext,} from '@hello-pangea/dnd';

const priorityRank={
  high:1,
  medium:2,
  low:3,
}

const Boards = () => {
  const { state, dispatch } = useContext(KanbanContext);

  // form state for adding new task
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [search,setSearch]=useState("");
  const [priority,setPriority]=useState("medium");
  const [tagsInput,setTagsInput]=useState("");

  // toggling sort on and off according to drag
  const [isDragging,setIsDragging]=useState(false);

  // function to handle adding new task
  const handleAddTask=(e)=>{
    e.preventDefault();

    // Always validate before dispatch.
    if(!title.trim())return ;

    const tagsArray=tagsInput.split(",").map(tag=>tag.trim()).filter(Boolean);
    dispatch({
      // 🔹 Action name matches reducer
      type:"ADD_TASK",
      payload:{
        id:Date.now().toString(),
        title,
        description,
        priority,
        tags:tagsArray,
      },
    });
    // Clear form fields after adding task
    setTitle("");
    setDescription("");
    setTagsInput("");
    setPriority("medium");
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
  // function to handle drag and drop
  const handleDragEnd=(result)=> {
    // console.log(result);
    if(!result.destination)return;
    dispatch({
      type:"MOVE_TASK",
      payload:{
        sourceCol:result.source.droppableId,
        destCol:result.destination.droppableId,
        sourceIndex:result.source.index,
        destIndex:result.destination.index
      },
    });
  }

  // filter tasks and search functionality
  const filterTasks=(tasks)=>{
    return tasks.filter((task)=>task.title.toLowerCase().includes(search.toLowerCase()));
  };

  const sortTasks=(tasks)=>{
    return [...tasks].sort(
      (a,b)=>priorityRank[a.priority||"medium"]-priorityRank[b.priority||"medium"]
    );
  };

  // a function to manually update the task passing 
  const getTasks=(tasks)=>{
    const filtered=filterTasks(tasks);
    return isDragging?filtered:sortTasks(filtered);
  }

  // this return function is rendering the columns and tasks on the board 
  return (
    <DragDropContext
      onDragStart={()=>setIsDragging(true)}
      onDragEnd={(result)=>{
        setIsDragging(false);
        handleDragEnd(result);
      }}> 
     <div className="p-6">
      {/* search bar */}
      <input placeholder='search tasks' value={search} onChange={(e)=>setSearch(e.target.value)}
          className="border px-3 py-2 rounded mb-4 w-1/3"/>

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

        <input 
          value={tagsInput} 
          onChange={(e)=>setTagsInput(e.target.value)}
          placeholder='tags'
          className='border px-3 py-2 rounded w-1/4'
        />

        <select value={priority} onChange={(e)=>setPriority(e.target.value)}className="border px-3 py-2 rounded">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Task
        </button>
      </form>
      {/* delete task and edit task */}
      <div className="flex gap-6">
        <Column
          title="Todo"
          columnKey="todo"
          tasks={getTasks(state.columns.todo)}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
        <Column
          title="In Progress"
          columnKey="inProgress"
          tasks={getTasks(state.columns.inProgress)}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />

        <Column
          title="Done"
          columnKey="done"
          tasks={sortTasks(filterTasks(state.columns.done))}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  </DragDropContext>
  )
}

export default Boards;