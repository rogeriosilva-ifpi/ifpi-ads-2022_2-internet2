import { useCallback, useEffect } from "react"
import { useTasks, useTasksDispatch } from "../../hooks/tasks_context"
import { Task } from "../../models/models"
import { ActionType } from "../../reducers/tasks_reducer"
import { DeleteTaskAction, GetAllTasksAction } from "../../reducers/task_actions"
import { TaskItem } from "./item_task"


export function TaskList(){

    const tasks = useTasks()
    const dispatch = useTasksDispatch()

    useEffect(()=>{
      GetAllTasksAction(dispatch)
    }, [])

    function handlerChangeTask(task: Task) {
        dispatch({
          type: ActionType.Changed,
          args: {task}
        })
      }
    
      const handlerDeleteTask = useCallback((id: number) => {
        DeleteTaskAction(dispatch, id)
      }, [])

    return (
        <>
            <ul>
                {tasks.map(task => (
                   <TaskItem key={task.id} 
                        task={task} 
                        onChangeTask={handlerChangeTask} 
                        onDeleteTask={handlerDeleteTask} />
                ))}
            </ul>
        </>
    )
}
