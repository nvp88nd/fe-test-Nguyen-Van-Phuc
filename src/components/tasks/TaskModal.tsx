import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../store/tasksSlice';
import type { Task } from '../../types/task.type';
import dayjs from 'dayjs';

interface TaskModalProps {
    open: boolean;
    onClose: () => void;
    task?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, task }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            if (task) {
                form.setFieldsValue({
                    ...task,
                    dueDate: task.dueDate ? dayjs(task.dueDate) : undefined,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({
                    status: 'todo',
                    priority: 'medium',
                });
            }
        }
    }, [open, task, form]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const formattedData: Task = {
                ...values,
                id: task ? task.id : `TASK-NEW-${Date.now()}`,
                createdAt: task ? task.createdAt : new Date().toISOString(),
                dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
            };

            if (task) {
                dispatch(updateTask(formattedData));
            } else {
                dispatch(addTask(formattedData));
            }

            onClose();
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
            title={task ? "Chỉnh sửa công việc" : "Thêm mới công việc"}
            open={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okText={task ? "Cập nhật" : "Tạo mới"}
            cancelText="Hủy"
            width={600}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                name="task_form"
            >
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề công việc!' }]}
                >
                    <Input placeholder="Nhập tiêu đề..." />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <Input.TextArea rows={3} placeholder="Nhập mô tả chi tiết (tuỳ chọn)..." />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select>
                            <Select.Option value="todo">Cần làm (Todo)</Select.Option>
                            <Select.Option value="in_progress">Đang xử lý (In Progress)</Select.Option>
                            <Select.Option value="done">Hoàn thành (Done)</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="priority"
                        label="Độ ưu tiên"
                        rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
                    >
                        <Select>
                            <Select.Option value="low">Thấp</Select.Option>
                            <Select.Option value="medium">Trung bình</Select.Option>
                            <Select.Option value="high">Cao</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="assignee"
                        label="Người được giao"
                    >
                        <Input placeholder="Tên người thực hiện..." />
                    </Form.Item>

                    <Form.Item
                        name="dueDate"
                        label="Hạn chót"
                    >
                        <DatePicker className="w-full" format="DD/MM/YYYY" placeholder="Chọn ngày..." />
                    </Form.Item>
                </div>

                <Form.Item
                    name="tags"
                    label="Tags (Nhãn)"
                >
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Nhập và ấn Enter để thêm tag"
                        tokenSeparators={[',']}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskModal;