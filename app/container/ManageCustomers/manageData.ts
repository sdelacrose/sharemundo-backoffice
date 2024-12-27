import { HomeBlackIcon } from "@/app/assets/icons";

export const customersBreadcrumb = [{ title: "Home", icon: HomeBlackIcon }];
export const filterItems = [
  { label: "1 Month" },
  { label: "2 Month" },
  { label: "Year" },
];

export const Role = [
  { value: "freelancer", label: "Freelancer" },
  { value: "company_user", label: "Company" },
];

export const filterByRoleItems = [
  { label: "All", value: "all" },
  { label: "Freelancer", value: "freelancer" },
  { label: "Company", value: "company" },
];

export const filterbyInternalUsers = [
  { value: "freelancer", label: "Freelancer" },
  { value: "admin", label: "Admin" },
];

export const filterByConnectionItems = [
  { label: "All", key: "type", value: "all" },
  { label: "Freelancer", key: "type", value: "freelancer" },
  { label: "Company", key: "type", value: "company" },
];

export const filterByUserTypeItems = [
  { label: "All", key: "user_type", value: "all" },
  { label: "Admin", key: "user_type", value: "admin" },
  { label: "Freelancer", key: "type", value: "freelancer" },
];