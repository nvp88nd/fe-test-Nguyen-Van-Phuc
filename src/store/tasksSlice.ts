import { createSlice } from '@reduxjs/toolkit';
import type { Task } from '../types/task.type';

interface TasksState {
    items: Task[];
    filters: {
        searchText: string;
        status: string[];
        priority?: string;
        dateRange?: [string, string];
    };
    pagination: {
        currentPage: number;
        pageSize: number;
    };
}

const initialState: TasksState = {
    items: [],
    filters: {
        searchText: '',
        status: [],
    },
    pagination: {
        currentPage: 1,
        pageSize: 10,
    },
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // thêm các actions (addTask, updateTask...) vào đây sau
    },
});

export default tasksSlice.reducer;