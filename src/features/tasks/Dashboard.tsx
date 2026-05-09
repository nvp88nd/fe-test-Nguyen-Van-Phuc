import React from 'react';
import { Card, Statistic, Progress, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { selectTaskStats, selectAllTasks } from '../../store/tasksSlice';
import type { RootState } from '../../store/store';

const Dashboard: React.FC = () => {
    const stats = useSelector((state: RootState) => selectTaskStats(state));
    const allTasks = useSelector((state: RootState) => selectAllTasks(state));

    const recentTasks = [...allTasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const todoPercent = stats.total ? Math.round((stats.todo / stats.total) * 100) : 0;
    const inProgressPercent = stats.total ? Math.round((stats.inProgress / stats.total) * 100) : 0;
    const donePercent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic title="Tổng số Task" value={stats.total} />
                </Card>
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic
                        title="Cần làm (Todo)"
                        value={stats.todo}
                        valueStyle={{ color: '#8c8c8c' }}
                    />
                </Card>
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic
                        title="Đang xử lý (In Progress)"
                        value={stats.inProgress}
                        valueStyle={{ color: '#1677ff' }}
                    />
                </Card>
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic
                        title="Hoàn thành (Done)"
                        value={stats.done}
                        valueStyle={{ color: '#52c41a' }}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Tỷ lệ trạng thái công việc" className="shadow-sm rounded-lg" bordered={false}>
                    <div className="flex flex-col gap-5">
                        <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                                <span>Todo</span>
                                <span>{todoPercent}%</span>
                            </div>
                            <Progress percent={todoPercent} showInfo={false} strokeColor="#8c8c8c" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                                <span>In Progress</span>
                                <span>{inProgressPercent}%</span>
                            </div>
                            <Progress percent={inProgressPercent} showInfo={false} strokeColor="#1677ff" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                                <span>Done</span>
                                <span>{donePercent}%</span>
                            </div>
                            <Progress percent={donePercent} showInfo={false} strokeColor="#52c41a" />
                        </div>
                    </div>
                </Card>

                <Card title="5 Task tạo gần nhất" className="shadow-sm rounded-lg" bordered={false}>
                    <div className="flex flex-col gap-3">
                        {recentTasks.map(task => (
                            <div
                                key={task.id}
                                className="p-3 border rounded-md flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-1">{task.title}</h4>
                                    <span className="text-xs text-gray-400">
                                        {new Date(task.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <div>
                                    {task.status === 'todo' && <Tag>Todo</Tag>}
                                    {task.status === 'in_progress' && <Tag color="processing">In Progress</Tag>}
                                    {task.status === 'done' && <Tag color="success">Done</Tag>}
                                </div>
                            </div>
                        ))}
                        {recentTasks.length === 0 && (
                            <div className="text-center text-gray-400 py-4">Chưa có task nào</div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;