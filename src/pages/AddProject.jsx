import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createNewProject } from '../features/project/projectSlice';

const { TextArea } = Input;

const AddProject = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Ensure 'image' field is a valid URL
      const isValidUrl = /^https?:\/\/\S+$/i.test(values.image);
      if (!isValidUrl) {
        message.error('Please enter a valid URL for the main photo');
        setLoading(false);
        return;
      }

      // Map the gallery URLs into the expected format
      const gallery = values.gallery.map(url => ({ url }));

      // Create the project object to send to the backend
      const projectData = {
        title: values.title,
        description: values.description,
        image: values.image,
        gallery: gallery,
      };

      // Dispatch action to create new project
      await dispatch(createNewProject(projectData));
      message.success('Project created successfully!');
      setLoading(false);
    } catch (error) {
      message.error('Failed to create project');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Add New Project</h2>
      <Form
        name="addProjectForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter project title' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Main Photo URL"
          name="image"
          rules={[
            { required: true, message: 'Please enter main photo URL' },
            { type: 'url', message: 'Please enter a valid URL' } // Example of Ant Design validation rule
          ]}
        >
          <Input />
        </Form.Item>

        <Form.List name="gallery" initialValue={['']}>
          {(fields, { add, remove }) => (
            <>
              <Form.Item label="Gallery Paths">
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Form.Item
                    {...restField}
                    key={key}
                    fieldKey={fieldKey}
                    rules={[{ required: true, message: 'Missing gallery path' }]}
                  >
                    <Input placeholder="Gallery Image URL" />
                  </Form.Item>
                ))}
              </Form.Item>
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Gallery Image Path
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProject;
