import { API_URL } from '../utils';

export const apiRoutes = {
  login: `${API_URL}/auth/login`,
  logout: `${API_URL}/auth/logout`,
  employees: `${API_URL}/admin/employees`,
  employers: `${API_URL}/admin/employers`,
  jobDetails: `${API_URL}/admin/jobDetails`,
  allReferrals: `${API_URL}/admin/allReferrals`,
  reviews: `${API_URL}/unknown`,
};
