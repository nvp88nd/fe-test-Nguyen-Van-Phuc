import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { DashboardOutlined, MenuUnfoldOutlined, OrderedListOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const siderWidth = 260;
    const collapsedWidth = 60;

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/tasks',
            icon: <OrderedListOutlined />,
            label: 'Danh sách Task',
        },
    ];

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={siderWidth}
                collapsedWidth={collapsedWidth}
                className="fixed left-0 top-0 bottom-0 z-50 border-r border-slate-100 shadow-sm overflow-auto"
            >
                <div className="h-8 m-4 bg-white/20 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                        {collapsed ? 'T' : 'TASKBOARD'}
                    </span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>

            <Layout
                style={{
                    marginLeft: collapsed ? collapsedWidth : siderWidth,
                    transition: 'all 0.2s',
                    minHeight: '100vh',
                }}
                className="bg-slate-50"
            >
                <Header className="sticky top-0 z-40 bg-white p-0 h-16 flex items-center justify-between px-6 border-b border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-lg w-10 h-10 flex items-center justify-center"
                        />
                        <h2 className="text-lg font-semibold m-0">Hệ thống quản lý công việc nội bộ</h2>
                    </div>
                </Header>

                <Content className="p-6 md:p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;