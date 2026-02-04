import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

const priorityColor = {
  low: "bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800",
};

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
          {/* PRIORITY */}
          <span
            className={`px-2 py-1 rounded text-xs mb-1 inline-block ${priorityColor[task.priority || "medium"]
              }`}
          >
            {task.priority || "medium"}
          </span>

          {/* TAGS */}
          <div className="flex gap-1 flex-wrap mb-1">
            {(task.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-200 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

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
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onDelete(task.id, columnKey)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
