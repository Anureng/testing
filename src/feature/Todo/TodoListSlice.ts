import { createSlice } from '@reduxjs/toolkit';

export interface TASK {
    Id: number,
    Text: string,
    Completed: boolean
}

export interface ToDoListState {
    tasks: TASK[]
}

export const initialState: ToDoListState = {
    tasks: []
}

export const todoListSlice = createSlice({
    name: "TodoList",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.Id !== action.payload)
        }
    }
})

export const { addTask, deleteTask } = todoListSlice.actions;

export default todoListSlice.reducer