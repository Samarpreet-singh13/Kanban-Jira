import React from 'react'
import Column from './Column'
import { mockBoardData } from '../../data/mockData'

const Boards=()=> {
  return (
    <div className='flex gap-6 p-6'> 
        <Column title="Todo" tasks={mockBoardData.Todo}/>
        <Column title="InProgress" tasks={mockBoardData.InProgress}/>
        <Column title="Done" tasks={mockBoardData.Done}/>
    </div>
  )
}

export default Boards