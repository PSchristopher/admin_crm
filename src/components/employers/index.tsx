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
import { Modal, Space } from 'antd';
import { useRef } from 'react';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
// import { Link } from 'react-router-dom';
import { Employer } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
// import { webRoutes } from '../../routes/web';
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';
import http from '../../utils/axios';
import BasePageContainer from '../layout/PageContainer';
import Icon, {
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

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

const Employers = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();

  const columns: ProColumns[] = [
    // {
    //   title: 'Avatar',
    //   dataIndex: 'avatar',
    //   align: 'center',
    //   sorter: false,
    //   render: (_, row: Employer) => (
    //     <Avatar
    //       shape="circle"
    //       size="large"
    //       style={{ backgroundColor: 'black' }}
    //     >
    //       {row.full_name.charAt(0).toUpperCase()}
    //     </Avatar>
    //   ),
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employer) => `${row.full_name} `,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employer) => `${row.phone_number} `,
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employer) => `${row.company_name} `,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employer) => `${row.address} `,
    },
    {
      title: 'GSTIN',
      dataIndex: 'gstin',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: Employer) => `${row.gstin} `,
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: Employer) => [
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

  const handleActionOnSelect = (key: string, employer: Employer) => {
    if (key === ActionKey.DELETE) {
      showDeleteConfirmation(employer);
    }
  };

  const showDeleteConfirmation = (employer: Employer) => {
    modal.confirm({
      title: 'Are you sure to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <ProDescriptions column={1} title=" ">
          <ProDescriptions.Item valueType="avatar" label="Avatar">
            {employer.full_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Name">
            {employer.company_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Email">
            {employer.phone_number}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Email">
            {employer.gstin}
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
      okButtonProps: {
        className: 'bg-primary',
      },
      onOk: () => {
        return http
          .delete(`${apiRoutes.employers}/${employer.id}`)
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
          subTitle: 'Employers',
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
            .get(apiRoutes.employers, {
              params: {
                pageNumber: params?.current ? params.current - 1 : 0,
                pageSize: params.pageSize,
              },
            })
            .then((response) => {
              console.log(response, 'ksjsjsjjsjsj');
              const users: [Employer] = response.data.arr;
              return {
                data: users,
                success: true,
                total: response.data.total,
              } as RequestData<Employer>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<Employer>;
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

export default Employers;
