import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types/task.type';
import type { RootState } from './store';
import { mockTasks } from '../utils/mockData';

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
    items: mockTasks,
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
        addTask: (state, action: PayloadAction<Task>) => {
            state.items.unshift(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.items.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.items[index] = action.payload;
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        deleteManyTasks: (state, action: PayloadAction<string[]>) => {
            state.items = state.items.filter(t => !action.payload.includes(t.id));
        },
        updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
            const task = state.items.find(t => t.id === action.payload.id);
            if (task) task.status = action.payload.status;
        },
        setFilter: (state, action: PayloadAction<Partial<TasksState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.currentPage = 1;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.pagination.currentPage = 1;
        },
        setPage: (state, action: PayloadAction<{ page: number; pageSize?: number }>) => {
            state.pagination.currentPage = action.payload.page;
            if (action.payload.pageSize) state.pagination.pageSize = action.payload.pageSize;
        },
    },
});

export const {
    addTask,
    updateTask,
    deleteTask,
    deleteManyTasks,
    updateTaskStatus,
    setFilter,
    resetFilters,
    setPage,
} = tasksSlice.actions;

export default tasksSlice.reducer;

const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.items
);
export const selectFilteredTasks = createSelector(
    [selectAllTasks, (state: RootState) => state.tasks.filters],
    (tasks, filters) => {
        return tasks.filter((task) => {
            const matchSearch = task.title.toLowerCase().includes(filters.searchText.toLowerCase());
            const matchStatus = filters.status.length === 0 || filters.status.includes(task.status);
            const matchPriority = !filters.priority || task.priority === filters.priority;

            let matchDate = true;
            if (filters.dateRange && task.dueDate) {
                const taskDate = new Date(task.dueDate).getTime();
                const startDate = new Date(filters.dateRange[0]).getTime();
                const endDate = new Date(filters.dateRange[1]).getTime();
                matchDate = taskDate >= startDate && taskDate <= endDate;
            }

            return matchSearch && matchStatus && matchPriority && matchDate;
        });
    }
);

export const selectPaginatedTasks = createSelector(
    [selectFilteredTasks, (state: RootState) => state.tasks.pagination],
    (filteredTasks, pagination) => {
        const { currentPage, pageSize } = pagination;
        const startIndex = (currentPage - 1) * pageSize;
        return {
            data: filteredTasks.slice(startIndex, startIndex + pageSize),
            total: filteredTasks.length,
        };
    }
);

export const selectTaskStats = createSelector(
    [selectAllTasks],
    (tasks) => {
        return tasks.reduce(
            (acc, task) => {
                acc.total++;
                if (task.status === 'todo') acc.todo++;
                else if (task.status === 'in_progress') acc.inProgress++;
                else if (task.status === 'done') acc.done++;
                return acc;
            },
            { total: 0, todo: 0, inProgress: 0, done: 0 }
        );
    }
);