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
import { EmployerReferrals } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
// import { webRoutes } from '../../routes/web';
import { handleErrorResponse } from '../../utils';
import http from '../../utils/axios';
import BasePageContainer from '../layout/PageContainer';
// import { Tag } from 'antd';
export const Referrals = () => {
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
      title: 'Employee Name',
      dataIndex: 'employee_name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: EmployerReferrals) => {
        console.log(row, 'rowrowrow'); // Log the row object
        return `${row?.full_name} `;
      },
    },
    {
      title: 'No of Referrals',
      dataIndex: 'count',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: EmployerReferrals) => `${row?.count} `,
    },
    {
      title: 'Referral Code',
      dataIndex: 'referral_code',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: EmployerReferrals) => `${row?.referral_code} `,
    },
    {
      title: 'Earnings',
      dataIndex: 'totalCredit',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: EmployerReferrals) => `${row?.totalCredit} `,
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: EmployerReferrals) => `${row?.rank} `,
    },
  ];

  return (
    <BasePageContainer>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Referrals',
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
            .get(apiRoutes.allReferrals, {
              params: {
                pageNumber: params?.current ? params.current - 1 : 0,
                pageSize: params.pageSize,
              },
            })
            .then((response) => {
              console.log(response, 'ksjsjsjjsjsj');
              const referrals: [EmployerReferrals] = response.data.arr;
              return {
                data: referrals,
                success: true,
                total: response.data.total,
              } as RequestData<EmployerReferrals>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<EmployerReferrals>;
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
