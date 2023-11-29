import React, { useEffect, useState } from 'react';
import BasePageContainer from '../layout/PageContainer';
import { Image, Tabs, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { apiRoutes } from '../../routes/api';
import Axios from '../../utils/axios';
import { employeeDetail } from '../../store/slices/employeeSlice';
import { useDispatch } from 'react-redux';
import { EmployeeData } from '../../interfaces/models/user';
import TabPane from 'antd/es/tabs/TabPane';
import EmployeeKycDetails from './EmployeeKycDetails';

export default function EmployeeProfile() {
  const params = useParams();
  const dispatch = useDispatch();
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
  console.log(employeeData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          apiRoutes.getEmployeeDetails(params.id as string)
        );
        setEmployeeData(response.data.data);
        dispatch(employeeDetail(response.data));
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchData();
  }, [params.id]);
  return (
    <BasePageContainer>
      <h2 className="flex justify-center text-gray-800 gap-4 p-4">
        Payment Status : {''}
        <Tag color="green">Paid</Tag>
      </h2>
      <div className="flex  gap-10  items-center pl-8 border-2 p-4">
        <Image
          width={170}
          height={170}
          className="rounded-full object-cover"
          src={employeeData[0]?.employee[0]?.profile_pic}
          // src={URL.createObjectURL`data:image/jpeg;base64,${employeeData[0]?.employee[0]?.adhaar_data?.profile}`()}
          // src={`data:image/png;base64,${employeeData[0]?.employee[0]?.adhaar_data?.profile_image}`}
        />

        <div className="flex flex-col justify-center w-3/4">
          <h1 className="text-primary font-semibold text-xl pb-4 ">
            {employeeData[0]?.user[0]?.full_name}
          </h1>
          <div className="flex gap-10  justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-800">
                Age:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.employee[0]?.age}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-800">
                Date Of Birth :{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {' '}
                  {employeeData[0]?.employee[0]?.adhaar_data?.dob}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-800">
                Category :{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {' '}
                  {employeeData[0]?.category[0]?.category}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-800">
                Sub Category :{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {' '}
                  {employeeData[0]?.subcategory[0]?.sub_category}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-800">
                Gender:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.employee[0]?.adhaar_data?.gender === 'M'
                    ? 'Male'
                    : 'Female'}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-800">
                Location:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.employee[0]?.location}
                </span>
              </p>{' '}
              <p className="text-sm font-bold text-gray-800">
                Aadhar:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.employee[0]?.adhaar_no}
                </span>
              </p>{' '}
              <p className="text-sm font-bold text-gray-800">
                Education:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.qualification}
                </span>
              </p>{' '}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-gray-800">
                Mobile:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.user[0]?.phone_number}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-800">
                Current Salary:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  ₹ {employeeData[0]?.monthly_salary ?? 0} /-
                </span>
              </p>{' '}
              <p className="text-sm font-bold text-gray-800">
                Total Experience:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.experience_years ?? 0}.
                  {employeeData[0]?.experience_months ?? 0} - Years
                </span>
              </p>{' '}
              <p className="text-sm font-bold text-gray-800">
                Job Preference:{' '}
                <span className="text-gray-600 font-medium text-sm">
                  {employeeData[0]?.work_shift}
                </span>
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
      <Tabs>
        <TabPane tab="Kyc Details" key="kyc-details">
          <EmployeeKycDetails kycDetails={employeeData[0]?.employee} />
        </TabPane>
        <TabPane tab="Employee details" key="employee-details">
          qwertyui
        </TabPane>
      </Tabs>{' '}
    </BasePageContainer>
  );
}
