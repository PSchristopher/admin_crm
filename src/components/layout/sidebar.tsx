import React from 'react';
import { webRoutes } from '../../routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import { LuShare2 } from 'react-icons/lu';
import { MdWork } from 'react-icons/md';
import { ImUserTie } from 'react-icons/im';
import { FaUserNurse } from 'react-icons/fa';
import Icon, { InfoCircleOutlined } from '@ant-design/icons';

export const sidebar = [
  {
    path: webRoutes.dashboard,
    key: webRoutes.dashboard,
    name: 'Dashboard',
    icon: <Icon component={BiHomeAlt2} />,
  },
  {
    path: webRoutes.employees,
    key: webRoutes.employees,
    name: 'Employees',
    icon: <Icon component={FaUserNurse} />,
  },
  {
    path: webRoutes.employers,
    key: webRoutes.employers,
    name: 'Employers',
    icon: <Icon component={ImUserTie} />,
  },
  {
    path: webRoutes.jobDetails,
    key: webRoutes.jobDetails,
    name: 'Job Details',
    icon: <Icon component={MdWork} />,
  },
  {
    path: webRoutes.referrals,
    key: webRoutes.referrals,
    name: 'Refferals',
    icon: <Icon component={LuShare2} />,
  },
  {
    path: webRoutes.about,
    key: webRoutes.about,
    name: 'About',
    icon: <InfoCircleOutlined />,
  },
];
