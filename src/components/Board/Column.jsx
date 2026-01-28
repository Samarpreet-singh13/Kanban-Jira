import React from 'react'
import TaskCard from './TaskCard'

const Column=({title,tasks})=> {
  return (
    <div className='w-1/3 bg-gray-100 rounded-lg p-4'>
        <h2 className="font-semibold text-lg mb-4">
            {title}
        </h2>
        <div className='flex flex-col gap-3'>
            {tasks.map(task=>(
                <TaskCard key={task.id} task={task}/>
            ))}
        </div>
    </div>
  )
}

export default Column;