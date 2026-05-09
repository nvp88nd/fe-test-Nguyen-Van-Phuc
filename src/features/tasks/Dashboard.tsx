import React from 'react';
import { Card, Statistic, Progress, Tag } from 'antd';

const Dashboard: React.FC = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic title="Tổng số Task" value={0} />
                </Card>
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic
                        title="Cần làm (Todo)"
                        value={0}
                        valueStyle={{ color: '#8c8c8c' }}
                    />
                </Card>
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic
                        title="Đang xử lý (In Progress)"
                        value={0}
                        valueStyle={{ color: '#1677ff' }}
                    />
                </Card>
                <Card className="shadow-sm rounded-lg" bordered={false}>
                    <Statistic
                        title="Hoàn thành (Done)"
                        value={0}
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
                                <span>{0}%</span>
                            </div>
                            <Progress percent={0} showInfo={false} strokeColor="#8c8c8c" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                                <span>In Progress</span>
                                <span>{0}%</span>
                            </div>
                            <Progress percent={0} showInfo={false} strokeColor="#1677ff" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
                                <span>Done</span>
                                <span>{0}%</span>
                            </div>
                            <Progress percent={0} showInfo={false} strokeColor="#52c41a" />
                        </div>
                    </div>
                </Card>

                <Card title="5 Task tạo gần nhất" className="shadow-sm rounded-lg" bordered={false}>
                    <div className="flex flex-col gap-3">

                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;