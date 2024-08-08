import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectById, selectProjectById, updateExistingProject } from '../features/project/projectSlice';

const { TextArea } = Input;

const UpdateProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => selectProjectById(state, parseInt(id)));
  const isLoading = useSelector((state) => state.projects.isLoading);
  const isError = useSelector((state) => state.projects.isError);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        title: project.title,
        description: project.description,
        image: project.image,
        galleries: project.galleries?.map(item => ({ url: item.url })),
      });
    }
  }, [project, form]);

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

      // Map the galleries URLs into the expected format
      const galleries = values.galleries.map(url => ({ url: url.url }));

      // Create the project object to send to the backend
      const projectData = {
        title: values.title,
        description: values.description,
        image: values.image,
        galleries: galleries,
      };

      // Dispatch action to update the project
      await dispatch(updateExistingProject({ projectId: id, projectData }));
      message.success('Project updated successfully!');
    } catch (error) {
      message.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Update Project</h2>
      {isLoading ? (
        <Spin spinning={true}>
          <div>Loading project data...</div>
        </Spin>
      ) : isError ? (
        <div>Failed to load project data</div>
      ) : (
        <Form
          form={form}
          name="updateProjectForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            title: project?.title,
            description: project?.description,
            image: project?.image,
            galleries: project?.galleries?.map(item => ({ url: item.url })),
          }}
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
              { type: 'url', message: 'Please enter a valid URL' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.List name="galleries">
            {(fields, { add, remove }) => (
              <>
                <Form.Item label="Gallery Paths">
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'url']}
                        fieldKey={[fieldKey, 'url']}
                        rules={[{ required: true, message: 'Please enter gallery image URL' }]}
                        style={{ flex: 1 }}
                      >
                        <Input placeholder="Gallery Image URL" />
                      </Form.Item>
                      <Button
                        type="danger"
                        onClick={() => remove(name)}
                        style={{ marginLeft: 8 }}
                      >
                        Remove
                      </Button>
                    </div>
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
              Update Project
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UpdateProject;
