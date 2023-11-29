import React from 'react';
import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
// import { Avatar, BreadcrumbProps, Modal, Space } from 'antd';
import { Avatar, Modal, Space } from 'antd';
import { useRef } from 'react';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
// import { Link } from 'react-router-dom';
import { Employee } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
// import { webRoutes } from '../../routes/web';
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';
import http from '../../utils/axios';
import BasePageContainer from '../layout/PageContainer';
import LazyImage from '../lazy-image';
import Icon, {
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

enum ActionKey {
  DELETE = 'delete',
}

// const breadcrumb: BreadcrumbProps = {
//   items: [
//     {
//       key: webRoutes.dashboard,
//       title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
//     },
//     {
//       key: webRoutes.employees,
//       title: <Link to={webRoutes.employees}>Employees</Link>,
//     },
//   ],
// };

const Employees = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const columns: ProColumns[] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      align: 'center',
      sorter: false,
      render: (_, row: Employee) =>
        row.profile_pic ? (
          <Avatar
            shape="circle"
            size="large"
            src={
              <LazyImage
                src={row.profile_pic}
                placeholder={<div className="bg-gray-100 h-full w-full" />}
              />
            }
          />
        ) : (
          <Avatar shape="circle" size="large">
            {row.full_name.charAt(0).toUpperCase()}
          </Avatar>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employee) => (
        <Link
          className="click"
          onClick={() => navigate(`/employee-details/${row.user_id}`)}
        >
          {' '}
          {row.full_name}
        </Link>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employee) => `${row.phone_number} `,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employee) => `${row.category[0].category} `,
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employee) => `${row.subcategory[0].sub_category} `,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employee) => `${row.location} `,
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: Employee) => [
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => handleActionOnSelect(key, row)}
          menus={[
            {
              key: ActionKey.DELETE,
              name: (
                <Space>
                  <DeleteOutlined />
                  Delete
                </Space>
              ),
            },
          ]}
        >
          <Icon component={CiCircleMore} className="text-primary text-xl" />
        </TableDropdown>,
      ],
    },
  ];

  const handleActionOnSelect = (key: string, user: Employee) => {
    if (key === ActionKey.DELETE) {
      showDeleteConfirmation(user);
    }
  };

  const showDeleteConfirmation = (user: Employee) => {
    modal.confirm({
      title: 'Are you sure to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <ProDescriptions column={1} title=" ">
          <ProDescriptions.Item valueType="avatar" label="Avatar">
            {user.profile_pic}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Name">
            {user.full_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Email">
            {user.phone_number}
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
      okButtonProps: {
        className: 'bg-primary',
      },
      onOk: () => {
        return http
          .delete(`${apiRoutes.employees}/${user.user_id}`)
          .then(() => {
            showNotification(
              'Success',
              NotificationType.SUCCESS,
              'User is deleted.'
            );

            actionRef.current?.reloadAndRest?.();
          })
          .catch((error) => {
            handleErrorResponse(error);
          });
      },
    });
  };

  return (
    <BasePageContainer>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Employees',
          tooltip: {
            className: 'opacity-60',
            title: 'Mocked data',
          },
          title: <FiUsers className="opacity-60" />,
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={(params) => {
          return http
            .get(apiRoutes.employees, {
              params: {
                pageNumber: params?.current ? params.current - 1 : 0,
                pageSize: params.pageSize,
              },
            })
            .then((response) => {
              const users: [Employee] = response.data.res;
              return {
                data: users,
                success: true,
                total: response.data.total,
              } as RequestData<Employee>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<Employee>;
            });
        }}
        dateFormatter="string"
        search={false}
        rowKey="id"
        options={{
          search: false,
        }}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Employees;
