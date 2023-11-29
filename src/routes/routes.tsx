import { useDispatch } from 'react-redux';
import Axios from '../utils/axios';
import { apiRoutes } from './api';
import { employeeDetail } from '../store/slices/employeeSlice';

export const getEmployee = async (userId: string) => {
  const dispatch = useDispatch();
  try {
    const response = await Axios.get(apiRoutes.getEmployeeDetails(userId));
    console.log(response, 'ceheheheh');
    dispatch(employeeDetail(response.data));
    return response;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    throw error;
  }
};
