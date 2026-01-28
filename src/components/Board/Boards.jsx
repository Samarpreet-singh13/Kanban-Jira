import {useContext} from 'react'
import Column from './Column'
import { KanbanContext } from '../../contexts/KanbanContext'


const Boards=()=> {
  const {state}=useContext(KanbanContext);
  return (
    <div className='flex gap-6 p-6'> 
        <Column title="Todo" tasks={state.columns.todo}/>
        <Column title="InProgress" tasks={state.columns.inProgress}/>
        <Column title="Done" tasks={state.columns.done}/>
    </div>
  )
}

export default Boards