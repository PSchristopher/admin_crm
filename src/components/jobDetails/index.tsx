import React from 'react';
import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  // TableDropdown,
  // ProDescriptions,
} from '@ant-design/pro-components';
// import { Avatar, BreadcrumbProps, Modal, Space } from 'antd';
// import { Modal } from 'antd';
import { useRef } from 'react';
import { FiUsers } from 'react-icons/fi';
// import { CiCircleMore } from 'react-icons/ci';
// import { Link } from 'react-router-dom';
import { JobDetailsType } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
// import { webRoutes } from '../../routes/web';
import { handleErrorResponse } from '../../utils';
import http from '../../utils/axios';
import BasePageContainer from '../layout/PageContainer';
import { Tag } from 'antd';
// import Icon, {
//   ExclamationCircleOutlined,
//   DeleteOutlined,
// } from '@ant-design/icons';

// enum ActionKey {
//   DELETE = 'delete',
// }

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

const JobDetails = () => {
  const actionRef = useRef<ActionType>();
  // const [model, modalContextHolder] = Modal.useModal();

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
      title: 'Employer Name',
      dataIndex: 'employer_name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) => {
        console.log(row, 'rowrowrow'); // Log the row object
        return `${row?.full_name} `;
      },
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) => `${row?.phone_number} `,
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) => `${row?.company_name} `,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) => `${row?.city} `,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) => `${row?.category[0]?.category} `,
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) =>
        `${row?.subcategory[0]?.sub_category} `,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: JobDetailsType) => (
        <span>
          {row?.has_paid ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="gold">Inactive</Tag>
          )}
        </span>
      ),
    },
  ];

  return (
    <BasePageContainer>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Jobs',
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
            .get(apiRoutes.jobDetails, {
              params: {
                pageNumber: params?.current ? params.current - 1 : 0,
                pageSize: params.pageSize,
              },
            })
            .then((response) => {
              console.log(response, 'ksjsjsjjsjsj');
              const jobs: [JobDetailsType] = response.data.arr;
              return {
                data: jobs,
                success: true,
                total: response.data.total,
              } as RequestData<JobDetailsType>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<JobDetailsType>;
            });
        }}
        dateFormatter="string"
        search={false}
        rowKey="id"
        options={{
          search: false,
        }}
      />
      {/* {modalContextHolder} */}
    </BasePageContainer>
  );
};

export default JobDetails;
