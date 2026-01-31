import { useState } from "react";

const TaskCard = ({ task, columnKey, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    if (!title.trim()) return;

    onEdit(task.id, columnKey, title, description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-md p-3 shadow-sm">
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

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-2 py-1 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-3 shadow-sm flex justify-between items-start">
      <div>
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-500 font-bold"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id, columnKey)}
          className="text-red-500 font-bold"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
