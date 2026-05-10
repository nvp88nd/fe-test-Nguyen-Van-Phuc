import React, { useEffect, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setFilter, resetFilters } from '../../store/tasksSlice';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const TaskFilter: React.FC = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.tasks.filters);

    const [searchValue, setSearchValue] = useState(filters.searchText);

    const handleReset = () => {
        setSearchValue('');
        dispatch(resetFilters());
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-wrap gap-4 items-center">
            <Input
                placeholder="Tìm kiếm theo tiêu đề..."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-64"
                allowClear
            />

            <Select
                mode="multiple"
                placeholder="Lọc trạng thái"
                value={filters.status}
                onChange={(val) => dispatch(setFilter({ status: val }))}
                className="min-w-[180px]"
                options={[
                    { label: 'Cần làm', value: 'todo' },
                    { label: 'Đang xử lý', value: 'in_progress' },
                    { label: 'Hoàn thành', value: 'done' },
                ]}
            />

            <Select
                placeholder="Lọc độ ưu tiên"
                value={filters.priority || null}
                onChange={(val) => dispatch(setFilter({ priority: val }))}
                className="w-40"
                allowClear
                options={[
                    { label: 'Thấp (Low)', value: 'low' },
                    { label: 'Trung bình (Medium)', value: 'medium' },
                    { label: 'Cao (High)', value: 'high' },
                ]}
            />

            <RangePicker
                value={filters.dateRange ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])] : null}
                onChange={(dates) => {
                    if (dates && dates[0] && dates[1]) {
                        dispatch(setFilter({ dateRange: [dates[0].toISOString(), dates[1].toISOString()] }));
                    } else {
                        dispatch(setFilter({ dateRange: undefined }));
                    }
                }}
            />

            <Button icon={<ReloadOutlined />} onClick={handleReset}>
                Reset
            </Button>
        </div>
    );
};

export default TaskFilter;