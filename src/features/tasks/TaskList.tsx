import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Task } from '../../types/task.type';
import TaskFilter from '../../components/tasks/TaskFilter';
import TaskTable from '../../components/tasks/TaskTable';

const TaskList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

    const handleOpenAddModal = () => {
        setEditingTask(undefined);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(undefined);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Danh sách công việc</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleOpenAddModal}
                >
                    Thêm mới
                </Button>
            </div>

            <TaskFilter />

            <TaskTable onEdit={handleOpenEditModal} />
        </div>
    );
};

export default TaskList;