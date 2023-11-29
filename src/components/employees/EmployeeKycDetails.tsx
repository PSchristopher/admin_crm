import React from 'react';
import { Employee } from '../../interfaces/models/user';
import { Image } from 'antd';
interface EmployeeKycProps {
  kycDetails: Employee[];
}
export default function EmployeeKycDetails({ kycDetails }: EmployeeKycProps) {
  if (!kycDetails) {
    return <p>Loading...</p>;
  }
  const adhaarData = kycDetails[0]?.adhaar_data;

  return (
    <>
      <div className="flex ml-10 gap-10 ">
        <Image
          width={170}
          height={170}
          className=" object-cover"
          src={`data:image/png;base64,${kycDetails[0]?.adhaar_data?.profile_image}`}
        />
        <div className="w-1/2">
          <p className="text-lg font-bold">ADDRESS: </p>
          <p className="ml-10">
            {' '}
            <p>
              {adhaarData?.care_of} , {adhaarData?.address?.house} ,
              {adhaarData?.address?.street}, {adhaarData?.address?.loc} ,{' '}
              {adhaarData?.address?.po} , {adhaarData?.address?.vtc}.{' '}
            </p>
            <p>
              <span className="font-bold">City :</span>{' '}
              {adhaarData?.address?.dist} ,{' '}
              <span className="font-bold">State :</span>{' '}
              {adhaarData?.address?.state} ,{' '}
              <span className="font-bold">ZipCode :</span> {adhaarData?.zip}
            </p>
          </p>
        </div>
      </div>
    </>
  );
}
