import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Input, DatePicker, Checkbox, Button, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;

interface FormData {
    title: string;
    description: string;
    start_date: moment.Moment | null;
    end_date: moment.Moment | null;
    is_active: boolean;
}

const ElectionFormContainer: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        start_date: null,
        end_date: null,
        is_active: false,
    });

    const handleChange = (changedValues: any, allValues: any) => {
        setFormData(allValues);
    };

    const handleSubmit = async (values: FormData) => {
        console.log(values)
        const formattedData = {
            ...values,
            start_date: values.start_date?.format('YYYY-MM-DD'),
            end_date: values.end_date?.format('YYYY-MM-DD'),
        };

        try {
            const response = await axios.post('https://voting.faesoftwaresolution.com/api/elections', formattedData);
            if (response.status === 201) {
                message.success('Election saved successfully.');
            } else {
                message.error('Failed to save election.');
            }
        } catch (error) {
            message.error('An error occurred while saving the election.');
        }
    };

    return (
        <div>
            <h1>Create Election</h1>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                onValuesChange={handleChange}
                initialValues={formData}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the title!' }]}
                >
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the description!' }]}
                >
                    <TextArea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
                </Form.Item>
                <Form.Item
                    label="Start Date"
                    name="start_date"
                    rules={[{ required: true, message: 'Please select the start date!' }]}
                >
                    <DatePicker value={formData.start_date} onChange={(date) => setFormData({ ...formData, start_date: date })} format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    label="End Date"
                    name="end_date"
                    rules={[{ required: true, message: 'Please select the end date!' }]}
                >
                    <DatePicker value={formData.end_date} onChange={(date) => setFormData({ ...formData, end_date: date })} format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="is_active" valuePropName="checked">
                    <Checkbox onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}>Is Active</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Election
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ElectionFormContainer;
