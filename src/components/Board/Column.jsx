// const Column=({title,tasks,columnKey,onDelete,onEdit})=> {
//   return (
//     <div className='w-1/3 bg-gray-100 rounded-lg p-4'>
//         <h2 className="font-semibold text-lg mb-4">
//             {title}
//         </h2>
//         <div className='flex flex-col gap-3'>
//             {tasks.map(task=>(
//                 <TaskCard
//                  key={task.id}
//                  task={task} 
//                  columnKey={columnKey} 
//                  onDelete={onDelete}
//                  onEdit={onEdit}
//                 />
//             ))}
//         </div>
//     </div>
//   )
// }
// export default Column;

import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

const Column = ({ title, tasks, columnKey, onDelete, onEdit }) => {
  return (
    <Droppable droppableId={columnKey}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-1/3 bg-gray-100 rounded-lg p-4"
        >
          <h2 className="font-semibold text-lg mb-4">{title}</h2>

          <div className="flex flex-col gap-3">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                columnKey={columnKey}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
