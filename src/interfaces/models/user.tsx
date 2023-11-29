export interface Category {
  category: string;
}
export interface SubCategory {
  sub_category: string;
}

export interface Employee {
  profile_pic: string;
  phone_number: string;
  full_name: string;
  user_id: string;
  location: string;
  category: Category[];
  subcategory: SubCategory[];
  age: string;
  adhaar_no: string;
  adhaar_data: {
    gender: string;
    dob: string;
    profile_image: string;
    address: object;
    care_of: string;
  };
}
export interface Employer {
  id: string;
  employer_id: string;
  company_name: string;
  full_name: string;
  phone_number: string;
  address: string;
  gstin: string;
}

export interface JobDetailsType {
  id: string;
  company_name: string;
  phone_number: string;
  full_name: string;
  city: string;
  has_paid: boolean;
  category: Category[];
  subcategory: SubCategory[];
}

export interface EmployerReferrals {
  employee_id: string;
  referral_code: string;
  full_name: string;
  rank: number; // Assuming rank is a number
  count: number;
  totalCredit: number;
}
interface User {
  created_at: string;
  email: null | string;
  encrypted_password: null | string;
  full_name: string;
  has_paid: boolean;
  id: string;
  is_active: boolean;
  last_sign_in_at: string;
  payment_id: null | string;
  phone_number: string;
  sign_in_count: number;
  updated_at: string;
  user_type: string;
}
export interface EmployeeData {
  category: Category[];
  category_id: string;
  company_name: null;
  created_at: string;
  employee: Employee[];
  employee_id: string;
  experience_meta: null;
  experience_months: null;
  experience_years: null;
  id: string;
  job_title: null;
  languages: null;
  monthly_salary: null;
  preffered_area: null;
  qualification: null;
  relocate: boolean;
  sub_category_id: string;
  subcategory: SubCategory[];
  updated_at: string;
  user: User[];
  user_id: string;
  work_experience: boolean;
  work_shift: null;
  working_from: null;
  working_status: null;
  working_till: null;
}
