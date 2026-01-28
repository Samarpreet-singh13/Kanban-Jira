import React from 'react'

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-md p-3 shadow-sm">
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskCard;
