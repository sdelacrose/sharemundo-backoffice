import {
  ActiveUser,
  BillingCard,
  BlockUser,
  Downfall,
  HomeBlackIcon,
  Progress,
  TotalUser,
  PromoBlack
} from "@/app/assets/icons";

export const homeBreadcrumb = [{ title: "Home", icon: HomeBlackIcon }];
export const promoCodeBreadcrumb = [{ title: "Promo Code", icon: PromoBlack }];

export const filterItems = [
  { label: "1 Month" },
  { label: "2 Month" },
  { label: "Year" },
];
export const statsData = [
  {
    icon: <ActiveUser />,
    title: "Active Users",
    value: "29,405",
    percentage: 15,
    isPositive: true,
    checkIcon: <Progress />,
  },
  {
    icon: <BlockUser />,
    title: "Blocked Users",
    value: "2.40%",
    percentage: -6,
    isPositive: false,
    checkIcon: <Downfall />,
  },
  {
    icon: <TotalUser />,
    title: "Total Users",
    value: "2.40%",
    percentage: 6,
    isPositive: true,
    checkIcon: <Progress />,
  },
];
export const CustomersData = [
  {
    icon: <ActiveUser />,
    title: "Total Customers",
    value: "29,405",
    percentage: 15,
    isPositive: true,
    checkIcon: <Progress />,
  },
  {
    icon: <BlockUser />,
    title: "Companies",
    value: "2.40%",
    percentage: -6,
    isPositive: false,
    checkIcon: <Downfall />,
  },
  {
    icon: <TotalUser />,
    title: "Freelancers",
    value: "2.40%",
    percentage: 6,
    isPositive: true,
    checkIcon: <Progress />,
  },
  {
    icon: <TotalUser />,
    title: "Internal user",
    value: "2.40%",
    percentage: 6,
    isPositive: true,
    checkIcon: <Progress />,
  },
];

export const billingData = [
  {
    icon: <BillingCard />,
    title: "Current Revenue",
    value: "29,405",
    percentage: 15,
    isPositive: true,
    checkIcon: <Progress />,
  },
  {
    icon: <BillingCard />,
    title: "Next Moth Revenue (approx.)",
    value: "2.40%",
    percentage: -6,
    isPositive: false,
    checkIcon: <Downfall />,
  },
  {
    icon: <BillingCard />,
    title: "Last 12 months Revenue",
    value: "2.40%",
    percentage: -6,
    isPositive: false,
    checkIcon: <Downfall />,
  },
  {
    icon: <BillingCard />,
    title: "Next 12 months Revenue (approx.) ",
    value: "2.40%",
    percentage: 6,
    isPositive: true,
    checkIcon: <Progress />,
  },
];
export const activities = [
  {
    user: "Company Name",
    action: "bought a license",
    date: "Wed 12/12/2025",
  },
  {
    user: "Company Name",
    action: "bought a license",
    date: "Wed 12/12/2025",
  },
  {
    user: "Company Name",
    action: "bought a license",
    date: "Wed 12/12/2025",
  },
  {
    user: "Company Name",
    action: "bought a license",
    date: "Wed 12/12/2025",
  },
];
