import React, { useEffect, useState } from "react";
import { Table, Space, Modal, Spin, Tag } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteExistingProject, fetchProjects, selectAllProjects } from "../features/project/projectSlice";
import { Link } from "react-router-dom";

const Projects = () => {
  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const projects = useSelector(selectAllProjects);
  const isLoading = useSelector((state) => state.projects.isLoading);

  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const updatedProjectsData = projects?.map((project) => ({
        key: project.id,
        id: project.id,
        title: project.title,
        description: project.description,
        image: <img src={project.image} alt={`Main Image`} style={{ maxWidth: 100 }} />,
        gallery: (
          <Space>
            {project.galleries?.map((item, index) => (
              <img key={index} src={item.url} alt={`Image ${index}`} style={{ maxWidth: 100 }} />
            ))}
          </Space>
        ),
        action: (
          <Space size="middle">
            <Link to={`/admin/edit_project/${project.id}`} className="me-2 text-danger">
              <BiEdit />
            </Link>
            <Link className="text-danger" onClick={() => handleOpenDeleteModal(project.id)}>
              <AiFillDelete />
            </Link>
          </Space>
        ),
      }));
      setProjectsData(updatedProjectsData);
    }
  }, [projects]);

  const handleOpenDeleteModal = (projectId) => {
    setProjectIdToDelete(projectId);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (projectIdToDelete) {
      dispatch(deleteExistingProject(projectIdToDelete));
      setDeleteModalVisible(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setProjectIdToDelete(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Gallery",
      dataIndex: "gallery",
      key: "gallery",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.action}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Projects</h3>
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={projectsData} />
      </Spin>

      <Modal
        title="Delete Project"
        visible={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
    </div>
  );
};

export default Projects;
