export interface Category {
  category: string;
}
export interface SubCategory {
  sub_category: string;
}

export interface User {
  profile_pic: string;
  phone_number: string;
  full_name: string;
  id: string;
  location: string;
  category: Category[];
  subcategory: SubCategory[];
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
