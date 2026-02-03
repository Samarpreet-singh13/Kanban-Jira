import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

const priorityColors={
  low:"bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800",
}

const TaskCard = ({ task, columnKey, onDelete, onEdit, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task.id, columnKey, title, description);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 shadow-sm"
        >
          {isEditing ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-2 py-1 w-full mb-2"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border px-2 py-1 w-full mb-2"
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <span className={`px-2 py-1 rounded text-xs mb-1 inline-block ${priorityColors[task.priority || "medium"]}`}>
                {task.priority || "medium"}
              </span>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDelete(task.id, columnKey)}>Delete</button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
