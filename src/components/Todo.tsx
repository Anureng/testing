import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../feature/Todo/TodoListSlice';
import { RootState } from '../store';

const Todo = () => {
    const Todo = useSelector((state: RootState) => state.TodoList.tasks)
    const dispatch = useDispatch()

    const AddTask = () => {
        const todo = {
            Id: 1,
            Text: "Anurga",
            Completed: false
        }
        dispatch(addTask(todo))
    }

    const DeleteTodod = (id: number) => {
        dispatch(deleteTask(id))
    }
    return (
        <div>
            <button onClick={AddTask}>AddTask</button>

            {
                Todo.map((el) => (
                    <>
                        <div key={el.Id}>{el.Text}</div>
                        <button onClick={() => DeleteTodod(el.Id)}>Delete</button>
                    </>
                ))
            }
        </div>
    )
}

export default Todo
