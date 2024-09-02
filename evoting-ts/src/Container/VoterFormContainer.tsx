import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Checkbox, Button, message } from 'antd';
import moment from 'moment';

interface VoterFormData {
    full_name: string;
    username: string;
    password: string;
    email: string;
    date_of_birth: string;
    address: string;
    is_admin: boolean;
}

const VoterFormContainer: React.FC = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        const formData: VoterFormData = {
            ...values,
            date_of_birth: values.date_of_birth.format('YYYY-MM-DD'),
        };

        try {
            const response = await axios.post('https://voting.faesoftwaresolution.com/api/voters', formData);
            if (response.status === 201) {
                message.success('Voter saved successfully.');
                form.resetFields();
            } else {
                message.error('Failed to save voter.');
            }
        } catch (error) {
            message.error('An error occurred while saving the voter.');
        }
    };

    return (
        <div>
            <h1>Create Voter</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ is_admin: false }}
            >
                <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: 'Please enter the full name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter the username' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter the password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter the email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date of Birth"
                    name="date_of_birth"
                    rules={[{ required: true, message: 'Please select the date of birth' }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter the address' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="is_admin" valuePropName="checked">
                    <Checkbox>Is Admin</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Voter
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VoterFormContainer;
