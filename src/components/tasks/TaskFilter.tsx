import React, { useEffect, useRef, useState } from 'react';
import { Input, Select, DatePicker, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setFilter, resetFilters } from '../../store/tasksSlice';
import { useDebounce } from '../../hooks/useDebounce';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

const { RangePicker } = DatePicker;

const TaskFilter: React.FC = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.tasks.filters);
    const [searchParams, setSearchParams] = useSearchParams();
    const isFirstRender = useRef(true);

    const [searchValue, setSearchValue] = useState(filters.searchText);
    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        const searchText = searchParams.get('search') || '';
        const priority = searchParams.get('priority') || undefined;
        const status = searchParams.get('status') ? searchParams.get('status')?.split(',') : [];

        dispatch(setFilter({ searchText, priority, status }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const params = new URLSearchParams();
        if (filters.searchText) params.set('search', filters.searchText);
        if (filters.priority) params.set('priority', filters.priority);
        if (filters.status.length > 0) params.set('status', filters.status.join(','));

        setSearchParams(params, { replace: true });
    }, [filters, setSearchParams]);

    useEffect(() => {
        dispatch(setFilter({ searchText: debouncedSearch }));
    }, [debouncedSearch, dispatch]);

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
                className="min-w-[180px]"
                allowClear
                options={[
                    { label: 'Thấp (Low)', value: 'low' },
                    { label: 'Trung bình (Medium)', value: 'medium' },
                    { label: 'Cao (High)', value: 'high' },
                ]}
            />

            <RangePicker
                placeholder={['Hạn chót từ ngày', 'Đến ngày']}
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