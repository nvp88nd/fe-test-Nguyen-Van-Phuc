import React, { useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Task } from '../../types/task.type';
import TaskFilter from '../../components/tasks/TaskFilter';
import TaskTable from '../../components/tasks/TaskTable';
import TaskModal from '../../components/tasks/TaskModal';

const TaskList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
    const [messageApi, contextHolder] = message.useMessage();

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
            {contextHolder}
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

            <TaskModal
                open={isModalOpen}
                onClose={handleCloseModal}
                task={editingTask}
                messageApi={messageApi}
            />
        </div>
    );
};

export default TaskList;