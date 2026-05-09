import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashBoard from '../features/tasks/Dashboard';
import TaskList from '../features/tasks/TaskList';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <DashBoard />,
            },
            {
                path: '/tasks',
                element: <TaskList />,
            },
        ],
    },
]);
