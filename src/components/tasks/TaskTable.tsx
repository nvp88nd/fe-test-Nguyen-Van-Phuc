import React, { useState } from 'react';
import { Table, Tag, Button, Popconfirm, Select, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import {
    selectFilteredTasks,
    deleteTask,
    deleteManyTasks,
    updateTaskStatus,
    setPage
} from '../../store/tasksSlice';
import type { Task } from '../../types/task.type';

interface TaskTableProps {
    onEdit: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ onEdit }) => {
    const dispatch = useDispatch();
    const allFilteredTasks = useSelector(selectFilteredTasks);
    const pagination = useSelector((state: RootState) => state.tasks.pagination);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const handleBulkDelete = () => {
        dispatch(deleteManyTasks(selectedRowKeys as string[]));
        setSelectedRowKeys([]);
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: Task, b: Task) => a.title.localeCompare(b.title),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: Task['status'], record: Task) => {
                return (
                    <Select
                        value={status}
                        bordered={false}
                        onChange={(newStatus) => dispatch(updateTaskStatus({ id: record.id, status: newStatus }))}
                        className="w-32"
                        options={[
                            { value: 'todo', label: <Tag>Cần làm</Tag> },
                            { value: 'in_progress', label: <Tag color="processing">Đang xử lý</Tag> },
                            { value: 'done', label: <Tag color="success">Hoàn thành</Tag> },
                        ]}
                    />
                );
            },
        },
        {
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
            sorter: (a: Task, b: Task) => {
                const order = { low: 1, medium: 2, high: 3 };
                return order[a.priority] - order[b.priority];
            },
            render: (priority: Task['priority']) => {
                const colors = { high: 'error', medium: 'warning', low: 'success' };
                return <Tag color={colors[priority]}>{priority.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Người được giao',
            dataIndex: 'assignee',
            key: 'assignee',
            render: (text?: string) => text || <span className="text-gray-400">Chưa gán</span>,
        },
        {
            title: 'Hạn chót',
            dataIndex: 'dueDate',
            key: 'dueDate',
            sorter: (a: Task, b: Task) => new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime(),
            render: (date?: string) => date ? new Date(date).toLocaleDateString('vi-VN') : '-',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: Task) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-blue-500"
                        onClick={() => onEdit(record)}
                    />
                    <Popconfirm
                        title="Xóa công việc này?"
                        description="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => dispatch(deleteTask(record.id))}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                <span className="font-medium">
                    Đã chọn: <span className="text-blue-600 font-bold">{selectedRowKeys.length}</span> items
                </span>
                <Button
                    danger
                    disabled={selectedRowKeys.length === 0}
                    onClick={handleBulkDelete}
                >
                    Xóa hàng loạt
                </Button>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={allFilteredTasks}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
                }}
                pagination={{
                    current: pagination.currentPage,
                    pageSize: pagination.pageSize,
                    total: allFilteredTasks.length,
                    showTotal: (total) => `Tổng số ${total} bản ghi`,
                    onChange: (page, pageSize) => dispatch(setPage({ page, pageSize })),
                }}
            />
        </div>
    );
};

export default TaskTable;