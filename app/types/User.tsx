interface User {
  id: number;
  email: string;
  username: string;
  title: string;
  first_name: string;
  last_name: string;
  auth0_sub: string;
  company: string;
}

interface Company {
  id: number;
  company_name: string;
  company_address: string;
  company_registration_no: string;
  post_code: string;
  company_town: string;
  company_country: string;
  company_tell_no: string;
  company_mob_no: string;
  company_web_address: string;
  company_email_address: string;
  company_tax_reference: string;
  company_iban: string;
  company_bank_name: string;
  company_bic: string;
  company_bank_address: string;
  company_image: string | null;
  stripe_customer_id: string;
  admin_user: number;
}

export interface UserData {
  user: User;
  company: Company;
  bought_license: boolean;
  active_license: boolean;
  payment_url: string | null;
}

export interface UserState {
  user: UserData | null;
}

export interface CompanyData {
  id: number;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  company_registration_no?: string;
  company_address?: string;
  post_code?: string;
  company_town?: string;
  company_country?: string;
  company_tell_no?: string;
  company_mob_no?: string;
  company_email_address?: string;
  company_web_address?: string;
  company_tax_reference?: string;
  company_bank_name?: string;
  company_iban?: string;
  company_bic?: string;
  company_bank_address?: string;
  title?: string;
  // Add any other properties your company data might have
}
export interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  createAsAdmin: boolean;
  title: string;
  company: number;
  role: string;
  is_active: boolean;
  licenses: string[];
}

export interface CreateUserProps {
  open?: boolean;
  handleClose?: () => void;
}

export interface OrganizationData {
  id: number;
  company_email_address: string;
}
